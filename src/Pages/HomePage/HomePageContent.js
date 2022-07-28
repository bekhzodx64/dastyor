import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import SwiperCore, { Navigation, Autoplay } from 'swiper'
import Card from '../../Components/Card'
import 'swiper/modules/autoplay/autoplay.min.css'

SwiperCore.use([Navigation, Autoplay])

const brakePoints = {
	320: {
		slidesPerView: 2,
		spaceBetween: 0,
	},
	768: {
		slidesPerView: 3,
		spaceBetween: 10,
	},
	1024: {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	1400: {
		slidesPerView: 5,
		spaceBetween: 20,
	},
}

const HomePageContent = ({ title, number, products }) => {
	const navigation = {
		prevEl: '.prev-button' + number,
		nextEl: '.next-button' + number,
	}

	const autoplay = { delay: parseInt(`${number + 2}000`) }

	return (
		<div className='home__content'>
			<h2 className='title'>{title}</h2>
			<Swiper
				slidesPerView={5}
				navigation={navigation}
				spaceBetween={20}
				autoplay={autoplay}
				breakpoints={brakePoints}
			>
				{products.results.map((product) => (
					<SwiperSlide key={product.id}>
						<Card cardInfo={product} />
					</SwiperSlide>
				))}
			</Swiper>
			<div className={'prev-button' + number} />
			<div className={'next-button' + number} />
		</div>
	)
}

export default HomePageContent
