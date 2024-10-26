/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Moment from 'react-moment';
import ImageLoader from '../../snackbar/imageLoader'
import { Modal } from "react-bootstrap";
import { X } from "react-feather";

const ChatMessage = ({ message, timestamp, left, type }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false)
  }
  const handleShow = (src) => {
    setImageSrc(src)
    setModalShow(true)
  }
  return (
    <>
      <div className={`pb-3 ${left ? "chat-message-left" : "chat-message-right"}`}>
        <div>
          <div className={`flex-shrink-1 ${left ? "chat_card_left" : "chat_card_right"}`}
            style={{ padding: type === 'text' ? "0.7rem 0.9rem" : '.1rem', }}>

            {type === 'text' ? message :
              <div style={{ borderRadius: "inherit", cursor: "pointer" }} onClick={() => handleShow(global.BASEURL + "/" + message)}>
                <ImageLoader imageUrl={global.BASEURL + "/" + message} classes={'min-w-[10rem] min-h-[10rem]'} />
              </div>
            }
          </div>
          <div className={`text-nowrap text_secondarydark text-xs ${left ? "chat-message-left" : "chat-message-right"}`}>
            <Moment unix fromNow>
              {timestamp}
            </Moment>
          </div>
        </div>
      </div>
      <Modal
        fullscreen={true}
        className='chat_msg'
        centered
        show={modalShow} onHide={handleClose} >
        <Modal.Body className='h-100 position-relative'>
          <div className='position-absolute d-flex gap-2 flex-column m-2' style={{ right: "0", top: "0" }}>
            <button onClick={handleClose} className='btn btn-light d-flex justify-center items-center rounded-circle p-0' style={{ height: "2rem", width: "2rem" }}> <X /> </button>
          </div>
          <div className='h-100 d-grid'>
            <img src={imageSrc} alt='' className='msg_show_img' />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChatMessage;
