import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './api/productsApi'
import { bannersApi } from './api/bannersApi'
import { categoriesApi } from './api/categoriesApi'
import cartReducer from './features/cartSlice'
import favouriteReducer from './features/favouriteSlice'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[bannersApi.reducerPath]: bannersApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		cart: cartReducer,
		favourite: favouriteReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
})
