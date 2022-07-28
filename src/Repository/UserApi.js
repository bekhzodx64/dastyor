import { getData, patchData, postData } from './BaseApi'

export const createUser = (data) => postData('/client/', data)

export const loginUser = (data) => postData('/token/', data)

export const changeUserInfo = (id, data) =>
	patchData('/client/' + id + '/', data)

export const getUserInfo = (id) => getData(`/client/${id}/`)

export const refreshToken = (refresh) =>
	postData('/token/refresh/', {
		refresh: refresh,
	})
