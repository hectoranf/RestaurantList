import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/layout'
import { getAllRestaurants } from '../services/restaurant.service'
import RestaurantCard from '../components/restaurants/restaurant-card'

export default function Home({ data }) {
	return (
		<>
			<Layout>
				<section className={styles.hero}>
					<article>
						<figure>
							<Image src='/images/logo.svg' layout='fill' alt='logo' />
						</figure>
						<p>
							Don&apos;t wait any longer.
							<br /> Discover your new favourite restaurant now!
						</p>
					</article>
				</section>

				<section className={`content-container ${styles.features}`}>
					<h1>Endless possibilities</h1>
					<div className={styles.featuresCards}>
						<article>
							<figure>
								<Image
									src='https://res.cloudinary.com/hector/image/upload/v1626306475/restaurantlist/illustration_locations_yfdtio.png'
									layout='fill'
									alt='locations map'
								/>
							</figure>
							<p>Find the coolest places around you</p>
						</article>
						<article>
							<figure>
								<Image
									src='https://res.cloudinary.com/hector/image/upload/v1626306472/restaurantlist/illustration_chef_qdvpuw.png'
									layout='fill'
									alt='Chef cooking'
								/>
							</figure>
							<p>Try new food</p>
						</article>
						<article>
							<figure>
								<Image
									src='https://res.cloudinary.com/hector/image/upload/v1626306478/restaurantlist/illustration_dinner_mmgrti.png'
									layout='fill'
									alt='Dinner with friends'
								/>
							</figure>
							<p>Enjoy with your beloved</p>
						</article>
					</div>
				</section>

				<section className='content-container'>
					<h1>Choose your next restaurant</h1>
					<div className={styles.restaurantsList}>
						{data.map((elm) => (
							<RestaurantCard key={elm._id} {...elm} />
						))}
					</div>
				</section>
			</Layout>
		</>
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
