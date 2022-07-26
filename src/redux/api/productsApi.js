import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
	reducerPath: 'products',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dastyor.site.uz/api/' }),
	endpoints: (build) => ({
		getProducts: build.query({
			query: () => '/products/',
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
	useGetTopSellerProductsQuery,
	useGetMostCommonProductsQuery,
} = productsApi
