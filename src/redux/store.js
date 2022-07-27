import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from './api/productsApi'
import { bannersApi } from './api/bannersApi'
import { categoriesApi } from './api/categoriesApi'
import cartReducer from './features/cartSlice'
import favouriteReducer from './features/favouriteSlice'

export const store = configureStore({
	reducer: {
		cartReducer,
		favouriteReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[bannersApi.reducerPath]: bannersApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
})
