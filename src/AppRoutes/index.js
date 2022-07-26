import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserBookings from '../Pages/UserBookings'
import Spinner from '../Components/Spinner'

import { useSelector } from 'react-redux'

const DetailPage = lazy(() => import('../Pages/DetailPage/DetailPage'))
const HomePage = lazy(() => import('../Pages/HomePage/HomePage'))
const ListPage = lazy(() => import('../Pages/ListPage/ListPage'))
const LoginPage = lazy(() => import('../Pages/LoginPage/LoginPage'))
const AuthPage = lazy(() => import('../Pages/AuthPage/AuthPage'))
const CategoryPage = lazy(() => import('../Pages/CategoryPage/CategoryPage'))
const UserProfile = lazy(() => import('../Pages/UserProfile/UserProfile'))
const OrderPage = lazy(() => import('../Pages/OrderPage/OrderPage'))
const NotFoundPage = lazy(() => import('../Pages/NotFoundPage/NotFoundPage'))
const SearchPage = lazy(() => import('../Pages/SearchPage/SearchPage'))

const AppRoutes = () => {
	const isAuthenticated = useSelector(
		(state) => state.userReducer.isAuthenticated
	)

	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/product/search' element={<SearchPage />} />
				<Route path='/category/:url' element={<ListPage />} />
				<Route path='/category/:url/:main_url' element={<DetailPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='/category' element={<CategoryPage />} />
				<Route
					path='/user/profile'
					element={isAuthenticated ? <UserProfile /> : <LoginPage />}
				/>
				<Route
					path='/user/bookings'
					element={isAuthenticated ? <UserBookings /> : <LoginPage />}
				/>
				<Route
					path='/order'
					element={isAuthenticated ? <OrderPage /> : <LoginPage />}
				/>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	)
}

export default AppRoutes
