import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import default__img from '../../Assets/Images/default__img.png'
import AuthenticationContext from '../../Context/AuthenticationContext'

import { useSelector, useDispatch } from 'react-redux'
import {
	addToCart,
	increaseCartItemQuantity,
	decreaseCartItemQuantity,
} from '../../redux/features/cartSlice'
import { IoAdd, IoRemove } from 'react-icons/io5'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { BiShare } from 'react-icons/bi'

const DetailInfo = ({ data, starRated, comments, setModal }) => {
	const { authenticated } = useContext(AuthenticationContext)
	const [selectedColor, setSelectedColor] = useState(null)

	const dispatch = useDispatch()
	const [button, setButton] = useState(false)
	const cartItems = useSelector((state) => state.cart.cartItems)

	useEffect(() => {
		const cartItemIndex = cartItems.find((item) => item.id === data.id)
		setButton(cartItemIndex)
	}, [cartItems])

	const handleAddToCart = () => {
		dispatch(addToCart(data))
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
		<React.Fragment>
			<h4 className='detail-page__title'>{data.title}</h4>
			<div className='detail-page__rated'>
				<div>
					{starRated.map((item, index) => (
						<i
							className={
								index < data.rating
									? 'detail-page__star active'
									: 'detail-page__star'
							}
							key={index}
						>
							{item}
						</i>
					))}
				</div>
				<div>{comments.count} отзывов</div>
				{authenticated ? (
					<div onClick={() => setModal(true)}>Оставить отзыв</div>
				) : (
					<div>
						<Link to='/login'>Войдите, чтобы оставить отзыв!</Link>
					</div>
				)}
			</div>
			<div className='detail-page__price'>
				{data.discount == null ? (
					<span className='curr_price'>
						Цена: {numberWithCommas(`${data.price}`)} UZS
					</span>
				) : (
					<>
						<span>Цена: {numberWithCommas(`${data.dicounted_price}`)} UZS</span>
						<span>{numberWithCommas(`${data.price}`)}</span>
						<span>{data.discount}% скидка</span>
					</>
				)}
			</div>
			<div className='detail-page__exists'>
				{data.color.length === 0 ? null : (
					<>
						<h5>Доступные цвета:</h5>
						<div>
							{data.color.map((item, index) => (
								<span
									className={selectedColor === index ? 'active' : ''}
									key={item.id}
									onClick={() => setSelectedColor(index)}
									style={{ backgroundColor: item.hex_code }}
								/>
							))}
						</div>
					</>
				)}
			</div>
			<div className='detail-page__buttons'>
				<div className='detail-page__addmore'>
					<span onClick={() => handleDecreaseItem(data)}>
						<IoRemove style={{ color: '#FF3C20' }} />
					</span>
					<span>0</span>
					<span onClick={() => handleIncreaseItem(data)}>
						<IoAdd style={{ color: '#FF3C20' }} />
					</span>
				</div>

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
						{data.social_media_links.map((item) => (
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
					src={data.seller.photo ? data.seller.photo : default__img}
					alt='Dastyor Express'
				/>
				<div className='seller__info'>
					<h5>{data.seller.shop_name}</h5>
					<div>
						<span>
							{starRated.map((item, index) => (
								<i
									className={data.seller.average_rating > index ? 'active' : ''}
									key={index}
								>
									{item}
								</i>
							))}
						</span>
						<Link to={`/seller/${data.seller.unique_id}`}>
							Все продукты автора
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default DetailInfo
