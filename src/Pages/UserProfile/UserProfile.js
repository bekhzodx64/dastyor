import React, { useContext, useEffect, useState } from 'react'
import default_img from '../../Assets/Images/default__img.png'
import UserMenu from '../../Components/UserMenu'
import UserInfoContext from '../../Context/UserInfoContext'
import { changeUserInfo, getUserInfo } from '../../Repository/UserApi'
import './UserProfile.css'

import jwt_decode from 'jwt-decode'
import { FiEdit } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../Components/Spinner'
import { useGetUserInfoQuery } from '../../redux/api/apiSlice'
import {
	saveFirstName,
	saveLastName,
	savePhoto,
} from '../../redux/features/userSlice'
import { IoClose } from 'react-icons/io5'

const UserProfile = () => {
	const dispatch = useDispatch()
	const [modal, setModal] = useState(false)
	const { userInfo, setUserInfo } = useContext(UserInfoContext)

	const { token, first_name, last_name, photo } = useSelector(
		(state) => state.userReducer
	)
	const { user_id } = jwt_decode(token)
	const id = user_id - 1
	const { data: user, isLoading, isSuccess } = useGetUserInfoQuery(id)

	const [initialValues, setInitialValues] = useState({
		id: null,
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		photo: null,
	})

	useEffect(() => {
		setInitialValues(userInfo)
	}, [userInfo])

	function onChangeInp(e) {
		setInitialValues((state) => {
			return {
				...state,
				[e.target.name]: e.target.value,
			}
		})
	}

	function _onSubmit(e) {
		e.preventDefault()
		const formData = new FormData()
		formData.append('first_name', initialValues.first_name)
		formData.append('last_name', initialValues.last_name)
		formData.append('phone', initialValues.phone)
		formData.append('email', initialValues.email)
		formData.append('photo', initialValues.photo)
		changeUserInfo(37 - 1, formData)
			.then(() => {
				getUserInfo(userInfo.id)
					.then((res) => setUserInfo(res.data))
					.catch((err) => console.log(err))
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		if (isSuccess) {
			dispatch(saveFirstName(user.first_name))
			dispatch(saveLastName(user.last_name))
			dispatch(savePhoto(user.photo))
		}
	}, [dispatch, user, isSuccess])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<UserMenu first_name={first_name}>
			<div className='user-profile'>
				<div className='user-profile__img'>
					<img
						src={photo != null ? photo : default_img}
						alt={`${first_name}_${last_name}`}
					/>
					<h3>{`${first_name} ${last_name}`}</h3>
					<FiEdit onClick={() => setModal(true)} style={{ fontSize: '24px' }} />
				</div>
				<div className='user-profile__info'>
					<div>
						<h4>Контакты</h4>
						<span>{userInfo.phone}</span>
					</div>
					<div>
						<h4>E-mail</h4>
						<span>{userInfo.email}</span>
					</div>
				</div>
				<div className={modal ? 'profile__change active' : 'profile__change'}>
					<form className='profile__form' onSubmit={_onSubmit}>
						<IoClose onClick={() => setModal(false)} />

						<div className='profile__img'>
							<img
								src={
									typeof initialValues.photo != 'string' &&
									initialValues.photo != null &&
									typeof initialValues.photo != 'undefined'
										? URL.createObjectURL(initialValues.photo)
										: initialValues.photo
								}
								alt='Dastyor Express'
							/>
							<label htmlFor='change'>
								Change image
								<input
									id='change'
									type='file'
									onChange={(e) => {
										setInitialValues((state) => {
											return {
												...state,
												photo: e.target.files[0],
											}
										})
									}}
									required={true}
									multiple={false}
									hidden={true}
								/>
							</label>
						</div>
						<div className='profile__inputs'>
							<input
								onChange={onChangeInp}
								value={initialValues.first_name}
								type='text'
								name='first_name'
								placeholder='Your name'
								required
							/>
							<input
								onChange={onChangeInp}
								value={initialValues.last_name}
								type='text'
								name='last_name'
								placeholder='Your last name'
								required
							/>
							<input
								onChange={onChangeInp}
								value={initialValues.phone}
								type='phone'
								name='phone'
								placeholder='Your phone'
								required
							/>
							<input
								onChange={onChangeInp}
								value={initialValues.email}
								type='email'
								name='email'
								placeholder='Your email'
								required
							/>
						</div>
						<button type='submit'>Save</button>
					</form>
				</div>
			</div>
		</UserMenu>
	)
}

export default UserProfile
