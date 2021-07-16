import { useAppContext } from '../../lib/context'
import Layout from '../../components/layout/layout'
import Link from 'next/link'
import RestaurantCard from '../../components/restaurants/restaurant-card'
import styles from '../../styles/Home.module.css'

export default function Profile({ data }) {
	const { authState, setAuth } = useAppContext()
	return (
		<>
			<Layout>
				<section className='content-container'>
					{authState.user ? (
						<>
							<h1>Wellcome {authState.user.username}</h1>

							{authState.user.favouriteRestaurants.length ? (
								<section>
									<h2>These are your favourite restaurants</h2>
									<div className={styles.restaurantsList}>
										{authState.user.favouriteRestaurants.map((elm) => (
											<RestaurantCard key={elm._id} {...elm} />
										))}
									</div>
								</section>
							) : (
								<h2>
									Looks like you haven&apos;t added any restaurants to your
									favorites yet
								</h2>
							)}
						</>
					) : (
						<>
							<h1>Restricted area</h1>
							<h2>
								Please,{' '}
								<span className='blue'>
									<Link href='/login'>sign in</Link>
								</span>{' '}
								to visit your profile
							</h2>
						</>
					)}
				</section>
			</Layout>
		</>
	)
}
