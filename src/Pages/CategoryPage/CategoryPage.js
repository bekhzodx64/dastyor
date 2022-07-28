import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../Components/Spinner'
import './Category.css'

import { useGetCategoriesQuery } from '../../redux/api/apiSlice'
import { RiImageFill } from 'react-icons/ri'

const CategoryPage = () => {
	const { data: categories, isLoading: categoryIsLoading } =
		useGetCategoriesQuery([])

	if (categoryIsLoading) {
		return <Spinner />
	}

	return (
		<section className='category-page'>
			<div className='container'>
				<div className='row gy-4'>
					<div className='col-md-12'>
						<h2 className='title'>Все категории</h2>
					</div>
					{categories.map((item) => (
						<div className='col-lg-2 col-md-3 col-sm-4 col-6' key={item.id}>
							<Link to={item.slug} className='category__card'>
								<div className='category__img'>
									{item.icon ? (
										<img src={item.icon} alt={item.title} />
									) : (
										<RiImageFill style={{ fontSize: '34px', color: 'gray' }} />
									)}
								</div>
								<h4>{item.title}</h4>
							</Link>
						</div>
					))}
				</div>
			</div>
			<div className='mobile__category'>{/* <Categories /> */}</div>
		</section>
	)
}

export default CategoryPage
