import { Link } from 'react-router-dom'

import { VscChevronRight } from 'react-icons/vsc'

const DetailNavigation = ({ product, url, main_url }) => {
	return (
		<div className='detail-page__navigation'>
			<Link to='/'>
				Главная <VscChevronRight />
			</Link>
			<Link to='/category'>
				Категории
				<VscChevronRight />
			</Link>
			<Link to={`/category/${url}`}>
				{product.category.title}
				<VscChevronRight />
			</Link>
			<Link to={`/category/${url}/${main_url}`}>{product.title}</Link>
		</div>
	)
}

export default DetailNavigation
