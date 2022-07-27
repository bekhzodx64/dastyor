import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config'

export const categoriesApi = createApi({
	reducerPath: 'categories',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (build) => ({
		getCategories: build.query({
			query: () => '/categories/',
		}),
	}),
})

export const { useGetCategoriesQuery } = categoriesApi
