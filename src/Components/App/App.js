import AppRoutes from '../../AppRoutes'
import DashAndLiked from '../DashAndLiked'
import Footer from '../Footer'
import Navigation from '../Navigation'
import Providers from '../Providers'
import './App.css'

const App = () => {
	return (
		<Providers>
			<Navigation />
			<main className='app'>
				<AppRoutes />
				<DashAndLiked />
			</main>
			<Footer />
		</Providers>
	)
}

export default App
