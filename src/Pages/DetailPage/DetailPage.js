import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router'
import 'swiper/modules/autoplay/autoplay.min.css'
import {
	getProduct,
	getProductCharac,
	getProductReview,
	postComment,
} from '../../Repository/ProductsApi'
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

const DetailPage = () => {
	const starRated = new Array(5).fill(
		<svg
			width='13'
			height='12'
			viewBox='0 0 13 12'
			fill='#C1C8CE'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M13.0001 4.67348L9.27319 7.46447L10.3674 12.0001L6.74598 9.26063L2.89136 11.8549L4.37986 7.3697L0.904053 4.4384L5.44515 4.40603L7.15143 6.10352e-05L8.46894 4.46476L13.0001 4.67348Z' />
		</svg>,
		0,
		5
	)
	const [data, setData] = useState([])
	const [characteristic, setCharacteristic] = useState([])
	const [loading, setLoading] = useState(true)
	const [comments, setComments] = useState([])
	const [modal, setModal] = useState(false)

	const { url, main_url } = useParams()
	const [currTab, setCurrTab] = useState('about')

	useEffect(() => {
		getProduct(main_url)
			.then((res) => {
				setData(res.data)
				setLoading(false)
			})
			.catch((err) => console.log(err))
		getProductCharac(main_url)
			.then((res) => setCharacteristic(res.data))
			.catch((err) => console.log(err))
		window.scrollTo(null, 0)
	}, [main_url])

	useEffect(() => {
		if (data.id) {
			getProductReview(data.id)
				.then((res) => setComments(res.data))
				.catch((err) => console.log(err))
		}
	}, [data.id])

	const content = useMemo(() => {
		switch (currTab) {
			case 'about':
				return <DetailDescription description={data.descriptions} />
			case 'characteristics':
				return <DetailCharacteristics characteristic={characteristic} />
			case 'comments':
				return <DetailComment comments={comments.results} />
			default:
				return <DetailDescription />
		}
	}, [currTab, comments, characteristic, data.descriptions])

	if (loading) {
		return <Spinner />
	}

	return (
		<section className='detail-page'>
			<div className='container'>
				<DetailNavigation main_url={main_url} url={url} data={data} />

				<div className='row gy-4'>
					<div className='col-lg-6 col-12'>
						<DetailCarousel data={data} />
					</div>
					<div className='col-lg-6 col-12'>
						<DetailInfo
							comments={comments}
							data={data}
							setModal={setModal}
							starRated={starRated}
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
								className={currTab === 'comments' ? 'active' : ''}
								data-value='comments'
							>
								Отзывы
							</li>
						</ul>
						<hr />
					</div>
					{content}
				</div>

				<DetailSameContent main_url={main_url} />

				<DetailModal
					setModal={setModal}
					starRated={starRated}
					modal={modal}
					data={data}
				/>
			</div>

			<div className={'mobile__category'}>
				<Categories />
			</div>
		</section>
	)
}

export default DetailPage
