import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { UserInfoContextProvider } from '../../Context/UserInfoContext'
import { AuthenticationContextProvider } from '../../Context/AuthenticationContext'
import { TranslationContextProvider } from '../../Context/TranslationContext'
import { LocationContextProvider } from '../../Context/LocationContext'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

const Providers = ({ children }) => {
	// const options = {
	// 	// passing the client secret obtained from the server
	// 	clientSecret:
	// 			'pk_test_51KGiSSGkxF61LyvBXOXdKaWCNdPo3aam7BKpyafjxlOgyT8RzmAF0VYkUgOlOPpdzL3OyOdA2l8c1L1PjKhQurqg00dXf4DEps',
	// }

	return (
		// <Elements stripe={stripePromise} options={options}>
		// <LocationContextProvider>
		// <UserInfoContextProvider>
		// <AuthenticationContextProvider>
		<TranslationContextProvider>{children}</TranslationContextProvider>
		// </AuthenticationContextProvider>
		// </UserInfoContextProvider>
		// </LocationContextProvider>
		// </Elements>
	)
}

export default Providers
