/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useRef } from "react";
import ChatMessage from "./chatMessage";
import { ChevronLeft, Image, Send, X } from "react-feather";
import { useState } from "react";
import { getSpecificUserChat } from '../../api/message_api'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { blog1 } from "../../icons/icon";
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Form, FormGroup, Input } from "reactstrap";
import { uploadFile } from './../../api/uploadFile';
import { setChatList, setResponsiveChat } from "../../redux/chat-message";
import { updateChatList } from './chatUtils';

const ChatMessageList = () => {
  const [chatMsg, setChatMsg] = useState([]);
  const chatMessagesRef = useRef(null);
  const userData = useSelector((state) => state?.auth?.userData)
  const chatList = useSelector((state) => state.chat.chatList)
  const activeChatId = useSelector((state) => state.chat.activeChatId)
  const dispatch = useDispatch()
  const [newMsg, setNewMsg] = useState(false);
  const socketRef = useRef();
  const location = useLocation()
  const [isLoading3, setIsLoading3] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false);
  const fileInputRef = useRef(null);
  const [fileType, setFileType] = useState('text');
  const [userMsg, setUserMsg] = useState(null);
  const [imageFiles, setImageFiles] = useState(null);
  const chatUser = useSelector((state) => state.chat.activeUser)

  const handleError = (error) => {
    console.error("WebSocket connection error:", error);
  };
  const cleanupSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };
  useEffect(() => {
    // if (location.pathname !== "/chat") {
    //   return cleanupSocket;
    // }
    socketRef.current = io.connect(global.BASEURL2,
      { query: { token: global.TOKEN } }
    );
    socketRef.current.on("message", (message) => {
      if (activeChatId === message?.sender || userData?._id === message?.sender) {
        setChatMsg((prevMessages) => {
          setNewMsg(true)
          const uniqueMessagesSet = new Set(prevMessages.map(JSON.stringify));
          if (!uniqueMessagesSet.has(JSON.stringify(message))) {
            const updatedMessages = [...prevMessages, message];
            return updatedMessages;
          }
          return prevMessages;
        });
      }
    });
    socketRef.current.on("newConverstion", (newConversation) => {
      const updatedChatList = updateChatList({ chatList: chatList, newConversation: newConversation })
      dispatch(setChatList(updatedChatList))
    });
    socketRef.current.on("connect_error", handleError);
    return cleanupSocket;
  }, [location.pathname, activeChatId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(userMsg)
  };
  const sendMessage = async (input) => {
    const currentDate = new Date();
    const message = input?.trim();
    const timestamp = Math.floor(currentDate.getTime() / 1000); // Convert to seconds
    if (message !== '') {
      const data = {
        to_id: chatUser?.otherUser?._id,
        timestamp: timestamp,
        message: message,
        type: fileType,
      };

      await socketRef.current.emit("clientSendMessage", data);
      setUserMsg(null)
      setImageFiles(null)
    }
  };

  const [lastId, setLastId] = useState(0);
  const [count, setCount] = useState(0);
  const getUserChat = async (userId) => {
    await getSpecificUserChat({ id: userId, lastId: 0 })
      .then(async (result) => {
        if (result?.data?.success) {
          setNewMsg(true)
          setCount(result.data.count)
          setLastId(0)
          setChatMsg(result?.data?.messages);
        }
        setIsLoading3(false)
      }).catch((err) => {
        console.log(err)
        setIsLoading3(false)
      });
  }
  const handleChatClick = async (userId) => {
    setIsLoading3(true)
    getUserChat(userId)
  };
  useLayoutEffect(() => {
    handleChatClick(activeChatId)
  }, [activeChatId]);
  useEffect(() => {
    if (chatMessagesRef.current && newMsg && chatMsg?.length > 0) {
      const { nativeElement, scrollTo } = chatMessagesRef.current;
      if (nativeElement) {
        scrollTo({ top: nativeElement.scrollHeight * chatMsg?.length });
        setNewMsg(false)
      }
    } else
      if (chatMsg?.length > 0 && chatMessagesRef.current) {
        const { nativeElement, scrollTo } = chatMessagesRef.current;
        if (nativeElement) {
          scrollTo({ top: nativeElement.scrollHeight });
        }
      }
  }, [chatMsg]);

  const onScroll = async (e) => {
    if (Math.abs(e.currentTarget.scrollTop) === 0 && lastId + 10 < count && !isLoading3) {
      setNewMsg(false)
      setIsLoading2(true)
      await getSpecificUserChat({ id: activeChatId, lastId: lastId + 10 })
        .then(async (result) => {
          if (result?.data?.success) {
            setLastId(lastId + 10)
            setChatMsg((prev) => [...result?.data?.messages, ...prev,])
            setIsLoading2(false)
          }
          setIsLoading3(false)
        }).catch((err) => {
          console.log(err)
          setIsLoading3(false)
        });
    }
  };

  const handleChange = (event) => {
    setUserMsg(event.target.value)
    setFileType('text')
    setImageFiles(null)
  }
  const handleFileChange = (event, fileTypes) => {
    const selectedFiles = event.target.files[0];
    if (selectedFiles && fileTypes === 'image') {
      setFileType('image')
      setUserMsg(null)
      setImageFiles(selectedFiles);
    }
  };
  const handleTrashBtn = () => {
    fileInputRef.current.value = null
    setImageFiles(null)
  }
  const [isFileLoader, setIsFileLoader] = useState(false)

  const handleUpload = async (selectedImage) => {
    setIsFileLoader(true)
    await uploadFile(selectedImage)
      .then(async (result) => {
        if (result) {
          await sendMessage(result?.image)
          setIsFileLoader(false)
        } else {
          setIsFileLoader(false)
          return
        }
      })
      .catch((err) => {
        setIsFileLoader(false)
        console.error(err);
      });
  }

  return (
    <div className="chat_height position-relative">
      {chatUser &&
        <div className="d-flex align-items-center bg_dark rounded-4" style={{ borderRadius: "8px" }}>
          <div>
            <Link
              className="d_left_button bg-dark"
              to={'/'}
              onClick={() => {
                dispatch(setResponsiveChat(false));
              }}>
              <ChevronLeft />
            </Link>
          </div>

          <div className="w-100 py-2 px-3 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-1 algin-items-center">
              <img src={chatUser?.otherUser?.profileImage ? global.BASEURL + "/" + chatUser?.otherUser?.profileImage : blog1} className="rounded-circle bg-white" alt=""
                style={{ height: '48px', width: "48px", objectFit: "cover" }}
              />
              <div className="d-flex  flex-column">
                <span className=" text_white text-sm fs_11">{`${chatUser?.otherUser?.firstName} ${chatUser?.otherUser?.lastName}`}</span>
                <span className="popins_regular text_white text-sm fs_08">{chatUser?.otherUser?.email}</span>
              </div>
            </div>
          </div>
        </div>}
      <>
        <div className="position-relative">
          {(
            <>
              <List loading={isLoading2 || isLoading3} className="px-2">
                <VirtualList
                  data={chatMsg}
                  height={520}
                  className={`px-2 h-100 scrollable-container`}
                  fullHeight
                  ref={chatMessagesRef}
                  onScroll={onScroll}
                  direction="vertical"

                >
                  {(item) => (
                    <List.Item key={item._id} className="border-0 p-0 d-block h-100" >
                      <ChatMessage
                        type={item?.type}
                        left={userData?._id === item?.sender ? false : true}
                        message={item?.message}
                        timestamp={`${item?.timestamp}`}
                      />
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </>
          )}
        </div>
        <Form onSubmit={handleSubmit} className="shadow-sm py-3 px-3 d-flex justify-content-center align-items-center" style={{ zIndex: '10' }}>
          {imageFiles &&
            <div className=' position-absolute selected_img'>
              <div className='position-relative d-flex flex-column justify-content-between h-100'>
                <button className='text-danger trash btn1' disabled={isFileLoader} style={{ zIndex: "10" }} onClick={handleTrashBtn}>
                  <X />
                </button>
                <div className='position-relative h-100'>
                  {!isFileLoader ?
                    <img
                      src={URL.createObjectURL(imageFiles)}
                      alt='SelectedImage'
                      className='w-100 h-100'
                    /> :
                    <div className=' position-absolute d-flex justify-content-center align-items-center h-100' style={{ inset: "0", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "inherit", zIndex: "2" }} >
                      <Spinner />
                    </div>}
                </div>
                <div className='d-flex mt-2 justify-content-between align-items-center gap-3'>
                  <p className='m-0'> {imageFiles.name}</p>
                  <button type='button' className="send_btn rounded-3 bg-danger" onClick={() => handleUpload(imageFiles)}>
                    <Send className='text-white p-0 m-0' style={{ width: "1.2rem" }} />
                  </button>
                </div>
              </div>
            </div>}
          <div className='position-relative items-center d-flex gap-2 w-100'>
            <div className="position-relative">
              <Input
                type='file'
                className='file_adjust'
                ref={fileInputRef}
                multiple={false}
                accept='.jpg, .png, .jpeg'
                onChange={(e) => handleFileChange(e, 'image')}
              />
              <Image size={30} />
            </div>
            <Input type="text" disabled={isLoading3} id="chatInput" onChange={handleChange} value={userMsg || ""} required className="form-control rounded-3 ps-2 py-2 fs_10 " placeholder="Try to..." />
            <button disabled={isLoading3} className="send_btn rounded-3 bg-danger" type='submit'>
              <Send className='text-white p-0 m-0' style={{ width: "1.2rem" }} />
            </button>
          </div>
        </Form>
      </>
    </div>
  );
};

export default ChatMessageList;
