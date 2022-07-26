import React, { useContext, useEffect } from 'react'
import './Category.css'
import CategoriesContext from '../../Context/CategoriesContext'
import { Link } from 'react-router-dom'
import Categories from '../../Components/Categories'
import Spinner from '../../Components/Spinner'

import { useGetCategoriesQuery } from '../../redux/api/categoriesApi'

const CategoryPage = () => {
	// const { categories } = useContext(CategoriesContext);
	const { data: categories, isLoading } = useGetCategoriesQuery([])

	window.scrollTo(null, 0)

	if (isLoading) {
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
									<img src={item.icon} alt={item.title} />
								</div>
								<h4>{item.title}</h4>
							</Link>
						</div>
					))}
				</div>
			</div>
			<div className={'mobile__category'}>{/* <Categories /> */}</div>
		</section>
	)
}

export default CategoryPage
