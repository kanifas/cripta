import React from 'react'
import { Typography, Space } from 'antd'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}}>
                Crypta
            </Typography.Title>
            <Space>
                <Link to="/">Главная</Link>
                <Link to="/exchanges">Биржи</Link>
                <Link to="/news">Новости</Link>
            </Space>
        </div>
    )
}

export default Footer
