import Head from 'next/head'
import styles from './layout.module.css'

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<title>The Restaurants List</title>
				<meta name='description' content='Discover your new favourite restaurants' />
				<meta name='og:title' content='The Restaurants List' />
			</Head>
			<nav className={styles.navbar}>
				<p>The restaurant list</p>
			</nav>
			<main>{children}</main>
		</>
	)
}
