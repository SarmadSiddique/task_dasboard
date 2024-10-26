/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { getChatList, notifySeen } from "../../api/message_api";
import { blog1 } from "../../icons/icon";
import { useNavigate } from "react-router-dom";
import { setActiveUser, setChatList } from "../../redux/chat-message";
import { pushNewChatList } from './chatUtils'

const ChatUsers = ({ name, discrip, img, id, timestamp, status, data, }) => {
  const [badge, setBadge] = useState(false);
  const userData = useSelector((state) => state?.auth?.userData)
  const responsiveChat = useSelector((state) => state.chat.responsiveChat)
  const activeChatId = useSelector((state) => state.chat.activeChatId)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isInitialMount = useRef(true);
  const toggleData = async (chatData) => {
    dispatch(setActiveUser(chatData))
    navigate(`/chat/${chatData?.otherUser?._id}`)
  };
  const isActive = id === activeChatId;
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isActive) {
      toggleData(data)
    }
  }, [activeChatId])
  useEffect(() => {
    setBadge(((data?.lastMsg?.sender !== userData?._id) && data?.lastMsg?.seen === false))
  }, [data]);

  return (
    <div>
      <div
        className={`_link_  border-0 `}
        style={{ cursor: "pointer" }}
        onClick={() => toggleData(data)}
      >
        <div
          className={`d-flex align-items-center chat-list-link border-b-2 border-b-[#E5E9EB] px-3 py-3 w-100 ${isActive ? "active" : ""}`}>
          <div>
            <div className={`${status ? "status_div00" : ""}`}>
              <div className="position-relative">
                <img src={img} alt="" className="chat_profile_img" />
                <span>
                  <span
                    className={`noti_badges fs_06 ${badge && 'd-block'}`}
                    id="chatbadge"
                  >
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center w-100 pe-1">
            <div className="ps-3 mt-1">
              <h4 className="my-0 chat_name00 mb-2 line-clamp-1">{name}</h4>
              <div className="chat_detail00 line-clamp-1">{discrip}</div>
            </div>
            <div className="time_div00">
              <h6 className="chat_detail00 line-clamp-1" style={{ whiteSpace: "nowrap" }}>
                <Moment unix fromNow>
                  {timestamp}
                </Moment>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ChatList = ({ status }) => {
  const chatListData = useSelector((state) => state.chat.chatList)
  const dispatch = useDispatch()
  const chatContainerRef = useRef(null);
  const [count, setCount] = useState(0);
  const [lastId, setLastId] = useState(0);
  const handleChatList = async (id) => {
    await getChatList(id)
      .then((result) => {
        if (result?.data?.success) {
          setCount(result.data.count)
          dispatch(setChatList(
            result?.data?.conversations?.sort((a, b) => {
              const lastMsgA = a?.lastMsg;
              const lastMsgB = b?.lastMsg;
              if (!lastMsgA || !lastMsgB) {
                return 0;
              }
              const createdAtA = new Date(lastMsgA.createdAt);
              const createdAtB = new Date(lastMsgB.createdAt);
              return createdAtB - createdAtA; // Sort in ascending order for oldest first
            })
          ));
        }
      }).catch((err) => {
        console.log(err);
      })

  }
  async function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;
    if (lastId <= count) {
      if (Math.ceil(scrollHeight - scrollTop) - 1 < clientHeight) {
        try {
          const result = await getChatList(lastId + 10);
          if (result?.data?.success) {
            setLastId(lastId + 10);
            const newConversations = result?.data?.conversations.filter(conversation => (
              !chatListData.find(chat => chat._id === conversation._id)
            ));
            const updatedChat = pushNewChatList({ prevChatList: chatListData, newConversations: newConversations })
            dispatch(setChatList(updatedChat));
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  useEffect(() => {
    handleChatList(0)
  }, []);
  return (
    <>
      <div className="chat_height_contol scrolbar" ref={chatContainerRef} onScroll={handleScroll}>
        {chatListData?.length > 0 && chatListData?.map((chat, index) => (
          <Fragment key={chat?._id}>
            <ChatUsers
              id={chat?.otherUser?._id}
              img={
                chat?.otherUser?.profileImage
                  ? `${global.BASEURL}/${chat.otherUser.profileImage}`
                  : blog1
              }
              status={status?.some(item => item.userId === chat.otherUser?._id ? item.activeStatus === 'active' : chat.otherUser?.activeStatus === 'active')}
              data={chat}
              name={chat?.otherUser?.firstName + " " + chat?.otherUser?.lastName}
              discrip={chat?.lastMsg?.message}
              timestamp={chat?.lastMsg?.timestamp}
            />
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default ChatList