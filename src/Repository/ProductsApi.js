import { getData, postDataWithToken } from './BaseApi'
import axios from 'axios'

export const getProductBySlug = (url) =>
	getData(`/products/${url}/categorized/`)

export const getProductByNext = async (url) => {
	const res = await axios.get(url)
	return res
}
export const getProduct = (url) => getData(`/products/${url}`) // ready
export const getProductsRelated = (url) => getData(`/products/${url}/related/`) // ready
export const getProductCharac = (url) => getData(`/products/${url}/features/`) // ready
export const getProductReview = (id) => getData(`/products/${id}/reviews/`) // ready
export const postComment = (data) => postDataWithToken('/product-rating/', data)
export const createOrder = (data) => postDataWithToken('/orders/create/', data)
