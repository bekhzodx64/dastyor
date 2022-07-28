import React, { useMemo, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, { Autoplay, Navigation, Thumbs } from 'swiper'

import { useSelector, useDispatch } from 'react-redux'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { addToFavorites } from '../../redux/features/favouriteSlice'

const navigation = {
	nextEl: '.swiper-button-next1',
	prevEl: '.swiper-button-prev1',
}

SwiperCore.use([Thumbs, Autoplay, Navigation])

const DetailCarousel = ({ product }) => {
	const dispatch = useDispatch()

	const [icon, setIcon] = useState(false)
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	const favouriteItems = useSelector(
		(state) => state.favouriteReducer.favourites
	)

	const handleAddToFavourites = () => {
		dispatch(addToFavorites(product))
	}

	useEffect(() => {
		const favouriteItemIndex = favouriteItems.find(
			(item) => item.id === product.id
		)
		setIcon(favouriteItemIndex)
	}, [favouriteItems, product.id])

	const photos = useMemo(
		() => [{ id: 15556465, photo: product.photo }, ...product.photos],
		[product.photo, product.photos]
	)

	return (
		<div className='detail-page__parent'>
			<Swiper
				onSwiper={setThumbsSwiper}
				navigation={navigation}
				spaceBetween={10}
				slidesPerView={4}
				direction={'vertical'}
				watchSlidesProgress={false}
				className='detail-page__swiper1'
			>
				{photos.map((item, index) => (
					<SwiperSlide key={index}>
						<div className='detail-page__thumbs'>
							<img src={item.photo} alt={product.title} />
						</div>
					</SwiperSlide>
				))}
				<div className={'swiper-button-next1'}>
					<svg
						width='32'
						height='32'
						viewBox='0 0 32 32'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M9.88 11.4534L16 17.56L22.12 11.4534L24 13.3334L16 21.3334L8 13.3334L9.88 11.4534Z'
							fill='#1C1E23'
						/>
					</svg>
				</div>
				<div className={'swiper-button-prev1'}>
					<svg
						width='32'
						height='32'
						viewBox='0 0 32 32'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M9.88 11.4534L16 17.56L22.12 11.4534L24 13.3334L16 21.3334L8 13.3334L9.88 11.4534Z'
							fill='#1C1E23'
						/>
					</svg>
				</div>
			</Swiper>
			<Swiper
				loop={true}
				thumbs={{ swiper: thumbsSwiper }}
				className='swiper2'
				navigation={{
					nextEl: '.swiper-button-next2',
					prevEl: '.swiper-button-prev2',
				}}
			>
				<span className='card__like' onClick={handleAddToFavourites}>
					{!icon ? <BsHeart /> : <BsHeartFill />}
				</span>
				{photos.map((item, index) => (
					<SwiperSlide key={index}>
						<div className='detail-page__carousel'>
							{product.discount != null ? (
								<span className='card__dispercent'>{product.discount}%</span>
							) : null}
							<img src={item.photo} alt={product.title} />
						</div>
					</SwiperSlide>
				))}
				<div className='swiper-button-prev2'>
					<svg
						width='32'
						height='32'
						viewBox='0 0 32 32'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M11.4534 22.12L17.56 16L11.4534 9.88L13.3334 8L21.3334 16L13.3334 24L11.4534 22.12Z'
							fill='#1C1E23'
						/>
					</svg>
				</div>
				<div className='swiper-button-next2'>
					<svg
						width='32'
						height='32'
						viewBox='0 0 32 32'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M11.4534 22.12L17.56 16L11.4534 9.88L13.3334 8L21.3334 16L13.3334 24L11.4534 22.12Z'
							fill='#1C1E23'
						/>
					</svg>
				</div>
			</Swiper>
		</div>
	)
}

export default DetailCarousel
