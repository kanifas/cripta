import React, { useState, FC } from 'react'
import {
    Select,
    Typography,
    Row,
    Col,
    Avatar,
    Card
} from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../../services/cryptoApi'

import { TNewsObject } from './types'

import fakeImg from './fake.png'

import { Loader } from '..'

moment.locale('ru');

const { Text, Title } = Typography
const { Option } = Select

interface IProps {
    simplified?: boolean
}

const News: FC<IProps> = ({ simplified }) => {
    const [category, setCategory] = useState('Cryptocurrency')
    const { data: news } = useGetCryptoNewsQuery({
        category,
        count: simplified ? 6 : 100
    })
    const { data } = useGetCryptosQuery(100)

    if (!news?.value) {
        return <Loader />
    }

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Тип крипты"
                        optionFilterProp="children"
                        onChange={value => setCategory(value)}
                        filterOption={(input: string, option) => {
                            return true
                            // return option?.children?.toLowerCase().indexOf(input.toLowerCase() >= 0)
                        }}
                    >
                        <Option value="Cryptocurrency">Криптовалюты</Option>
                        {data?.data?.coins.map(({ name }: { name: string }) => <Option key={name} value={name}>{name}</Option>)}
                    </Select>
                </Col>
            )}
            {news.value.map((item: TNewsObject, index: number) => (
                <Col xs={24} sm={12} lg={8} key={item.name}>
                    <Card hoverable className="news-card">
                        <a href={item.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{item.name}</Title>
                                <img className="img" src={item?.image?.thumbnail?.contentUrl || fakeImg} alt="News preview" />
                            </div>
                            <p>
                                {item.description.length > 100
                                    ? `${item.description.substring(0, 100)} ...`
                                    : item.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={item.provider[0]?.image?.thumbnail?.contentUrl || fakeImg} />
                                    <Text className="provider-name">{item.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(item.datePublished).fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
