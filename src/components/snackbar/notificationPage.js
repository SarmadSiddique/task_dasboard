/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MdNotificationAdd } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { getUserNotify, updateNotify } from "../../api/notify_api";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
const AllNotification = () => {
  // states-----
  const [notiData, setNotiData] = useState([]);
  const [notiCount, setNotiCount] = useState(0);
  const navigate = useNavigate()
  const [lastId, setLastId] = useState(0);
  const [pageloading, setPageloading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // useEffects------

  const getNotifyData = async (isUpdate = true) => {
    await getUserNotify(true, lastId)
      .then((result) => {
        if (result.data.success) {
          setNotiData(result.data.notifications);
          isUpdate && handleUpdate()
          if (lastId === 0) {
            setNotiCount(result.data.count)
          }
        } else {
          setNotiData([]);
        }
        setPageloading(false)
      })
      .catch((err) => {
        console.log(err);
        setNotiData([]);
        setPageloading(false)
      });
  };
  const handleBottomScroll = async () => {
    setPageloading(true);

    // Fetch more data when user scrolls to the bottom
    await getUserNotify(true, lastId * 20)
      .then((result) => {
        if (result.data.success) {
          setPageloading(false);
          setNotiData((prev) => [...prev, ...result.notifications]);
          setLastId(lastId * 20)
        } else {
          setNotiData([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setPageloading(false);

      });
  };
  const handleUpdate = async () => {
    await updateNotify()
      .then((result) => {
        if (result.data.success && isChecked === false) {
          getNotifyData(false)
          return
        }
      }).catch((err) => {
        console.log(err);
      });
  }
  const handleNavigate = (type, id) => {
    if (type === 'message') {
      navigate(`/chat`, { state: { chatId: id } })
    } else if (type === 'applyJob') {
      navigate(`/candidate-list`,)
    }
  }
  useEffect(() => {
    setPageloading(true)
    getNotifyData()
  }, []);
  return (
    <div className="bg-light">
      <div className="container ">
        <div className="min-vh-100 py-5">
          <h5 className="mb-4 fw-bold pt-5"> Notifications:</h5>
          {pageloading ?

            <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '10vh' }}>
              <Spinner />
            </div> :
            <>
              <div className="row g-3">
                {notiData?.map((items, index) => (
                  <div key={index} className="col-xl-4 col-lg-5 col-md-6 " >
                    <div className="card px-3 rounded-4 py-3 key-feature shadow-sm w-100 h-100  " style={{ maxWidth: "30rem", cursor: "pointer", border: "1px solid transparent", }}>
                      <div className="d-flex gap-3" onClick={() => handleNavigate(items.type, items?.user)}>
                        <div>
                          <div
                            className={`btn  ${items.seen === false ? 'btn-outline-danger' : "btn-outline-success"} rounded-circle position-relative p-0 d-flex justify-content-center align-items-center`}
                            style={{ height: "2.4rem", width: "2.4rem" }}>
                            {items?.to_id?.profileImage ?
                              <img src={global.BASEURL + "/" + items?.to_id?.profileImage} alt='' className='h-100 w-100 object-cover bg-light rounded-circle' /> :
                              <MdNotificationAdd size={25} />}
                            {items.seen === false &&
                              <div
                                style={{
                                  position: "absolute",
                                  top: -5,
                                  left: 0,
                                  minWidth: "fit-content",
                                  fontSize: '8px'
                                }}>
                                <div className='h-3 w-3 bg-danger rounded-circle'>
                                </div>
                              </div>}
                          </div>
                        </div>
                        <div>
                          <div className="fs_09 fw-bold">{items.title}</div>
                          <div className="fs_08 " style={{ maxWidth: "300px" }}>
                            {items.description}
                          </div>
                          <div className="fs_07 text-muted mt-1" >
                            <Moment format='lll'>
                              {items.createdAt}
                            </Moment>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center my-3">
                {
                  lastId * 20 > notiCount ? (

                    <button onClick={handleBottomScroll} className="see_more btn btn-soft-primary">
                      {pageloading ? <Spinner size="sm" /> : "See more"}

                    </button>
                  ) : ''
                }
              </div>
            </>}
        </div>
      </div>
    </div>
  );
};

export default AllNotification;
