import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/layout'
import { getAllRestaurants } from '../services/restaurant.service'

export default function Home({ data }) {
	return (
		<div>
			<Layout>
				<section>Hello nextjs world</section>
				<section className='contentContainer'>
					{data.map((elm) => {
						return (
							<article key={elm._id}>
								<p>{elm.name}</p>
							</article>
						)
					})}
					{data.map((elm) => {
						return (
							<article key={elm._id}>
								<p>{elm.name}</p>
							</article>
						)
					})}
					{data.map((elm) => {
						return (
							<article key={elm._id}>
								<p>{elm.name}</p>
							</article>
						)
					})}
					{data.map((elm) => {
						return (
							<article key={elm._id}>
								<p>{elm.name}</p>
							</article>
						)
					})}
					{data.map((elm) => {
						return (
							<article key={elm._id}>
								<p>{elm.name}</p>
							</article>
						)
					})}
				</section>
			</Layout>
		</div>
	)
}

export async function getServerSideProps() {
	const data = await getAllRestaurants()
		.then((res) => res.data)
		.catch((err) => console.log(err))
	return {
		props: {
			data,
		},
	}
}
