import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {
    Row,
    Col,
    Statistic,
    Typography,
} from 'antd'

import { useGetCryptosQuery } from '../../services/cryptoApi'
//console.log(cryptoApi)

import {
    Currencies,
    News
} from '../'

const { Title } = Typography

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats

    if (isFetching) {
        return 'Загрузка  ...'
    }

    return (
        <>
            <Title level={2} className="heading">Глобальная крипто-статистика</Title>
            <Row>
                <Col span={12}><Statistic title="Total cryptocurrencies" value={millify(globalStats.totalCoins)} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Топ-10 криптовалют в мире</Title>
                <Title level={3} className="show-more">
                    <Link to="/currencies">
                        Показать еще
                    </Link>
                </Title>
            </div>
            <Currencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Свежие крипто новости</Title>
                <Title level={3} className="show-more">
                    <Link to="/news">
                        Показать еще
                    </Link>
                </Title>
            </div>
            <News simplified />
        </>
    );
};

export default Homepage;
