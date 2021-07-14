import Head from 'next/head'
import Navbar from './navbar'

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<title>The Restaurants List</title>
				<meta name='description' content='Discover your new favourite restaurants' />
				<meta name='og:title' content='The Restaurants List' />
			</Head>
			<Navbar />
			<main>{children}</main>
			<footer>
				<p>Developed with Next.js</p>
			</footer>
		</>
	)
}
