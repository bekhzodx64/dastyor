import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config'

export const productsApi = createApi({
	reducerPath: 'products',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (build) => ({
		getProducts: build.query({
			query: () => '/products/',
		}),
		getLatestProducts: build.query({
			query: () => '/products/latest/',
		}),
		getTopSellerProducts: build.query({
			query: () => '/products/top-seller/',
		}),
		getMostCommonProducts: build.query({
			query: () => '/products/most-common/',
		}),
	}),
})

export const {
	useGetProductsQuery,
	useGetLatestProductsQuery,
	useGetTopSellerProductsQuery,
	useGetMostCommonProductsQuery,
} = productsApi
