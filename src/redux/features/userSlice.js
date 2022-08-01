import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	first_name: '',
	last_name: '',
	email: '',
	phone: '',
	accessToken: '',
	refreshToken: '',
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
	},
})

export const { authHandler, saveToken, saveRefreshToken, logOutHandler } =
	userSlice.actions
export default userSlice.reducer
