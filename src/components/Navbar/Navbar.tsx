import React, { useState, useEffect, FC } from 'react';
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

const Navbar: FC = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null as unknown as number)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize < 800) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={logo} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cripta</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />} key="home">
                        <Link to="/">Домой</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />} key="currencies">
                        <Link to="/currencies">Криптовалюты</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />} key="exchanges">
                        <Link to="/exchanges">Биржы</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />} key="news">
                        <Link to="/news">Новости</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    );
};

export default Navbar
