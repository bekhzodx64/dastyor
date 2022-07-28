import React, { useState, useContext, useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'

import logo from '../../Assets/Images/logo.png'
import AuthenticationContext from '../../Context/AuthenticationContext'
import MenuContext from '../../Context/MenuContext'
import TranslationContext from '../../Context/TranslationContext'
import Search from '../Search'
import LocationContext from '../../Context/LocationContext'

import { useDispatch, useSelector } from 'react-redux'
import { cartHandler, getTotals } from '../../redux/features/cartSlice'
import {
	favouritesHandler,
	getFavouritesTotal,
} from '../../redux/features/favouriteSlice'
import { BsHeart } from 'react-icons/bs'
import { MdOutlineShoppingCart, MdLocationPin } from 'react-icons/md'
import { AiFillCaretDown } from 'react-icons/ai'
import { RiMenu3Fill } from 'react-icons/ri'

const Navigation = () => {
	const dispatch = useDispatch()
	const [openCountry, setOpenCountry] = useState(false)
	const [openLanguage, setOpenLanguage] = useState(false)
	const [term, setTerm] = useState('')
	const [currLang, setCurrLang] = useState('Русский')
	const { translation } = useContext(TranslationContext)
	const { setCategoryOpen } = useContext(MenuContext)
	const { authenticated } = useContext(AuthenticationContext)
	const { currentLocation, locations, toggleSelectCountry } =
		useContext(LocationContext)
	const [termCountry, setTermCountry] = useState('')
	const navigate = useNavigate()
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

	const { cartTotalCount, cartItems } = useSelector(
		(state) => state.cartReducer
	)
	const { favouritesTotalCount, favourites } = useSelector(
		(state) => state.favouriteReducer
	)

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
								{authenticated ? (
									<Link to='/user/profile' className='personal__cabinet-link'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 20 20'
										>
											<g>
												<g>
													<path d='M16.725 17.394l.01.008-.333.278c-.033.028-.07.052-.104.079-.152.124-.309.243-.468.357-.067.048-.133.097-.2.143a10.025 10.025 0 0 1-1.393.796l-.083.038c-.75.344-1.55.597-2.385.747l-.068.012c-.26.045-.524.08-.792.105l-.101.007c-.267.021-.536.036-.808.036-.275 0-.546-.015-.815-.037l-.098-.007c-.27-.025-.536-.06-.799-.106l-.067-.013a9.905 9.905 0 0 1-2.418-.765l-.052-.023a10.009 10.009 0 0 1-1.415-.815c-.06-.041-.119-.084-.178-.126a9.955 9.955 0 0 1-.532-.41c-.021-.018-.044-.032-.065-.05l-.325-.273.01-.009A9.974 9.974 0 0 1 0 10C0 4.486 4.486 0 10 0s10 4.486 10 10a9.974 9.974 0 0 1-3.275 7.394zm-12.916-.498c.09-.065.182-.124.273-.173l2.876-1.569a.811.811 0 0 0 .422-.712V13.39a6.835 6.835 0 0 1-1.124-2.323 1.323 1.323 0 0 1-.488-1.026v-1.29c0-.314.116-.62.323-.86V6.192c-.02-.188-.086-1.254.685-2.132.67-.765 1.754-1.152 3.224-1.152 1.47 0 2.554.387 3.224 1.152.77.879.704 1.944.685 2.133V7.89c.207.24.323.546.323.861v1.29c0 .518-.298.976-.759 1.195a7.413 7.413 0 0 1-.95 1.863 5.81 5.81 0 0 1-.225.297v1.076c0 .308.171.586.448.724l3.079 1.54c.11.055.217.121.324.195A9.25 9.25 0 0 0 19.273 10c0-5.113-4.16-9.273-9.273-9.273C4.887.727.727 4.887.727 10a9.25 9.25 0 0 0 3.082 6.896zm11.749.521l-.058-.03-3.08-1.54a1.53 1.53 0 0 1-.85-1.374v-1.346l.09-.103c.08-.09.173-.21.268-.345a6.73 6.73 0 0 0 .908-1.83l.058-.18.18-.055a.608.608 0 0 0 .43-.573V8.752a.594.594 0 0 0-.202-.445l-.12-.108.003-2.073c0-.007.102-.898-.514-1.593-.527-.595-1.425-.897-2.671-.897-1.25 0-2.152.305-2.677.904-.617.702-.51 1.577-.508 1.585l.003.048v2.025l-.12.109a.594.594 0 0 0-.202.444v1.29c0 .204.104.393.28.506l.123.08.033.144a6.071 6.071 0 0 0 1.092 2.26l.083.102v1.31c0 .563-.307 1.08-.801 1.35L4.43 17.361l-.034.02.048.038a9.196 9.196 0 0 0 .645.44c.179.112.36.22.547.319l.08.041c.203.106.409.206.62.297l.004.002c.222.095.448.182.677.26l.043.014c.46.154.934.272 1.415.353l.03.005c.227.037.457.065.687.085l.119.009c.229.017.458.029.689.029.228 0 .455-.011.68-.029a9.378 9.378 0 0 0 .803-.092c.007 0 .014-.003.02-.004.24-.04.48-.088.715-.146h.002c.233-.058.464-.125.692-.2l.047-.016a9.241 9.241 0 0 0 1.268-.537l.118-.06c.179-.095.353-.196.525-.303l.182-.116a9.15 9.15 0 0 0 .388-.268c.039-.028.079-.055.118-.085z' />
												</g>
											</g>
										</svg>
										<span>{translation['account']}</span>
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
							<div onClick={() => dispatch(favouritesHandler())}>
								<span data-quantity={favouritesTotalCount}>
									<BsHeart style={{ color: '#ff5234', fontSize: '20px' }} />
								</span>
								<li>Избранные</li>
							</div>

							<div onClick={() => dispatch(cartHandler())}>
								<span data-quantity={cartTotalCount}>
									<MdOutlineShoppingCart
										style={{ color: '#ff5234', fontSize: '20px' }}
									/>
								</span>
								<li>Корзина</li>
							</div>

							<div className='menu__open' onClick={() => setCategoryOpen(true)}>
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
