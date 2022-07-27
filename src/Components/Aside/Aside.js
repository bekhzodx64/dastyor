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
							<svg
								onClick={() => dispatch(cartHandler(false))}
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
							>
								<path fill='none' d='M0 0h24v24H0z' />
								<path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414                       4.95-4.95-4.95-4.95L7.05 5.636z' />
							</svg>
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
															<span onClick={() => handleDecreaseItem(item)}>
																<svg
																	width='10'
																	height='2'
																	viewBox='0 0 10 2'
																	fill='none'
																	xmlns='http://www.w3.org/2000/svg'
																>
																	<path
																		d='M9.5 1H0.5'
																		stroke='#121212'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																</svg>
															</span>
															<span>{item.count}</span>
															<span onClick={() => handleIncreaseItem(item)}>
																<svg
																	width='10'
																	height='10'
																	viewBox='0 0 10 10'
																	fill='none'
																	xmlns='http://www.w3.org/2000/svg'
																>
																	<path
																		d='M5 5H0.5M5 0.5V5V0.5ZM5 5V9.5V5ZM5 5H9.5H5Z'
																		stroke='#121212'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																	/>
																</svg>
															</span>
														</div>
													)}
													<span className='aside__price'>
														{numberWithCommas(item.price * item.count)}
													</span>
													<button
														onClick={() => handleDeleteItem(item)}
														// onClick={() =>
														// 	type === 'liked'
														// 		? removeFromFavorite(item.id)
														// 		: deleteItem(item.id)
														// }
													>
														<svg
															width='24'
															stroke='#121212'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															<g>
																<path
																	d='M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM10 11V17V11ZM14 11V17V11ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z'
																	strokeLinecap='round'
																	strokeLinejoin='round'
																/>
															</g>
														</svg>
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
						onClick={() => dispatch(cartHandler(false))}
					/>
				</>
			)}
			{showFavourites && (
				<>
					<div className={showFavourites ? 'aside active' : 'aside'}>
						<div className='aside__header'>
							<h4>{title}</h4>
							<svg
								onClick={() => dispatch(favouritesHandler(false))}
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								width='24'
								height='24'
							>
								<path fill='none' d='M0 0h24v24H0z' />
								<path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414                       4.95-4.95-4.95-4.95L7.05 5.636z' />
							</svg>
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
													<button
														onClick={() => handleDeleteFavItem(item)}
														// onClick={() =>
														// 	type === 'liked'
														// 		? removeFromFavorite(item.id)
														// 		: deleteItem(item.id)
														// }
													>
														<svg
															width='24'
															stroke='#121212'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															<g>
																<path
																	d='M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM10 11V17V11ZM14 11V17V11ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z'
																	strokeLinecap='round'
																	strokeLinejoin='round'
																/>
															</g>
														</svg>
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
						onClick={() => dispatch(favouritesHandler(false))}
					/>
				</>
			)}
		</>
	)
}

export default Aside
