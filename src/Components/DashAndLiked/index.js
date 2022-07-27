import Aside from '../Aside'

import { useSelector } from 'react-redux'

const DashAndLiked = () => {
	const { cartItems, showCart } = useSelector((state) => state.cartReducer)
	const { favourites, showFavourites } = useSelector(
		(state) => state.favouriteReducer
	)

	return (
		<>
			<Aside
				type='favourite'
				favourites={favourites}
				title='Избранные'
				showFavourites={showFavourites}
			/>

			<Aside
				type='cart'
				cartItems={cartItems}
				title='Корзина'
				showCart={showCart}
			/>
		</>
	)
}

export default DashAndLiked
