import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './Components/App'

import 'swiper/swiper-bundle.min.css'
import './Assets/Font/stylesheet.css'
import './Assets/Libs/bootstrap-grid.min.css'
import './Assets/Libs/bootstrap-reboot.min.css'

import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app')
)
