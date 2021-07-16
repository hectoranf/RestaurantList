import '../styles/globals.css'
import '../styles/navbar.css'
import { AppContextProvider } from '../lib/context'

function MyApp({ Component, pageProps }) {
	return (
		<AppContextProvider>
			<Component {...pageProps} />
		</AppContextProvider>
	)
}

export default MyApp
