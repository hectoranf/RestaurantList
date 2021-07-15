import Image from 'next/image'
import styles from '../../styles/restaurant/details.module.css'
import Layout from '../../components/layout/layout'
import { getOneRestaurant } from '../../services/restaurant.service'

export default function RestaurantDetails({ restaurant }) {
	return (
		<>
			<Layout title={restaurant.name}>
				<div className={`content-container ${styles.details}`}>
					<figure>
						<Image
							src={restaurant.image}
							layout='fill'
							objectFit='cover'
							alt={restaurant.name}
						/>
					</figure>
					<section>
						<h2>{restaurant.name}</h2>
						<p className={styles.small}>{restaurant.cuisine_type}</p>
						<p>
							{restaurant.address} [{restaurant.neighborhood}]
						</p>
						<br></br>
						{restaurant.operating_hours && (
							<>
								<p className='bold'>Operating Hours:</p>
								<ul>
									{Object.keys(restaurant.operating_hours).map((key, idx) => {
										return (
											<li
												key={
													idx
												}>{`${key} : ${restaurant.operating_hours[key]}`}</li>
										)
									})}
								</ul>
							</>
						)}
					</section>
				</div>
			</Layout>
		</>
	)
}

export async function getServerSideProps({ params }) {
	return await getOneRestaurant(params.id).then((res) => {
		return {
			props: {
				restaurant: res.data,
			},
		}
	})
}
