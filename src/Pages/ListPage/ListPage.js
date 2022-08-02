import {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
	Suspense,
} from 'react'
import { Range } from 'rc-slider'
import axios from 'axios'
import { useParams } from 'react-router'
import 'rc-slider/assets/index.css'

import Categories from '../../Components/Categories'
import Card from '../../Components/Card'
import { getProductByNext } from '../../Repository/ProductsApi'
import Spinner from '../../Components/Spinner'
import { getFilters, getPrices } from '../../Repository/BaseRequests'
import empty_cart from '../../Assets/Images/empty_cart.png'
import './ListPage.css'

import { useGetCategorizedProductsQuery } from '../../redux/api/apiSlice'
import { BiSliderAlt } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'

function usePrevious(value) {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

const ListPage = () => {
	const { url } = useParams()

	const { data: products, isLoading } = useGetCategorizedProductsQuery([url])

	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const prevUrl = usePrevious({ url })
	const [filters, setFilters] = useState([])
	const [ids, setIds] = useState([])
	const [restrictPrice, setRestrictPrice] = useState([])
	const [value, setValue] = useState([])
	const [valueMin, setValueMin] = useState([])
	const [openFilter, setOpenFilter] = useState(false)

	useEffect(() => {
		getFilters(url)
			.then((res) => {
				setFilters(res.data)
			})
			.catch((err) => console.log(err))
		getPrices(url)
			.then((res) => {
				setRestrictPrice([res.data.lowest_price, res.data.highest_price])
				setValue([res.data.lowest_price, res.data.highest_price])
			})
			.catch((err) => console.log(err))
		window.scrollTo(null, 0)
	}, [url])

	useEffect(() => {
		if (url !== prevUrl) {
			setLoading(true)
		}
		axios
			.get(`https://dastyor.site.uz/api/products/${url}/categorized/`, {
				params: {
					detail_ids: [...ids].toString(),
					min_price: valueMin[0],
					max_price: valueMin[1],
				},
			})
			.then((res) => {
				setData(() => {
					return {
						next: res.data.next,
						count: res.data.count,
						previous: res.data.next,
						results: res.data.results,
					}
				})
			})
			.then(() => setLoading(false))
			.catch((err) => console.log(err))
	}, [url, ids, valueMin])

	useEffect(() => {
		if (url !== prevUrl) {
			setIds([])
			setValueMin([])
		}
	}, [url])

	const onFilterChange = useCallback(
		(e, id) => {
			if (e.target.checked) {
				setIds((state) => [...state, id])
			} else {
				const index = ids.findIndex((item) => item === id)
				setIds((state) => [...state.slice(0, index), ...state.slice(index + 1)])
			}
		},
		[ids]
	)

	const onLoadNextPage = useCallback(
		(e) => {
			e.target.disabled = true
			e.target.innerText = 'Загрузка...'
			if (data.next != null) {
				getProductByNext(data.next)
					.then((res) => {
						setData((state) => {
							return {
								next: res.data.next,
								count: res.data.count,
								previous: res.data.next,
								results: [...state.results, ...res.data.results],
							}
						})
						e.target.disabled = false
						e.target.innerText = 'Показать ещё'
					})
					.catch((err) => console.log(err))
			} else {
				e.target.className = 'd-none'
			}
		},
		[data]
	)

	if (isLoading) {
		return <Spinner />
	}

	return (
		<Suspense fallback={<Spinner />}>
			<section className='list-page'>
				<div className='container'>
					<div className='list-page__openfilter'>
						<h4>Filter</h4>
						<BiSliderAlt
							onClick={() => setOpenFilter(true)}
							style={{ fontSize: '26px' }}
						/>
					</div>
					<div className='list-page__wrapper'>
						<div
							className={
								openFilter ? 'list-page__aside active' : 'list-page__aside'
							}
						>
							<div className='list-page__closefilter'>
								<h4>Filter</h4>
								<IoClose
									style={{ fontSize: '24px' }}
									onClick={() => setOpenFilter(false)}
								/>
							</div>
							<div style={{ border: '1px solid #EBEBEB' }}>
								<Categories />
							</div>
							<div className='list-page__filter'>
								<div className='list-page__range'>
									<h4>Сортировать по цене</h4>
									<Range
										value={value}
										min={100}
										max={restrictPrice[1]}
										step={100}
										onChange={(value) => setValue(value)}
										onAfterChange={(value) => setValueMin(value)}
									/>
									<div className='list-page__range-inps'>
										<span>{value[0] === 50 ? 100 : value[0]}</span>-
										<span>{value[1]}</span>
									</div>
								</div>
								{filters.map((item) => (
									<div key={item.id} className='list-page__checkboxes'>
										<h4 className='filter__title'>{item.title}</h4>
										{item.product_details.map((detail) => (
											<label htmlFor={detail.id} key={detail.id}>
												<input
													type='checkbox'
													id={detail.id}
													onChange={(e) => onFilterChange(e, detail.id)}
												/>
												<span>{detail.value}</span>
											</label>
										))}
									</div>
								))}
							</div>
						</div>
						<div
							className='list-page__overlay'
							onClick={() => setOpenFilter(false)}
						/>

						<div style={{ position: 'relative' }}>
							{products.results.length === 0 ? (
								<div className='list-page__notfound'>
									<div>
										<img src={empty_cart} alt='Dastyor Express' />
										<h4>No item found</h4>
									</div>
								</div>
							) : (
								<div className='list-page__content'>
									{products.results.map((item) => (
										<Fragment key={item.id}>
											<Card cardInfo={item} />
										</Fragment>
									))}
								</div>
							)}
							{products.next == null ? null : (
								<button className='list-page__button' onClick={onLoadNextPage}>
									показать еще
								</button>
							)}
						</div>
					</div>
				</div>
			</section>
		</Suspense>
	)
}

export default ListPage
