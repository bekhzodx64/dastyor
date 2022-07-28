import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router'
import 'swiper/modules/autoplay/autoplay.min.css'
import Spinner from '../../Components/Spinner'
import DetailDescription from './DetailDescription'
import DetailCharacteristics from './DetailCharacteristics'
import DetailComment from './DetailComment'
import DetailNavigation from './DetailNavigation'
import DetailCarousel from './DetailCarousel'
import './DetailPage.css'
import Categories from '../../Components/Categories'
import DetailInfo from './DetailInfo'
import DetailSameContent from './DetailSameContent'
import DetailModal from './DetailModal'
import DetailPayMethods from './DetailPayMethods'

import {
	useGetDetailProductQuery,
	useGetDetailProductReviewsQuery,
	useGetDetailProductFeaturesQuery,
	useGetDetailRelatedProductsQuery,
} from '../../redux/api/apiSlice'
import { AiFillStar } from 'react-icons/ai'

const DetailPage = () => {
	const { url, main_url } = useParams()
	const { data: product, isLoading } = useGetDetailProductQuery(main_url)
	const { data: reviews } = useGetDetailProductReviewsQuery(main_url)
	const { data: features } = useGetDetailProductFeaturesQuery(main_url)
	const { data: relatedProducts } = useGetDetailRelatedProductsQuery(main_url)

	const stars = new Array(5).fill(<AiFillStar style={{ color: '#C1C8CE' }} />)

	const [modal, setModal] = useState(false)

	const [currTab, setCurrTab] = useState('about')

	const content = useMemo(() => {
		switch (currTab) {
			case 'about':
				return <DetailDescription descriptions={product?.descriptions} />
			case 'characteristics':
				return <DetailCharacteristics features={features} />
			case 'comments':
				return <DetailComment reviews={reviews?.results} stars={stars} />
			default:
				return <DetailDescription />
		}
	}, [currTab, product, features, stars, reviews?.results])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<section className='detail-page'>
			<div className='container'>
				<DetailNavigation main_url={main_url} url={url} product={product} />

				<div className='row gy-4'>
					<div className='col-lg-6 col-12'>
						<DetailCarousel product={product} />
					</div>
					<div className='col-lg-6 col-12'>
						<DetailInfo
							product={product}
							reviews={reviews}
							stars={stars}
							setModal={setModal}
						/>
					</div>
				</div>

				<DetailPayMethods />

				<div className='detail-page__detail'>
					<div className='detail-page__tab'>
						<ul>
							<li
								onClick={(e) => {
									setCurrTab(e.target.getAttribute('data-value'))
								}}
								data-value='about'
								className={currTab === 'about' ? 'active' : ''}
							>
								О товаре
							</li>
							<li
								onClick={(e) => {
									setCurrTab(e.target.getAttribute('data-value'))
								}}
								data-value='characteristics'
								className={currTab === 'characteristics' ? 'active' : ''}
							>
								Характеристики
							</li>
							<li
								onClick={(e) => {
									setCurrTab(e.target.getAttribute('data-value'))
								}}
								data-value='comments'
								className={currTab === 'comments' ? 'active' : ''}
							>
								Отзывы
							</li>
						</ul>
						<hr />
					</div>
					{content}
				</div>

				<DetailSameContent relatedProducts={relatedProducts} />

				<DetailModal
					setModal={setModal}
					stars={stars}
					modal={modal}
					product={product}
				/>
			</div>

			<div className='mobile__category'>
				<Categories />
			</div>
		</section>
	)
}

export default DetailPage
