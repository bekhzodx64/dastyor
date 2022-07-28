import React from 'react'
import { Navigate, Outlet } from 'react-router'

const PrivateRoute = ({ authenticated }) => {
	return authenticated ? <Outlet /> : <Navigate to='/login' />
}
export default PrivateRoute
