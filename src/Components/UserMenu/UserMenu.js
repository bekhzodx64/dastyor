import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserInfoContext from '../../Context/UserInfoContext'
import Categories from '../Categories'
import default_img from '../../Assets/Images/default__img.png'
import './UserMenu.css'

import { useDispatch } from 'react-redux'
import { logOutHandler } from '../../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { IoIosLogOut } from 'react-icons/io'
import { BsCart3 } from 'react-icons/bs'

const UserMenu = ({ children }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const logOut = () => {
		dispatch(logOutHandler())
		navigate('/')
	}

	const { userInfo } = useContext(UserInfoContext)

	return (
		<section className='user-menu'>
			<div className='container'>
				<div className='row gy-4'>
					<div className='col-lg-3 col-md-4 col-12'>
						<div
							style={{
								border: '1px solid #e8e8e8',
								padding: '10px 5px',
								backgroundColor: 'white',
							}}
						>
							<div className='user__info'>
								<img
									src={userInfo.photo != null ? userInfo.photo : default_img}
									alt='Dastyor Express'
								/>
								<h3>undefiend</h3>
							</div>
							<Link className='user__link' to={'/user/bookings'}>
								<BsCart3 />
								My bookings
							</Link>
							<Link className='user__link' to={'/user/profile'}>
								<AiOutlineUser />
								My profile
							</Link>
							<span className='user__link' onClick={logOut}>
								<IoIosLogOut />
								Log out
							</span>
						</div>
					</div>
					<div className='col-lg-9 col-md-8 col-12'>{children}</div>
				</div>
			</div>
			<div className='mobile__category'>
				<Categories />
			</div>
		</section>
	)
}

export default UserMenu
