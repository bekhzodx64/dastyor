import React from 'react'
import { Link } from 'react-router-dom'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/modules/pagination/pagination.min.css'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import Categories from '../../Components/Categories'
import Spinner from '../../Components/Spinner'
import './HomePage.css'
import HomePageContent from './HomePageContent'

import { useGetBannersQuery } from '../../redux/api/bannersApi'
import {
	useGetProductsQuery,
	useGetTopSellerProductsQuery,
	useGetMostCommonProductsQuery,
} from '../../redux/api/productsApi'

SwiperCore.use([Pagination])

const HomePage = () => {
	const { data: products, isLoading } = useGetProductsQuery([])
	const { data: topSeller, isLoading: isLoadingTopSeller } =
		useGetTopSellerProductsQuery([])
	const { data: mostCommon, isLoading: isLoadingMostCommon } =
		useGetMostCommonProductsQuery([])
	const { data: banners } = useGetBannersQuery([])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<section className='home-page'>
			<div className='container'>
				<div className='home__banner'>
					<div className='row'>
						<div className='col-lg-3'>
							<Categories />
						</div>
						<div className='col-lg-9 col-md-12'>
							<Swiper
								pagination={{
									clickable: true,
								}}
								loop={true}
								autoplay={true}
							>
								{banners.map(({ photo }, index) => (
									<SwiperSlide key={`${photo}_${index}`}>
										<div
											className='home__carousel'
											style={{ backgroundImage: `url(${photo})` }}
										>
											<Link to='/'>Купить</Link>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
				<HomePageContent
					title={'Новые товары'}
					number={1}
					products={products}
				/>
				{!isLoadingTopSeller && (
					<HomePageContent
						title={'Самые продаваемые товары'}
						number={2}
						products={topSeller}
					/>
				)}
				{!isLoadingMostCommon && (
					<HomePageContent
						title={'Рекомендуемые'}
						number={3}
						products={mostCommon}
					/>
				)}
			</div>
		</section>
	)
}

export default HomePage
