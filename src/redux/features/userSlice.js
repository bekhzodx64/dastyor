import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	first_name: '',
	last_name: '',
	email: '',
	phone: '',
	accessToken: '',
	refreshToken: '',
	location: '',
	locationCode: '',
	language: '',
	langCode: '',
}

const userSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		authHandler: (state, { payload }) => {
			state.isAuthenticated = payload
		},
		saveToken: (state, { payload }) => {
			state.accessToken = payload
		},
		saveRefreshToken: (state, { payload }) => {
			state.refreshToken = payload
		},
		logOutHandler: (state) => {
			state.isAuthenticated = false
			state.accessToken = ''
			state.refreshToken = ''
		},
		setLocation: (state, { payload }) => {
			state.location = payload
		},
		setLocationCode: (state, { payload }) => {
			state.locationCode = payload
		},
	},
})

export const {
	authHandler,
	saveToken,
	saveRefreshToken,
	logOutHandler,
	setLocation,
	setLocationCode,
} = userSlice.actions

export default userSlice.reducer
