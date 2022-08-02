import { Fragment } from 'react'
import itemNotFound from '../../Assets/Images/itemnofound.jpg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import './Aside.css'

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
	cartItems,
	showFavourites,
	favourites,
}) => {
	const cart = useSelector((state) => state.cartReducer)
	const favourite = useSelector((state) => state.favouriteReducer)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const isAuthenticated = useSelector(
		(state) => state.userReducer.isAuthenticated
	)

	function handlerOrder() {
		dispatch(cartHandler())
		if (isAuthenticated) {
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

	const handleCart = () => {
		dispatch(cartHandler())
	}

	const handleFav = () => {
		dispatch(favouritesHandler())
	}

	return (
		<Fragment>
			{showCart && (
				<Fragment>
					<div className={showCart ? 'aside active' : 'aside'}>
						<div className='aside__header'>
							<h4>{title}</h4>
							<IoClose onClick={handleCart} style={{ fontSize: '24px' }} />
						</div>
						<div className='aside__content'>
							{typeof cartItems == 'undefined' ? (
								<Fragment>
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
								</Fragment>
							) : cartItems.length === 0 ? (
								<Fragment>
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
								</Fragment>
							) : (
								cart.cartItems?.map((item) => (
									<Fragment key={item.id}>
										<div className='aside__card'>
											<img src={item.photo} alt={item.title} />
											<div className='aside__detail'>
												<Link
													to={`/category/${item.category.slug}/${item.slug}`}
												>
													{item.title}
												</Link>
												<div>
													<div className='aside__add'>
														<span>
															<IoRemove
																onClick={() => handleDecreaseItem(item)}
															/>
														</span>
														<span>{item.count}</span>
														<span>
															<IoAdd onClick={() => handleIncreaseItem(item)} />
														</span>
													</div>
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
									</Fragment>
								))
							)}
						</div>
						<button
							className='aside__button'
							disabled={cartItems.length === 0}
							onClick={handlerOrder}
						>
							Оформить
						</button>
					</div>
					<div className='aside__overlay' onClick={handleCart} />
				</Fragment>
			)}
			{showFavourites && (
				<Fragment>
					<div className={showFavourites ? 'aside active' : 'aside'}>
						<div className='aside__header'>
							<h4>{title}</h4>
							<IoClose onClick={handleFav} style={{ fontSize: '24px' }} />
						</div>
						<div className='aside__content'>
							{typeof favourites == 'undefined' ? (
								<Fragment>
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
								</Fragment>
							) : favourites.length === 0 ? (
								<Fragment>
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
								</Fragment>
							) : (
								favourite.favourites?.map((item) => (
									<Fragment key={item.id}>
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
									</Fragment>
								))
							)}
						</div>
					</div>
					<div className='aside__overlay' onClick={handleFav} />
				</Fragment>
			)}
		</Fragment>
	)
}

export default Aside
