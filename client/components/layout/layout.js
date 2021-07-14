import Head from 'next/head'
import styles from './layout.module.css'
import Image from 'next/image'

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
				<Image src='/images/logo.svg' height={40} width={300} alt='logo'></Image>
			</nav>
			<main>{children}</main>
			<footer>
				<p>Developed with Next.js</p>
			</footer>
		</>
	)
}
