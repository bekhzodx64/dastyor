import React from 'react'
import { Link } from 'react-router-dom'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/modules/pagination/pagination.min.css'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import Categories from '../../Components/Categories'
import Spinner from '../../Components/Spinner'
import './HomePage.css'
import HomePageContent from './HomePageContent'

import {
	useGetBannersQuery,
	useGetLatestProductsQuery,
	useGetTopSellerProductsQuery,
	useGetMostCommonProductsQuery,
} from '../../redux/api/apiSlice'

const pagination = {
	clickable: true,
}

SwiperCore.use([Pagination])

const HomePage = () => {
	const { data: banners, isLoading: bannersIsLoading } = useGetBannersQuery([])
	const { data: latest, isLoading: latestIsLoading } =
		useGetLatestProductsQuery([])
	const { data: topSeller, isLoading: topSellerIsLoading } =
		useGetTopSellerProductsQuery([])
	const { data: mostCommon, isLoading: mostCommonIsLoading } =
		useGetMostCommonProductsQuery([])

	return (
		<section className='home-page'>
			<div className='container'>
				<div className='home__banner'>
					<div className='row'>
						<div className='col-lg-3'>
							<Categories />
						</div>
						<div className='col-lg-9 col-md-12'>
							<Swiper pagination={pagination} loop={true} autoplay={true}>
								{bannersIsLoading ? (
									<Spinner />
								) : (
									banners.map(({ photo }, index) => (
										<SwiperSlide key={`${photo}_${index}`}>
											<div
												className='home__carousel'
												style={{ backgroundImage: `url(${photo})` }}
											>
												<Link to='/'>Купить</Link>
											</div>
										</SwiperSlide>
									))
								)}
							</Swiper>
						</div>
					</div>
				</div>
				{latestIsLoading ? (
					<Spinner />
				) : (
					<HomePageContent
						title={'Новые товары'}
						number={1}
						products={latest}
					/>
				)}
				{topSellerIsLoading ? (
					<Spinner />
				) : (
					<HomePageContent
						title={'Самые продаваемые товары'}
						number={2}
						products={topSeller}
					/>
				)}
				{mostCommonIsLoading ? (
					<Spinner />
				) : (
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
