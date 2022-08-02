import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	showMenu: false,
}

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		menuHandler: (state) => {
			state.showMenu = !state.showMenu
		},
	},
})

export const { menuHandler } = menuSlice.actions
export default menuSlice.reducer
