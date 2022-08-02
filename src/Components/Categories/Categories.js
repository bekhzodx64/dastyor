import { Fragment, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Search from '../Search'
import Spinner from '../Spinner'
import './Categories.css'

import { useSelector, useDispatch } from 'react-redux'
import { menuHandler } from '../../redux/features/menuSlice'
import { useGetCategoriesQuery } from '../../redux/api/apiSlice'
import { IoClose } from 'react-icons/io5'
import { RiImageFill } from 'react-icons/ri'
import { HiChevronRight } from 'react-icons/hi'
import { FaPlusCircle } from 'react-icons/fa'

const Categories = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const showMenu = useSelector((state) => state.menuReducer.showMenu)

	const { data: categories, isLoading } = useGetCategoriesQuery([])

	const [term, setTerm] = useState('')

	const setShowMenu = () => {
		dispatch(menuHandler())
	}

	function onSubmit(e) {
		e.preventDefault()
		navigate(`/product/search?q=${term}`)
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<Fragment>
			<div className={showMenu ? 'categories active' : 'categories'}>
				<div className='menu__close'>
					<h4>Menu</h4>
					<IoClose onClick={setShowMenu} style={{ fontSize: '24px' }} />
				</div>
				<div className='mobile__form'>
					<Search setTerm={setTerm} term={term} onSubmit={onSubmit} />
				</div>
				<ul className='categories__first'>
					{categories.map((category, index) => (
						<li key={category.id} onClick={setShowMenu}>
							<NavLink to={`/category/${category.slug}`}>
								<span>
									{category.icon != null ? (
										<img src={category.icon} alt={category.title} />
									) : (
										<RiImageFill style={{ fontSize: '20px' }} />
									)}
								</span>
								<span>{category.title}</span>
								{category.children == null ? null : (
									<span className='chevron__right'>
										<HiChevronRight />
									</span>
								)}
							</NavLink>
							{category.children == null ? null : (
								<ul className='categories__second' key={index}>
									{category.children.map((item) => (
										<li key={item.id}>
											<NavLink to={`/category/${item.slug}`}>
												{item.title}
											</NavLink>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
					<li>
						<NavLink to='/category'>
							<span style={{ opacity: '1' }}>
								<FaPlusCircle style={{ color: '#ff5234' }} />
							</span>
							<span>Всe</span>
						</NavLink>
					</li>
				</ul>
			</div>
			<div className='aside__overlay' onClick={setShowMenu} />
		</Fragment>
	)
}

export default Categories
