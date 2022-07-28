import React, { useContext } from 'react'
import './Aside.css'
import itemNotFound from '../../Assets/Images/itemnofound.jpg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import AuthenticationContext from '../../Context/AuthenticationContext'

import { useDispatch, useSelector } from 'react-redux'
import {
	removeFromCart,
	increaseCartItemQuantity,
	decreaseCartItemQuantity,
	cartHandler,
} from '../../redux/features/cartSlice'
import {
	favouritesHandler,
	removeFromFavourites,
} from '../../redux/features/favouriteSlice'
import { IoClose, IoAdd, IoRemove } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'

const Aside = ({
	title,
	showCart,
	type,
	cartItems,
	showFavourites,
	favourites,
}) => {
	const cart = useSelector((state) => state.cartReducer)
	const favourite = useSelector((state) => state.favouriteReducer)
	const dispatch = useDispatch()

	const navigate = useNavigate()

	const { authenticated } = useContext(AuthenticationContext)

	function handlerOrder() {
		dispatch(cartHandler(false))
		if (authenticated) {
			navigate('/order')
		} else {
			navigate('/login')
		}
	}

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	const handleIncreaseItem = (item) => {
		dispatch(increaseCartItemQuantity(item))
	}

	const handleDecreaseItem = (item) => {
		dispatch(decreaseCartItemQuantity(item))
	}

	const handleDeleteItem = (item) => {
		dispatch(removeFromCart(item))
	}

	const handleDeleteFavItem = (item) => {
		dispatch(removeFromFavourites(item))
	}

	return (
		<>
			{showCart && (
				<>
					<div className={showCart ? 'aside active' : 'aside'}>
						<div className='aside__header'>
							<h4>{title}</h4>
							<IoClose
								onClick={() => dispatch(cartHandler())}
								style={{ fontSize: '24px' }}
							/>
						</div>
						<div className='aside__content'>
							{typeof cartItems == 'undefined' ? (
								<>
									<img
										width={'100%'}
										src={itemNotFound}
										alt='Dastyor Express'
									/>
									<p
										style={{
											textTransform: 'uppercase',
											fontSize: '20px',
											textAlign: 'center',
										}}
									>
										Нет результатов!
									</p>
								</>
							) : cartItems.length === 0 ? (
								<>
									<img
										width={'100%'}
										src={itemNotFound}
										alt='Dastyor Express'
									/>
									<p
										style={{
											textTransform: 'uppercase',
											fontSize: '20px',
											textAlign: 'center',
										}}
									>
										Нет результатов!
									</p>
								</>
							) : (
								cart.cartItems?.map((item) => (
									<React.Fragment key={item.id}>
										<div className='aside__card'>
											<img src={item.photo} alt={item.title} />
											<div className='aside__detail'>
												<Link
													to={`/category/${item.category.slug}/${item.slug}`}
												>
													{item.title}
												</Link>
												<div>
													{type === 'liked' ? null : (
														<div className='aside__add'>
															<span>
																<IoRemove
																	onClick={() => handleDecreaseItem(item)}
																/>
															</span>
															<span>{item.count}</span>
															<span>
																<IoAdd
																	onClick={() => handleIncreaseItem(item)}
																/>
															</span>
														</div>
													)}
													<span className='aside__price'>
														{numberWithCommas(item.price * item.count)}
													</span>
													<button onClick={() => handleDeleteItem(item)}>
														<RiDeleteBinLine style={{ fontSize: '20px' }} />
													</button>
												</div>
											</div>
										</div>
										<hr />
									</React.Fragment>
								))
							)}
						</div>

						{type === 'liked' ? null : (
							<button
								className='aside__button'
								disabled={cartItems.length === 0}
								onClick={handlerOrder}
							>
								Оформить
							</button>
						)}
					</div>
					<div
						className='aside__overlay'
						onClick={() => dispatch(cartHandler())}
					/>
				</>
			)}
			{showFavourites && (
				<>
					<div className={showFavourites ? 'aside active' : 'aside'}>
						<div className='aside__header'>
							<h4>{title}</h4>
							<IoClose
								onClick={() => dispatch(favouritesHandler())}
								style={{ fontSize: '24px' }}
							/>
						</div>
						<div className='aside__content'>
							{typeof favourites == 'undefined' ? (
								<>
									<img
										width={'100%'}
										src={itemNotFound}
										alt='Dastyor Express'
									/>
									<p
										style={{
											textTransform: 'uppercase',
											fontSize: '20px',
											textAlign: 'center',
										}}
									>
										Нет результатов!
									</p>
								</>
							) : favourites.length === 0 ? (
								<>
									<img
										width={'100%'}
										src={itemNotFound}
										alt='Dastyor Express'
									/>
									<p
										style={{
											textTransform: 'uppercase',
											fontSize: '20px',
											textAlign: 'center',
										}}
									>
										Нет результатов!
									</p>
								</>
							) : (
								favourite.favourites?.map((item) => (
									<React.Fragment key={item.id}>
										<div className='aside__card'>
											<img src={item.photo} alt={item.title} />
											<div className='aside__detail'>
												<Link
													to={`/category/${item.category.slug}/${item.slug}`}
												>
													{item.title}
												</Link>
												<div>
													<span className='aside__price'>
														{numberWithCommas(item.price * item.count)}
													</span>
													<button onClick={() => handleDeleteFavItem(item)}>
														<RiDeleteBinLine style={{ fontSize: '20px' }} />
													</button>
												</div>
											</div>
										</div>
										<hr />
									</React.Fragment>
								))
							)}
						</div>
					</div>
					<div
						className='aside__overlay'
						onClick={() => dispatch(favouritesHandler())}
					/>
				</>
			)}
		</>
	)
}

export default Aside
