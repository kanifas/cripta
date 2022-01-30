import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'X7PkgLgGHB55wT7sMQwvsnDmHk6Ly4LB'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequestHelper = url => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query: (count = 100) => createRequestHelper(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequestHelper(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinid, timeperiod }) => createRequestHelper(`/coin/${coinid}/history?timeperiod=${timeperiod}`)
        })
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi