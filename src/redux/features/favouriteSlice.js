import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	favourites: [],
	favouritesTotalCount: 0,
	showFavourites: false,
}

const favouriteSlice = createSlice({
	name: 'favourite',
	initialState,
	reducers: {
		favouritesHandler: (state) => {
			state.showFavourites = !state.showFavourites
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
		},
		removeFromFavourites: (state, action) => {
			const nextCartItems = state.favourites.filter(
				(favouriteItem) => favouriteItem.id !== action.payload.id
			)

			state.favourites = nextCartItems
		},
		getFavouritesTotal: (state) => {
			state.favouritesTotalCount = state.favourites.length
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
