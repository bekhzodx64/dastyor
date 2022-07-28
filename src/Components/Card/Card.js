import React, { useContext, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import TranslationContext from '../../Context/TranslationContext'
import './Card.css'

import { AiOutlineZoomIn } from 'react-icons/ai'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/features/cartSlice'
import { addToFavorites } from '../../redux/features/favouriteSlice'

const Card = ({ cardInfo }) => {
	const dispatch = useDispatch()

	const [button, setButton] = useState(false)
	const [icon, setIcon] = useState(false)

	const cartItems = useSelector((state) => state.cartReducer.cartItems)
	const favouriteItems = useSelector(
		(state) => state.favouriteReducer.favourites
	)

	const handleAddToCart = () => {
		dispatch(addToCart(cardInfo))
	}
	const handleAddToFavourites = () => {
		dispatch(addToFavorites(cardInfo))
	}

	const { translation } = useContext(TranslationContext)

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	useEffect(() => {
		const cartItemIndex = cartItems.find((item) => item.id === cardInfo.id)
		const favouriteItemIndex = favouriteItems.find(
			(item) => item.id === cardInfo.id
		)

		setButton(cartItemIndex)
		setIcon(favouriteItemIndex)
	}, [cartItems, favouriteItems])

	return (
		<div className='card'>
			<div className='card__img'>
				<LazyLoadImage
					src={cardInfo.photo}
					alt={cardInfo.title}
					effect='blur'
				/>
				{cardInfo.discount != null ? (
					<span className='card__dispercent'>{cardInfo.discount}%</span>
				) : null}
				<Link
					to={`/category/${cardInfo.category.slug}/${cardInfo.slug}`}
					className='card__overlay'
				>
					<AiOutlineZoomIn style={{ fontSize: '60px', color: '#fff' }} />
				</Link>
			</div>
			<div className='card__wrapper'>
				<h4 className='card__title'>
					{typeof cardInfo.title === 'undefined'
						? 'Dastyor Express'
						: cardInfo.title}
				</h4>
				<Link
					to={`/category/${cardInfo.category.slug}`}
					className='card__category'
				>
					{cardInfo.category.title}
				</Link>

				<div className='card__price'>
					{cardInfo.discount != null ? (
						<div>
							<span className='card__discount'>
								{numberWithCommas(cardInfo.price)}
							</span>{' '}
							/
							<span className='card__discountprice'>
								{numberWithCommas(cardInfo.discounted_price)} UZS
							</span>
						</div>
					) : (
						<span className='card__discount'>
							{numberWithCommas(cardInfo.price)} UZS
						</span>
					)}
					<span onClick={handleAddToFavourites} className='card__like'>
						{!icon ? <BsHeart /> : <BsHeartFill />}
					</span>
				</div>

				<div className='card__add'>
					<button
						onClick={handleAddToCart}
						className={button ? 'active' : null}
					>
						<MdOutlineShoppingCart />
						{!button ? (
							<span>{translation['addToCart']}</span>
						) : (
							<span>{translation['added']}</span>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Card
