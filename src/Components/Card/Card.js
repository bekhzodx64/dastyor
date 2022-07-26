import React, { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import TranslationContext from '../../Context/TranslationContext'
import './Card.css'

import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/features/cartSlice'
import { addToFavorites } from '../../redux/features/favouriteSlice'

import { useState, useEffect } from 'react'

const Card = ({ cardInfo }) => {
	const dispatch = useDispatch()

	const [button, setButton] = useState(false)
	const [icon, setIcon] = useState(false)
	const cartItems = useSelector((state) => state.cart.cartItems)
	const favouriteItems = useSelector((state) => state.favourite.favourites)

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
		<div className='card' key={cardInfo.id}>
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
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='51'
						height='53'
						viewBox='0 0 51 53'
					>
						<g>
							<g>
								<path
									fill='#fff'
									d='M28.942 21.014a1 1 0 0 1-.998 1h-5.989v6.004a1 1 0 0 1-.998 1 1 1 0 0 1-.998-1v-6.004h-5.988a1 1 0 0 1 0-2.001h5.988v-6.004a1 1 0 0 1 .998-1 1 1 0 0 1 .998 1v6.004h5.989a1 1 0 0 1 .998 1zm21.65 31.706a.994.994 0 0 1-1.41-.028l-14.867-15.5a20.83 20.83 0 0 1-13.358 4.835C9.4 42.027-.002 32.6-.002 21.014-.002 9.426 9.4 0 20.958 0c11.557 0 20.959 9.425 20.959 21.013a20.973 20.973 0 0 1-6.127 14.829l14.83 15.462c.382.398.37 1.032-.027 1.415zM20.958 40.025c10.457 0 18.963-8.528 18.963-19.011 0-10.484-8.506-19.012-18.963-19.012-10.456 0-18.963 8.528-18.963 19.012 0 10.483 8.507 19.011 18.963 19.011z'
								/>
							</g>
						</g>
					</svg>
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
