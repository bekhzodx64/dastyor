import { Fragment } from 'react'
import Aside from '../Aside'

import { useSelector } from 'react-redux'

const DashAndLiked = () => {
	const { cartItems, showCart } = useSelector((state) => state.cartReducer)
	const { favourites, showFavourites } = useSelector(
		(state) => state.favouriteReducer
	)

	return (
		<Fragment>
			<Aside favourites={favourites} title='Избранные' showFavourites={showFavourites} />
			<Aside cartItems={cartItems} title='Корзина' showCart={showCart} />
		</Fragment>
	)
}

export default DashAndLiked
