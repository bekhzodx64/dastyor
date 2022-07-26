import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import default__img from '../../Assets/Images/default__img.png'

import { useSelector, useDispatch } from 'react-redux'
import {
	addToCart,
	increaseCartItemQuantity,
	decreaseCartItemQuantity,
} from '../../redux/features/cartSlice'
import { IoAdd, IoRemove } from 'react-icons/io5'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { BiShare } from 'react-icons/bi'

const DetailInfo = ({ product, stars, reviews, setModal }) => {
	const isAuthenticated = useSelector(
		(state) => state.userReducer.isAuthenticated
	)

	const [isItemExist, setIsItemExist] = useState(false)

	const [selectedColor, setSelectedColor] = useState(null)
	const [counter, setCounter] = useState(0)

	const dispatch = useDispatch()
	const [button, setButton] = useState(false)
	const cartItems = useSelector((state) => state.cartReducer.cartItems)

	useEffect(() => {
		setIsItemExist(false)

		const cartItemIndex = cartItems.find((item) => item.id === product.id)

		if (cartItemIndex) {
			setCounter(cartItemIndex.count)
			setIsItemExist(true)
		}

		setButton(cartItemIndex)
	}, [cartItems, product.id, counter, isItemExist])

	const handleAddToCart = () => {
		dispatch(addToCart(product))
	}

	const handleIncreaseItem = (data) => {
		dispatch(increaseCartItemQuantity(data))
	}

	const handleDecreaseItem = (data) => {
		dispatch(decreaseCartItemQuantity(data))
	}

	const location = useLocation()

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	return (
		<Fragment>
			<h4 className='detail-page__title'>{product.title}</h4>
			<div className='detail-page__rated'>
				<div>
					{stars.map((item, index) => (
						<i
							className={
								index < product.rating
									? 'detail-page__star active'
									: 'detail-page__star'
							}
							key={index}
						>
							{item}
						</i>
					))}
				</div>
				<div>{reviews.count} отзывов</div>
				{isAuthenticated ? (
					<div onClick={() => setModal(true)}>Оставить отзыв</div>
				) : (
					<div>
						<Link to='/login'>Войдите, чтобы оставить отзыв!</Link>
					</div>
				)}
			</div>
			<div className='detail-page__price'>
				{product.discount == null ? (
					<span className='curr_price'>
						Цена: {numberWithCommas(`${product.price}`)} UZS
					</span>
				) : (
					<Fragment>
						<span>
							Цена: {numberWithCommas(`${product.discounted_price}`)} UZS
						</span>
						<span>{numberWithCommas(`${product.price}`)}</span>
						<span>{product.discount}% скидка</span>
					</Fragment>
				)}
			</div>
			<div className='detail-page__exists'>
				{product.color.length === 0 ? null : (
					<Fragment>
						<h5>Доступные цвета:</h5>
						<div>
							{product.color.map((item, index) => (
								<span
									className={selectedColor === index ? 'active' : ''}
									key={item.id}
									onClick={() => setSelectedColor(index)}
									style={{ backgroundColor: item.hex_code }}
								/>
							))}
						</div>
					</Fragment>
				)}
			</div>
			<div className='detail-page__buttons'>
				<div className='detail-page__addmore'>
					{isItemExist ? (
						<span onClick={() => handleDecreaseItem(product)}>
							<IoRemove style={{ color: '#FF3C20' }} />
						</span>
					) : (
						<span>
							<IoRemove style={{ color: '#FF3C20' }} />
						</span>
					)}
					<span>{counter}</span>
					<span onClick={() => handleIncreaseItem(product)}>
						<IoAdd style={{ color: '#FF3C20' }} />
					</span>
				</div>
				{/* <div className='detail-page__addmore'>
						<span onClick={decrease}>
							<IoRemove style={{ color: '#FF3C20' }} />
						</span>
						<span>{counter}</span>
						<span onClick={increase}>
							<IoAdd style={{ color: '#FF3C20' }} />
						</span>
					</div> */}

				<button onClick={handleAddToCart} className={button ? 'active' : null}>
					<MdOutlineShoppingCart
						style={{ color: '#FF3C20', fontSize: '24px' }}
					/>
					{button ? <span>Добавлено</span> : <span>В корзину</span>}
				</button>

				<button>
					<BiShare style={{ fontSize: '22px', color: '#FF3C20' }} />
					<span>Поделиться</span>
					<div className='detail-page__dropdown'>
						{product.social_media_links.map((item) => (
							<a
								href={item.link + `https://dastyor.com${location.pathname}`}
								key={item.id}
								target='_blank'
								rel='noreferrer'
							>
								<img
									src={'https://dastyor.site.uz' + item.icon}
									alt='Dastyor Express'
								/>
								{item.title}
							</a>
						))}
					</div>
				</button>
			</div>
			<div className='detail-page__seller'>
				<img
					src={product.seller.photo ? product.seller.photo : default__img}
					alt='Dastyor Express'
				/>
				<div className='seller__info'>
					<h5>{product.seller.shop_name}</h5>
					<div>
						<span>
							{stars.map((item, index) => (
								<i
									className={
										product.seller.average_rating > index ? 'active' : ''
									}
									key={index}
								>
									{item}
								</i>
							))}
						</span>
						<Link to={`/seller/${product.seller.unique_id}`}>
							Все продукты автора
						</Link>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default DetailInfo
