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
    DollarCirclesOutlined,
    FundOutlined,
    ExclamationCirclesOutlined,
    StopOutlined,
    TrophyOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const Details = () => {
    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d')

    return (
        <div>
            Details
        </div>
    );
};

export default Details;
