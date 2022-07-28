import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (build) => ({
		getBanners: build.query({
			query: () => '/banners/',
		}),
		getCategories: build.query({
			query: () => '/categories/',
		}),
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
		getDetailProduct: build.query({
			query: (id) => `/products/${id}`,
		}),
		getDetailProductReviews: build.query({
			query: (id) => `/products/${id}/reviews/`,
		}),
		getDetailProductFeatures: build.query({
			query: (id) => `/products/${id}/features/`,
		}),
		getDetailRelatedProducts: build.query({
			query: (slug) => `/products/${slug}/related/`,
		}),
	}),
})

export const {
	useGetBannersQuery,
	useGetCategoriesQuery,
	useGetProductsQuery,
	useGetLatestProductsQuery,
	useGetTopSellerProductsQuery,
	useGetMostCommonProductsQuery,
	useGetDetailProductQuery,
	useGetDetailProductReviewsQuery,
	useGetDetailProductFeaturesQuery,
	useGetDetailRelatedProductsQuery,
} = apiSlice
