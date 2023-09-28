import React from 'react';
import { Layout, Button, Space } from 'antd';
import { logout } from "@/redux/actions/auth";
import { useDispatch,useSelector } from "react-redux"

const { Header } = Layout;

const AppHeader = () => {
    const username=useSelector(state=>state.auth.user.name);

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Header>
            <div className='flex justify-between items-center'>
                <div className='text-white'>E-SHOP-ADMIN</div>
                <div>
                    <Space>
                        <div className='text-white'>Welcome, {username}</div>
                        <Button type="link" onClick={handleLogout} className='text-white'>
                            Logout
                        </Button>
                    </Space>
                </div>
            </div>
        </Header>
    );
};

export default AppHeader;