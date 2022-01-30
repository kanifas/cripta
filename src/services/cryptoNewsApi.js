import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'X7PkgLgGHB55wT7sMQwvsnDmHk6Ly4LB'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequestHelper = url => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptoNews: builder.query({
            query: ({ category, count }) => createRequestHelper(`/news/search?q=${category}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi