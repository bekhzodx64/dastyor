import { Fragment } from 'react'
import AppRoutes from '../../AppRoutes'
import DashAndLiked from '../DashAndLiked'
import Footer from '../Footer'
import Navigation from '../Navigation'
import './App.css'

const App = () => {
	return (
		<Fragment>
			<Navigation />
			<main className='app'>
				<AppRoutes />
				<DashAndLiked />
			</main>
			<Footer />
		</Fragment>
	)
}

export default App
