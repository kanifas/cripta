import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    MoneyCollectionOutlined,
    BulpOutlined,
    FundOutlined,
    MenuOutlined,
} from '@ant-design/icons'
import logo from '../images/logo.png'

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={logo} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Крипта</Link>
                    {/* <Button className="menu-control-container">

                    </Button> */}
                </Typography.Title>
            </div>
        </div>
    );
};

export default Navbar;
