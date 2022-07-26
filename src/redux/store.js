import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import cartReducer from './features/cartSlice'
import favouriteReducer from './features/favouriteSlice'
import userReducer from './features/userSlice'
import menuReducer from './features/menuSlice'

// autosave states to localStorage
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
	cartReducer,
	favouriteReducer,
	userReducer,
	menuReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [apiSlice.reducerPath],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware),
})

export const persistor = persistStore(store)

export default store
