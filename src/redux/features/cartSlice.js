import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cartItems: localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems'))
		: [],
	cartTotalCount: 0,
	showCart: false,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		cartHandler: (state, action) => {
			state.showCart = action.payload
		},
		addToCart: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			)

			const nextCartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== action.payload.id
			)

			if (itemIndex >= 0) {
				state.cartItems = nextCartItems
			} else {
				const tempProduct = { ...action.payload, count: 1 }
				state.cartItems.push(tempProduct)
			}

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
		},
		removeFromCart: (state, action) => {
			const nextCartItems = state.cartItems.filter(
				(cartItem) => cartItem.id !== action.payload.id
			)

			state.cartItems = nextCartItems

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
		},
		increaseCartItemQuantity: (state, action) => {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			)

			if (itemIndex >= 0) {
				state.cartItems[itemIndex].count += 1
			}

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
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
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
		},
		getTotals: (state) => {
			let { quantity } = state.cartItems.reduce(
				(cartTotal, cartItem) => {
					const { count } = cartItem
					cartTotal.quantity += count
					return cartTotal
				},
				{
					quantity: 0,
				}
			)
			state.cartTotalCount = quantity
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
