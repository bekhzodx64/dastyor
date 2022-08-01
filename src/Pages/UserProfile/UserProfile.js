import React, { useContext, useState, useEffect } from 'react'
import UserMenu from '../../Components/UserMenu'
import './UserProfile.css'
import { changeUserInfo, getUserInfo } from '../../Repository/UserApi'
import UserInfoContext from '../../Context/UserInfoContext'
import default_img from '../../Assets/Images/default__img.png'

const UserProfile = () => {
	const [modal, setModal] = useState(false)
	const { userInfo, setUserInfo } = useContext(UserInfoContext)
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

	return (
		<UserMenu>
			<div className='user-profile'>
				<div className='user-profile__img'>
					<img
						src={userInfo.photo != null ? userInfo.photo : default_img}
						alt='Dastyor Express'
					/>
					<h3>{userInfo.first_name + ' ' + userInfo.last_name}</h3>
					<svg
						onClick={() => setModal(true)}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z' />
						<path d='M16.757 3l-2 2H5v14h14V9.243l2-2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z' />
					</svg>
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
						<svg
							onClick={() => setModal(false)}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							width='24'
							height='24'
						>
							<path fill='none' d='M0 0h24v24H0z' />
							<path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
						</svg>
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
