import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bannersApi = createApi({
	reducerPath: 'banners',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dastyor.site.uz/api/' }),
	endpoints: (build) => ({
		getBanners: build.query({
			query: () => '/banners/',
		}),
	}),
})

export const { useGetBannersQuery } = bannersApi
