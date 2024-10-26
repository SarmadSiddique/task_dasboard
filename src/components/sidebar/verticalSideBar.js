/* eslint-disable no-unused-vars */
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useEffect, useState } from 'react'
import { Edit, X } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {  setToggle } from '../redux/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarConfig } from './siderbarConfig';
import { menuItems } from '../icons/icon';

const VerticalSideBar = () => {
    const collapsed = useSelector(state => state.sidebar.collapse)
    const toggle = useSelector(state => state.sidebar.toggle)
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();

    const [openSubmenus, setOpenSubmenus] = useState({});

    const isSubMenuItemActive = (submenu) => {
        return submenu.some((subitem) => location.pathname === subitem.path);
    };

    useEffect(() => {
        const newOpenSubmenus = {};
        menuItems.forEach((item) => {
            if (item.submenu) {
                newOpenSubmenus[item.label] = isSubMenuItemActive(item.submenu);
            }
        });
        setOpenSubmenus(newOpenSubmenus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleSubMenuClick = (label) => {
        setOpenSubmenus((prevState) => ({
            ...prevState,
            [label]: !prevState[label],
        }));
    };
    return (
        <>
            <Sidebar
                className="vh-100"
                collapsed={collapsed}
                backgroundColor={sidebarConfig?.bgColor}
                onBackdropClick={() => dispatch(setToggle(false))}
                collapsedWidth={sidebarConfig?.collapsedWidth}
                toggled={toggle}
                breakPoint={toggle ? "all" : "lg"}>
                <div className="flex justify-between items-center inter_medium p-2 position-sticky top-0 relative z-[999]">
                    <div className="w-100  py-3 ps-2 cursor-pointer" onClick={() => navigate('/')} >
                        Logo
                    </div>
                    <div>
                        <button
                            className="btn btn-light rounded-circle p-0 h-[2.4rem] w-[2.4rem] d-lg-none d-flex justify-center items-center"
                            onClick={() => dispatch(setToggle(!toggle))}
                        >
                            <X size={25} />
                        </button>
                    </div>
                </div>
                <Menu className=''>
                    {menuItems.map((item) => {
                        if (item.submenu) {
                            return (
                                <SubMenu
                                    label={item.label}
                                    key={item.label}
                                    icon={item.icon}
                                    open={openSubmenus[item.label]} // Control submenu open state dynamically
                                    onOpenChange={() => handleSubMenuClick(item.label)} // Handle submenu click to toggle
                                    className=""
                                >
                                    {item.submenu.map((subitem) => (
                                        <MenuItem
                                            key={subitem.label}
                                            icon={subitem.icon}
                                            onClick={() => navigate(subitem.path)}
                                            className={` ${location.pathname === subitem.path && "active"
                                                }`}
                                        >
                                            {subitem.label}
                                        </MenuItem>
                                    ))}
                                </SubMenu>
                            );
                        } else {
                            return (
                                <MenuItem
                                    key={item.label}
                                    icon={item.icon}
                                    onClick={() => navigate(item.path)}
                                    className={`${location.pathname === item.path && "active"
                                        }`}
                                >
                                    {item.label}
                                </MenuItem>
                            );
                        }
                    }
                    )}
                </Menu>
            </Sidebar>
        </>
    )
}

export default VerticalSideBar