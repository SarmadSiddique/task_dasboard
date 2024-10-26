/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Container, } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom';
import './navbar.css'
import { BsTextIndentLeft, BsTextIndentRight } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
// import { setSideCollapse, setToggle } from '../redux/chat';
import { Dropdown, message, Space } from 'antd';
import { Avatar } from '@mui/material';
import { DownOutlined } from '@ant-design/icons';
import { IoIosMenu } from "react-icons/io";
import { blog1, logo } from '../icons/icon';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { setLogout } from '../redux/loginForm';
import { setSideCollapse, setToggle } from '../redux/sidebar';

function ScrollHandler() {
    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('nav_id');
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                element.classList.add('nav_shadow')
            } else {
                element.classList.remove('nav_shadow')
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return null;
}
const NavHeader2 = () => {
    const collapsed = useSelector(state => state.sidebar.collapse)
    const toggle = useSelector(state => state.sidebar.toggle)
    const dispatch = useDispatch()
    const items = [
        {
            label: 'Log out',
            key: '0',
            icon: <HiArrowLeftStartOnRectangle size={20} />,
        },

    ];
    const onClick = ({ key }) => {
        if (key === '0') {
            dispatch(setLogout())
            message.success('Logout Successfully')
        }
    };
    return (
        <>
            <ScrollHandler />
            <Navbar bg="transparent" expand="lg" sticky='top' className='main_nav px-sm-1 py-2 top-0 ' style={{ zIndex: '99' }} id="navbar">
                <button className='d-lg-block d-none me-2' onClick={() => dispatch(setSideCollapse(!collapsed))} >
                    {collapsed ? <BsTextIndentLeft size={25} /> :
                        <BsTextIndentRight size={25} />}
                </button>
                <Container fluid ={'xxl'} className='px-3 bg-light py-2 rounded-2 shadow-sm' id='nav_id'>
                    <div className='d-flex items-center gap-2'>
                        <button className='d-lg-none d-inline-flex' onClick={() => dispatch(setToggle(!toggle))} >
                            <IoIosMenu size={25} />
                        </button>
                        <Link to='/' style={{ textDecoration: "none" }} className='text_primary' >
                            Dashboard
                        </Link>
                    </div>
                    <div>
                        <Dropdown
                            menu={{
                                items,
                                onClick
                            }}
                            className='w-100'
                            arrow={false}
                            trigger={['click']}>
                            <Space className='cursor-pointer' >
                                <img src={blog1} className='profile' alt='' />
                            </Space>
                        </Dropdown>
                    </div>
                </Container>
            </Navbar >
        </>

    )
}

export default NavHeader2
