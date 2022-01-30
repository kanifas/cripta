import React from 'react';
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

const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
    const { data: news } = useGetCryptoNewsQuery({
        category: 'Cryptocurrency',
        count: simplified ? 10 : 100
    })

    console.log(news);

    return (
        <div>
            News
        </div>
    );
};

export default News;
