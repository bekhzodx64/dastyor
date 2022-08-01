import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './Components/App'

import 'swiper/swiper-bundle.min.css'
import './Assets/Font/stylesheet.css'
import './Assets/Libs/bootstrap-grid.min.css'
import './Assets/Libs/bootstrap-reboot.min.css'

import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Spinner from './Components/Spinner'

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={<Spinner />} persistor={persistor}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('app')
)
