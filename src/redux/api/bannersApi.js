import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config'

export const bannersApi = createApi({
	reducerPath: 'banners',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (build) => ({
		getBanners: build.query({
			query: () => '/banners/',
		}),
	}),
})

export const { useGetBannersQuery } = bannersApi
