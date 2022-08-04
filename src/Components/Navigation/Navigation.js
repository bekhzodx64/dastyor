import React, { useState, useContext, useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'

import logo from '../../Assets/Images/logo.png'
import Search from '../Search'
import LocationContext from '../../Context/LocationContext'

import { useDispatch, useSelector } from 'react-redux'
import { cartHandler, getTotals } from '../../redux/features/cartSlice'
import {
	favouritesHandler,
	getFavouritesTotal,
} from '../../redux/features/favouriteSlice'
import { menuHandler } from '../../redux/features/menuSlice'
import { useGetCountriesQuery } from '../../redux/api/apiSlice'
import { setLocation, setLocationCode } from '../../redux/features/userSlice'

import { BsHeart } from 'react-icons/bs'
import { MdOutlineShoppingCart, MdLocationPin } from 'react-icons/md'
import { AiFillCaretDown } from 'react-icons/ai'
import { RiMenu3Fill } from 'react-icons/ri'
import { FaRegUserCircle } from 'react-icons/fa'

const Navigation = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { data: countriesApi, isLoading: countriesIsLoading } =
		useGetCountriesQuery([])

	const isAuthenticated = useSelector(
		(state) => state.userReducer.isAuthenticated
	)
	const { cartTotalCount, cartItems } = useSelector(
		(state) => state.cartReducer
	)
	const { favouritesTotalCount, favourites } = useSelector(
		(state) => state.favouriteReducer
	)

	const [term, setTerm] = useState('')

	const [openCountry, setOpenCountry] = useState(false)

	const [openLanguage, setOpenLanguage] = useState(false)
	const [currLang, setCurrLang] = useState('Русский')
	const { currentLocation, locations, toggleSelectCountry } =
		useContext(LocationContext)
	const [termCountry, setTermCountry] = useState('')
	const lang = localStorage.getItem('lang')
	const countryRef = useRef(null)
	const languages = useMemo(() => {
		return [
			{ lang: 'UZ', label: 'Uzbek' },
			{ lang: 'RU', label: 'Русский' },
			{ lang: 'US', label: 'English' },
		]
	}, [])

	useEffect(() => {
		const selectedLang = languages.filter((item) => item.lang === lang)
		setCurrLang(lang != null ? selectedLang[0].label : 'Русский')
	}, [languages, lang])

	useEffect(() => {
		if (openCountry) {
			executeScroll()
		}
	}, [openCountry])

	useEffect(() => {
		dispatch(getTotals())
		dispatch(getFavouritesTotal())
	}, [cartItems, favourites, dispatch])

	const executeScroll = () =>
		countryRef.current?.scrollIntoView({ block: 'nearest' })

	function onChangeLang(lang, label) {
		localStorage.setItem('lang', `${lang}`)
		setCurrLang(label)
		document.location.reload()
	}

	function onSubmit(e) {
		e.preventDefault()
		navigate(`/product/search?q=${term}`)
	}

	function onSearchCountry(items, term) {
		if (term.length === 0) {
			return items
		}
		return items?.filter(
			(item) => item.title.toLowerCase().indexOf(term.toLowerCase()) > -1
		)
	}

	const countries = onSearchCountry(locations, termCountry)?.map((item) => (
		<span
			key={item.code}
			onClick={(e) => {
				toggleSelectCountry(e.target.getAttribute('data-code'))
				setOpenCountry(false)
				document.location.reload()
			}}
			ref={item.code === currentLocation.code ? countryRef : null}
			data-code={item.code}
			className={item.code === currentLocation.code ? 'active' : ''}
		>
			{item.title}
		</span>
	))

	const handleCart = () => {
		dispatch(cartHandler())
	}

	const handleFav = () => {
		dispatch(favouritesHandler())
	}

	const setShowMenu = () => {
		dispatch(menuHandler())
	}

	useEffect(() => {
		dispatch(setLocationCode(countriesApi?.current?.code))
		dispatch(setLocation(countriesApi?.current?.title))
	}, [countriesIsLoading])

	return (
		<header className='header'>
			<div className='header__top'>
				<div className='container'>
					<div className='header__top-wrapper'>
						<div
							className={
								openCountry ? 'selected_country active' : 'selected_country'
							}
							onMouseEnter={() => setOpenCountry(true)}
							onMouseLeave={() => setOpenCountry(false)}
						>
							<span>
								<MdLocationPin style={{ color: '#ff5234', fontSize: '22px' }} />
							</span>
							<span className='extra-class'>{currentLocation?.title}</span>
							<span>
								<AiFillCaretDown />
							</span>
							<div className='regions'>
								<input
									type='search'
									value={termCountry}
									onChange={(e) => setTermCountry(e.target.value)}
									placeholder='Search country'
								/>
								{countries}
							</div>
						</div>
						{/*<div className={openNetworks ? 'networks active' : 'networks'}*/}
						{/*     onMouseEnter={() => setOpenNetworks(true)} onMouseLeave={() => setOpenNetworks(false)}>*/}
						{/*  <div className='selected__network'>*/}
						{/*    <span>Сети</span>*/}
						{/*    <span> Dastyor express</span>*/}
						{/*    <span>*/}
						{/*      <svg xmlns="http://www.w3.org/2000/svg" width="10"*/}
						{/*           height="5" viewBox="0 0 10 5"><g><g><path*/}
						{/*        fill="#1c1e23" d="M0 0h10L5 5z"/></g></g></svg>*/}
						{/*     </span>*/}
						{/*  </div>*/}
						{/*  <div className='networks__list'>*/}
						{/*    <div>*/}
						{/*      <img src={express} alt="Dastyor express"/>*/}
						{/*    </div>*/}
						{/*    <div>*/}
						{/*      <img src={xizmat} alt="Dastyor сфера услуг"/>*/}
						{/*    </div>*/}
						{/*    <div>*/}
						{/*      <img src={restaurant} alt="Dastyor ресторан"/>*/}
						{/*    </div>*/}
						{/*  </div>*/}
						{/*</div>*/}
						<div className='personal__cabinet'>
							<>
								{isAuthenticated ? (
									<Link to='/user/profile' className='personal__cabinet-link'>
										<FaRegUserCircle style={{ fontSize: '18px' }} />
										<span>Персональный кабинет</span>
									</Link>
								) : (
									<div className='personal__cabinet-auth'>
										<Link to='/login'>Login</Link>/<Link to='/auth'>Auth</Link>
									</div>
								)}
							</>
							<div
								className={openLanguage ? 'language active' : 'language'}
								onMouseEnter={() => setOpenLanguage(true)}
								onMouseLeave={() => setOpenLanguage(false)}
							>
								<div className='language__selected'>
									<span>{currLang}</span>
									<span>
										<AiFillCaretDown />
									</span>
								</div>
								<div className='language__list'>
									{languages.map((item) => (
										<span
											onClick={() => {
												onChangeLang(item.lang, item.label)
												setOpenLanguage(false)
											}}
											key={item.lang}
										>
											{item.label}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr />
			</div>
			<div className='header__bottom'>
				<div className='container'>
					<div className='header__bottom-wrapper'>
						<Link to='/' className='header__logo'>
							<img src={logo} alt='Dastyor Online Shop' />
						</Link>
						<Search term={term} setTerm={setTerm} onSubmit={onSubmit} />
						<div className='user__actions'>
							<div onClick={handleFav}>
								<span data-quantity={favouritesTotalCount}>
									<BsHeart style={{ color: '#ff5234', fontSize: '20px' }} />
								</span>
								<li>Избранные</li>
							</div>

							<div onClick={handleCart}>
								<span data-quantity={cartTotalCount}>
									<MdOutlineShoppingCart
										style={{ color: '#ff5234', fontSize: '20px' }}
									/>
								</span>
								<li>Корзина</li>
							</div>

							<div className='menu__open' onClick={setShowMenu}>
								<RiMenu3Fill style={{ fontSize: '24px' }} />
							</div>
						</div>
					</div>
				</div>
				<hr />
			</div>
		</header>
	)
}

export default Navigation
