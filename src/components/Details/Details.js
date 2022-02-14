import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import {
    Col,
    Row,
    Typography,
    Select
} from 'antd'
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons'

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi'

import { Loader } from '../'
import { LineChart } from '../'

const { Title, Text } = Typography
const { Option } = Select

const Details = () => {
    const { coinid } = useParams()
    const [timeperiod, setTimeperiod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinid)
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinid, timeperiod })
    const details = data?.data?.coin;

    if (isFetching) return <Loader />;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

    const stats = [
        { title: 'Price to USD', value: `$ ${details?.price && millify(details?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: details?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${details?.volume && millify(details?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${details?.marketCap && millify(details?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${details?.allTimeHigh?.price && millify(details?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];
    
    const genericStats = [
        { title: 'Number Of Markets', value: details?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: details?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: details?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${details?.supply?.total && millify(details?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${details?.supply?.circulating && millify(details?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {data?.data?.coin.name} ({data?.data?.coin.symbol})
                </Title>
                <p>Текущая цена <b>{details.name}</b> в долларах США (USD). Просмотр статистики стоимости, рыночной капитализации и предложения</p>
            </Col>
            <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
                {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>
            
            <LineChart coinHistory={coinHistory} currentPrice={millify(details?.price)} coinName={details?.name} />

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">Статистика стоимости {details.name}</Title>
                        <p>Обзор статистики {details.name}, такой как базовая и котируемая валюта, рейтинг и объем торгов</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">Прочая инфа</Title>
                        <p>Обзор статистики {details.name}, такой как базовая и котируемая валюта, рейтинг и объем торгов</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={title}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">Что такое {details.name}?</Title>
                    {HTMLReactParser(details.description)}
                </Row>
                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">{details.name} ссылки</Title>
                    {details.links?.map((link) => (
                        <Row className="coin-link" key={link.name + link.type}>
                            <Title level={5} className="link-name">{link.type}</Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default Details;
