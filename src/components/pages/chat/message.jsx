/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useRef } from "react";
import "./chat.css";
import ChatList from "./chatList";
import ChatMessageList from "./chatMessageList";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BiSolidMessageRounded } from "react-icons/bi";
import { io } from "socket.io-client";
import { Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatId, setChatList, setResponsiveChat } from "../../redux/chat-message";
import { updateChatList } from "./chatUtils";

const ChatMessage = () => {
  const { id } = useParams()
  const responsiveChat = useSelector((state) => state.chat.responsiveChat)
  const chatList = useSelector((state) => state.chat.chatList)
  const activeChatId = useSelector((state) => state.chat.activeChatId)
  const dispatch = useDispatch()
  const initailRef = useRef()
  const location = useLocation()
  const [status, setStatus] = useState([]);
  const socketRef = useRef();
  const handleError = (error) => {
    console.error("WebSocket connection error:", error);
    // You might want to set an error state or handle it appropriately
  };
  useEffect(() => {
    if (id) {
      dispatch(setActiveChatId(id))
      dispatch(setResponsiveChat(true))
    } else {
      dispatch(setActiveChatId(null))
      dispatch(setResponsiveChat(false))
    }
  }, [id]);

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
    socketRef.current.on("userStatus", (userStatus) => {
      setStatus(prevStatus => {
        const userIndex = prevStatus.findIndex(item => item.userId === userStatus.userId);
        if (userIndex !== -1) {
          return prevStatus.map((item, index) =>
            index === userIndex ? userStatus : item
          );
        } else {
          return [...prevStatus, userStatus];
        }
      });
    })
    socketRef.current.on("newConverstion", (newConversation) => {
      const updatedChatList = updateChatList({ chatList: chatList, newConversation: newConversation })
      dispatch(setChatList(updatedChatList))
    });
    socketRef.current.on("connect_error", handleError);
    return cleanupSocket;
  }, [location.pathname]);
  return (
    <div className="container-lg px-0 px-lg-2 mx-auto">
      <div className="chat_grid">
        <div className={`chat_screen  ${!responsiveChat ? "d-grid content-center" : "d_chat_none"}`}>
          <div className="position-relative">
            <div className="position-absolute bg-white rounded-lg z-50 top-0 left-0 right-0">
              <div className="position-relative mx-3 my-[12px]">
                <span className="position-absolute mt-2 ms-3"> <Search /> </span>
                <input type="text" placeholder="Search" className="py-2 popins_regular border rounded-3 ps-5 w-100" name="" id="" />
              </div>
              <hr style={{ color: "#EDEEF0" }} className="my-1" />
            </div>
            <ChatList status={status} />
          </div>
        </div>
        <div
          className={`chat_screen ${responsiveChat ? "" : "d_chat_none"} `}
          id="chatScreen">
          {activeChatId ? (
            <ChatMessageList />
          ) : (
            <div className="display_flex2 flex-column h-100 w-100">
              <BiSolidMessageRounded style={{ fontSize: "30px" }} />
              <h4 className="ms-2 my-0 msg_s00">Select a message</h4>
              <h6
                style={{ color: "#2D3D38" }}
                className="text-center mt-2"
              >
                Choose from your existing conversations, start a new one,
                or just keep swimming.
              </h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const Messages = () => {
  return (
    <>
      <ChatMessage />
    </>
  )
}

export default Messages