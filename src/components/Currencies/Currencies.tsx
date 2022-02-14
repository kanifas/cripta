import React, { useState, useEffect, FC } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../../services/cryptoApi'

import { Loader } from '..'

// import { TCurrency } from './types'

interface IProps {
    simplified?: boolean
}

interface ICoin {
    "24hVolume": string
    btcPrice: string
    change: string
    coinrankingUrl: string
    color: string
    iconUrl: string
    listedAt: number
    lowVolume: boolean
    marketCap: string
    name: string
    price: string
    rank: number
    sparkline: Array<string>
    symbol: string
    tier: number
    uuid: string
}

const Currencies: FC<IProps> = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState<ICoin[]>([] as Array<ICoin>)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter(
            (coin: {name: string}) => coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )        
        setCryptos(filteredData)
    }, [cryptoList, searchTerm])

    if (isFetching) {
        return <Loader />
    }

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Фильтр по криптовалюте" 
                        value={searchTerm} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((coin: ICoin) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
                        <Link to={`/crypto/${coin.uuid}`}>
                            <Card
                                title={`${coin.rank}. ${coin.name}`}
                                extra={<img className="crypto-image" height="35" src={coin.iconUrl} alt="icon" />}
                                hoverable
                            >
                                <p>Price: {millify(Number(coin.price))}</p>
                                <p>Market Cap: {millify(Number(coin.marketCap))}</p>
                                <p>Daily Change: {millify(Number(coin.change))}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Currencies;
