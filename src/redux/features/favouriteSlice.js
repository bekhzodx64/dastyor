import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	favourites: localStorage.getItem('favourites')
		? JSON.parse(localStorage.getItem('favourites'))
		: [],
	favouritesTotalCount: 0,
	showFavourites: false,
}

const favouriteSlice = createSlice({
	name: 'favourite',
	initialState,
	reducers: {
		favouritesHandler: (state, action) => {
			state.showFavourites = action.payload
		},
		addToFavorites: (state, action) => {
			const itemIndex = state.favourites.findIndex(
				(item) => item.id === action.payload.id
			)

			const nextCartItems = state.favourites.filter(
				(favouriteItem) => favouriteItem.id !== action.payload.id
			)

			if (itemIndex >= 0) {
				state.favourites = nextCartItems
			} else {
				const tempProduct = { ...action.payload, count: 1 }
				state.favourites.push(tempProduct)
			}

			localStorage.setItem('favourites', JSON.stringify(state.favourites))
		},
		removeFromFavourites: (state, action) => {
			const nextCartItems = state.favourites.filter(
				(favouriteItem) => favouriteItem.id !== action.payload.id
			)

			state.favourites = nextCartItems

			localStorage.setItem('favourites', JSON.stringify(state.favourites))
		},
		getFavouritesTotal: (state) => {
			let { quantity } = state.favourites.reduce(
				(favouriteTotal, favouriteItem) => {
					const { count } = favouriteItem
					favouriteTotal.quantity += count
					return favouriteTotal
				},
				{
					quantity: 0,
				}
			)
			state.favouritesTotalCount = quantity
		},
	},
})

export const {
	favouritesHandler,
	addToFavorites,
	removeFromFavourites,
	getFavouritesTotal,
} = favouriteSlice.actions
export default favouriteSlice.reducer
