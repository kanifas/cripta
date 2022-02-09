import React, { useState, useEffect, FC } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../../services/cryptoApi'

import { Loader } from '..'

import { TCurrency } from './types'

interface IProps {
    simplified?: boolean
}

const Currencies: FC<IProps> = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState(cryptoList?.data?.coins)
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
                {cryptos?.map((currency: TCurrency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" height="35" src={currency.iconUrl} alt="icon" />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Currencies;