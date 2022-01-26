import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    MoneyCollectOutlined,
    BulbOutlined,
    FundOutlined,
    MenuOutlined,
} from '@ant-design/icons'
import logo from '../images/logo.svg'

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={logo} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cripta</Link>
                    {/* <Button className="menu-control-container">

                    </Button> */}
                </Typography.Title>
            </div>
            <Menu theme="dark">
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to="/">Домой</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                    <Link to="/currencies">Криптовалюты</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />}>
                    <Link to="/exchanges">Курс</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                    <Link to="/news">Новенькое</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default Navbar
