import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cartItems: [],
	cartTotalCount: 0,
	showCart: false,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cartHandler: (state) => {
			state.showCart = !state.showCart
		},
		addToCart: (state, action) => {
			const itemIndex = state.cartItems.find(
				(item) => item.id === action.payload.id
			)

			const nextCartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== action.payload.id
			)

			if (itemIndex) {
				state.cartItems = nextCartItems
			} else {
				const tempProduct = { ...action.payload, count: 1 }
				state.cartItems.push(tempProduct)
			}
		},
		removeFromCart: (state, action) => {
			const nextCartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== action.payload.id
			)

			state.cartItems = nextCartItems
		},
		increaseCartItemQuantity: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			)

			if (itemIndex >= 0) {
				state.cartItems[itemIndex].count += 1
			} else {
				const tempProduct = { ...action.payload, count: 1 }
				state.cartItems.push(tempProduct)
			}
		},
		decreaseCartItemQuantity: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(cartItem) => cartItem.id === action.payload.id
			)

			if (state.cartItems[itemIndex].count > 1) {
				state.cartItems[itemIndex].count -= 1
			} else if (state.cartItems[itemIndex].count === 1) {
				const nextCartItems = state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload.id
				)

				state.cartItems = nextCartItems
			}
		},
		getTotals: (state) => {
			state.cartTotalCount = state.cartItems.length
		},
	},
})

export const {
	addToCart,
	increaseCartItemQuantity,
	decreaseCartItemQuantity,
	cartHandler,
	removeFromCart,
	getTotals,
} = cartSlice.actions

export default cartSlice.reducer
