import React, { useState } from 'react'
import '../LoginPage/LoginPage.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createUser } from '../../Repository/UserApi'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../../Components/Modal'
import Categories from '../../Components/Categories'

import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

const SignupSchema = Yup.object().shape({
	first_name: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	last_name: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(6, 'Too short!')
		.max(13, 'Too long')
		.required('Required'),
})

const LoginPage = () => {
	const navigate = useNavigate()
	const [isExist, setIsExist] = useState(false)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			first_name: '',
			last_name: '',
			phone: '',
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			createUser(values)
				.then((res) => {
					if (res.request.statusText === 'Created') {
						formik.setValues({ values: '' })
						navigate('/login')
					}
				})
				.catch((err) => {
					if (
						err.response.data.error ===
						'A client with this email address already exists!'
					) {
						setIsExist(true)
					}
				})
		},
	})

	return (
		<section className='login-page'>
			<div className='contact-wrapper'>
				<header className='login-cta'>
					<h2>Sign in!</h2>
				</header>
				<form onSubmit={formik.handleSubmit}>
					<div className='form-row'>
						<input
							onChange={formik.handleChange}
							value={formik.values.first_name}
							name='first_name'
							type='text'
							required
						/>
						<span>First Name</span>
					</div>
					{formik.errors.first_name ? (
						<div className='error__field'>{formik.errors.first_name}</div>
					) : null}
					<div className='form-row'>
						<input
							onChange={formik.handleChange}
							value={formik.values.last_name}
							name='last_name'
							type='text'
							required
						/>
						<span>Last Name</span>
					</div>
					{formik.errors.last_name ? (
						<div className='error__field'>{formik.errors.last_name}</div>
					) : null}
					<div className='form-row'>
						<input
							onChange={formik.handleChange}
							value={formik.values.email}
							name='email'
							type='email'
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
							autoComplete={'password'}
							value={formik.values.password}
							name='password'
							type='password'
							required
						/>
						<span>Password</span>
					</div>
					{formik.errors.password ? (
						<div className='error__field'>{formik.errors.password}</div>
					) : null}
					<div className='form-row'>
						<input
							onChange={formik.handleChange}
							value={formik.values.phone}
							name='phone'
							type='text'
							required
						/>
						<span>Number</span>
					</div>
					{formik.errors.password ? (
						<div className='error__field'>{formik.errors.password}</div>
					) : null}
					<div className='form-row' />
					<div className='form-row'>
						<button type='submit'>Sign in!</button>
					</div>
				</form>
				<div className='socials-wrapper'>
					<header>
						<h2>Sign in with your Social Account</h2>
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
					Have an account? <Link to='/login'>Sign in!</Link>
				</div>
				{isExist && (
					<Modal
						setState={setIsExist}
						text='With this email, user already exists!'
					/>
				)}
			</div>
			<div className='mobile__category'>
				<Categories />
			</div>
		</section>
	)
}

export default LoginPage
