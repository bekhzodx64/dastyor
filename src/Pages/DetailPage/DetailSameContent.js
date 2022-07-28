import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import Card from '../../Components/Card'

const navigation = {
	prevEl: '.prev-button',
	nextEl: '.next-button',
}

const autoplay = {
	delay: 3000,
}

const breakpoints = {
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

const DetailSameContent = ({ relatedProducts }) => {
	return (
		<div className='row detail-page__same-content gy-4'>
			<div className='col-md-12'>
				<h3 className='title'>Похожие товары</h3>
			</div>
			<Swiper
				slidesPerView={5}
				navigation={navigation}
				spaceBetween={20}
				autoplay={autoplay}
				breakpoints={breakpoints}
			>
				{relatedProducts?.results?.map((item) => (
					<SwiperSlide key={item.id}>
						<Card cardInfo={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default DetailSameContent
