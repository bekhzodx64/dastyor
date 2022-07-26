import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesApi = createApi({
	reducerPath: 'categories',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dastyor.site.uz/api/' }),
	endpoints: (build) => ({
		getCategories: build.query({
			query: () => '/categories/',
		}),
	}),
})

export const { useGetCategoriesQuery } = categoriesApi
