/* eslint-disable no-unused-vars */
import {
    Route,
    Routes,
} from "react-router-dom";
import Signin from "../pages/login";
import Signup from "../pages/signup";
import PublicRoutes from '../redux/auth/publicRoutes'
import PrivateRoutes from '../redux/auth/privateRoutes'
import React from 'react'
import VerifyCode from "../pages/verifyCode";
import SidebarLayout from "../layout/sidebarLayout";
import Messages from './../pages/chat/message';
import Home from "../pages/home";
import NoMatch from './../snackbar/nomatch';
import Footer from "../pages/footer";
import Optimize from "../pages/optimize";

const Routing = () => {
    return (
        <>
            <Routes>
                {/* <Route element={<PrivateRoutes />}> */}
                <Route path="/" element={<Home />} ></Route>
                <Route path="/optimize" element={<Optimize />} ></Route>

                <Route path="/sidebar-layout" element={<SidebarLayout />} ></Route>
                <Route path="/chat/:id?" element={<Messages />} ></Route>
                {/* </Route> */}
                {/* <Route element={<PublicRoutes />}>
                    <Route path="login" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="code-verify" element={<VerifyCode />} />
                </Route> */}
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    )
}

export default Routing