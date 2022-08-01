import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// import { loginUser } from '../../Repository/UserApi'
import { useNavigate } from 'react-router'
import Modal from '../../Components/Modal'
// import { useCookies } from 'react-cookie'
import AuthenticationContext from '../../Context/AuthenticationContext'
import Categories from '../../Components/Categories'

import { useLoginUserMutation } from '../../redux/api/apiSlice'
import { useDispatch } from 'react-redux'
import {
	authHandler,
	saveToken,
	saveRefreshToken,
} from '../../redux/features/userSlice'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

const LogInSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(6, 'Too short!')
		.max(13, 'Too long')
		.required('Required'),
})

const LoginPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [loginUser, { data: loginData, isSuccess, isError, error }] =
		useLoginUserMutation()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: LogInSchema,
		onSubmit: (values) => {
			loginUser(values)
				.then((res) => {
					console.log(res)
					if (res.data.access && res.data.refresh) {
						dispatch(authHandler(true))
						dispatch(saveToken(res.data.access))
						dispatch(saveRefreshToken(res.data.refresh))
						navigate('/user/profile')
					}
					// if (res.data.access && res.data.refresh) {
					// 	// setCookie('access', res.data.access, { path: '/' })
					// 	// setCookie('refresh', res.data.refresh, { path: '/' })
					// 	navigate('/user/profile')
					// 	setIsAccountExist(true)
					// }
				})
				.catch((error) => {
					console.log(error)
				})
		},
	})

	return (
		<section className='login-page'>
			<div className='contact-wrapper'>
				<header className='login-cta'>
					<h2>Account Login</h2>
				</header>
				<form onSubmit={formik.handleSubmit}>
					<div className='form-row'>
						<input
							onChange={formik.handleChange}
							value={formik.values.email}
							autoComplete='email'
							type='email'
							name='email'
							required
						/>
						<span>Email</span>
					</div>
					{formik.errors.email ? (
						<div className='error__field'>{formik.errors.email}</div>
					) : null}

					<div className='form-row'>
						<input
							onChange={formik.handleChange}
							value={formik.values.password}
							autoComplete='current-password'
							type='password'
							name='password'
							required
						/>
						<span>Password</span>
					</div>
					{formik.errors.password ? (
						<div className='error__field'>{formik.errors.password}</div>
					) : null}
					<div className='form-row' />
					<div className='form-row'>
						<button type='submit'>Login to your Account!</button>
					</div>
				</form>
				<div className='socials-wrapper'>
					<header>
						<h2>Login with your Social Account</h2>
					</header>
					<ul>
						<li>
							<a href='https://google.com/' className='youtube'>
								<FcGoogle style={{ fontSize: '32px' }} />
							</a>
						</li>
						<li>
							<a href='https://google.com/' className='facebook'>
								<FaFacebookF style={{ fontSize: '20px' }} />
							</a>
						</li>
					</ul>
				</div>
				<div style={{ textAlign: 'center' }}>
					Don't have an account yet? <Link to={'/auth'}>Sign up!</Link>
				</div>
				<div>
					{/* {isAccountExist ? (
						<Modal
							setState={setIsAccountExist}
							text={'No active account found with the given credentials'}
						/>
					) : null} */}
				</div>
			</div>

			<div className={'mobile__category'}>
				<Categories />
			</div>
		</section>
	)
}

export default LoginPage
