import { getData } from './BaseApi'

export const getCurrentCountry = async () => getData('/countries/')

export const getPrices = async (url) =>
	getData(`/products/${url}/extrimal-prices`)

export const getFilters = async (id) =>
	getData(`/feature-group/?category=${id}`)
