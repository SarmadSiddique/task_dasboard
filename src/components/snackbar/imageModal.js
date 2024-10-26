import React from 'react'
import { Modal } from 'react-bootstrap';
import { Download, X } from 'react-feather';

const ImageModal = ({ imageSrc, modalShow, setModalShow, user, imgName = "User" }) => {
    const handleClose = () => {
        setModalShow(false)
    }
    const downloadImage = async () => {
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = user?.firstName ? user?.firstName + " " + user?.lastName + "_" + imgName + ".jpg" : `downloaded-image_${imgName}.jpg`; // Replace with the desired file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download image', error);
        }
    };
    return (
        <>
            <Modal
                size='xl'
                className='chat_msg'
                centered
                show={modalShow} onHide={handleClose} >
                <Modal.Body className='h-100 position-relative py-4'>
                    <div className='position-absolute d-flex gap-2 flex-column m-2' style={{ right: "0", top: "0" }}>
                        <button onClick={handleClose} className='btn btn-light shadow d-flex justify-content-center align-items-center rounded-circle p-0' style={{ height: "2.3rem", width: "2.3rem" }}> <X /> </button>
                        <button onClick={downloadImage} className='btn btn-light shadow d-flex justify-content-center align-items-center rounded-circle p-0' style={{ height: "2.3rem", width: "2.3rem" }}>
                            <Download size={20} />
                        </button>
                    </div>
                    <div className='h-100 d-grid'>
                        <img src={imageSrc} alt='' className='msg_show_img' />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ImageModal