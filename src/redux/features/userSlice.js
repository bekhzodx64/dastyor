import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	first_name: '',
	last_name: '',
	photo: '',
	email: '',
	phone: '',
	token: '',
	refresh: '',
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
			state.token = payload
		},
		saveRefreshToken: (state, { payload }) => {
			state.refresh = payload
		},
		logOutHandler: (state) => {
			state.isAuthenticated = false
			state.token = ''
			state.refresh = ''
			state.first_name = ''
			state.last_name = ''
			state.photo = ''
			state.email = ''
			state.phone = ''
			state.location = ''
			state.locationCode = ''
			state.language = ''
			state.languageCode = ''
		},
		setLocation: (state, { payload }) => {
			state.location = payload
		},
		setLocationCode: (state, { payload }) => {
			state.locationCode = payload
		},
		setLanguage: (state, { payload }) => {
			state.language = payload
		},
		saveFirstName: (state, { payload }) => {
			state.first_name = payload
		},
		saveLastName: (state, { payload }) => {
			state.last_name = payload
		},
		savePhoto: (state, { payload }) => {
			state.photo = payload
		},
	},
})

export const {
	authHandler,
	saveToken,
	saveFirstName,
	saveLastName,
	savePhoto,
	saveRefreshToken,
	logOutHandler,
	setLocation,
	setLocationCode,
} = userSlice.actions

export default userSlice.reducer
