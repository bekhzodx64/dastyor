import axios from 'axios'
import { Cookies } from 'react-cookie'

const _apiBase = 'https://dastyor.site.uz/api'
const cookies = new Cookies()

export const getData = async (url) => {
	const lang = localStorage.getItem('lang')
	const country = JSON.parse(localStorage.getItem('country'))
	const res = await axios.get(_apiBase + url, {
		headers: {
			'Content-type': 'application/json',
			'Accept-Language': lang != null ? lang : 'ru',
			'Accept-Country': country != null ? country.code : '',
		},
	})
	if (!res.status) {
		throw new Error('We have an error' + res.statusText)
	}
	return res
}

export const getWithToken = async (url) => {
	const token = cookies.get('access')
	const res = await axios.get(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
	if (!res.status) {
		throw new Error('We have an error' + res.statusText)
	}
	return res
}

export const postData = async (url, data) => {
	const res = await axios.post(_apiBase + url, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (!res.status) {
		throw new Error('We have an error' + res.statusText)
	}

	return res
}

export const patchData = async (url, data) => {
	const token = cookies.get('access')
	const res = await axios.patch(_apiBase + url, data, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
	if (!res.status) {
		throw new Error('We have an error' + res.statusText)
	}

	return res
}

export const postDataWithToken = async (url, data) => {
	const token = cookies.get('access')
	const res = await axios.post(_apiBase + url, data, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
	if (!res.status) {
		throw new Error('We have an error' + res.statusText)
	}

	return res
}

export const searchProduct = async (params) => {
	const res = await axios.get(_apiBase + '/products/', {
		params: { ...params },
	})
	if (!res.status) {
		throw new Error('We have an error' + res.statusText)
	}
	return res
}
