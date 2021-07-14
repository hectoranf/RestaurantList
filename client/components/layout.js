import Head from 'next/head'

export const siteTitle = 'The Restaurant List'

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<title>The Restaurants List</title>
				<meta name='description' content='Discover your new favourite restaurants' />
				<meta name='og:title' content='The Restaurants List' />
			</Head>
			<main>{children}</main>
		</>
	)
}
