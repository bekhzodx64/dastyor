import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import default__img from '../../Assets/Images/default__img.png'

SwiperCore.use([Navigation])

const autoplay = { delay: 2000, disableOnInteraction: false }

const DetailComment = ({ reviews, stars }) => {
	return (
		<div className='detail-page__comment'>
			<Swiper loop={true} autoplay={autoplay}>
				{reviews.length === 0 ? (
					<div>Отзывов ещё нет, будьте первым!</div>
				) : (
					reviews.map((item) => (
						<SwiperSlide key={item.id}>
							<div className='detail-page__comment-wrapper'>
								<div className='detail-page__comment-img'>
									<img
										src={
											item.client.photo != null
												? item.client.photo
												: default__img
										}
										alt='Dastyor Express'
									/>
								</div>
								<div className='detail-page__comment-descr'>
									<h4>
										{item.client.first_name + ' ' + item.client.last_name}
									</h4>
									<p>{item.text}</p>
									<div>
										<span>
											{stars.map((star, index) => (
												<i
													className={
														index < item.rating
															? 'detail-page__star active'
															: 'detail-page__star'
													}
													key={index}
												>
													{star}
												</i>
											))}
										</span>
										<span>May 8, 2020</span>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))
				)}
			</Swiper>
		</div>
	)
}

export default DetailComment
