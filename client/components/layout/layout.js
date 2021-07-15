import Head from 'next/head'
import Navbar from './navbar'

export default function Layout(props) {
	const generateTitle = () => {
		return props.title ? `${props.title} | The Restaurant List` : 'The Restaurant List'
	}

	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<title>{generateTitle()}</title>
				<meta name='description' content='Discover your new favourite restaurants' />
				<meta name='og:title' content='The Restaurants List' />
			</Head>
			<Navbar />
			<main>{props.children}</main>
			<footer>
				<p>Developed with Next.js &#128640;</p>
			</footer>
		</>
	)
}
