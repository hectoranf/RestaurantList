import Image from 'next/image'
import styles from './restaurant-card.module.css'
import Link from 'next/link'
import { deleteRestaurant } from '../../services/restaurant.service'
import Router from 'next/router'
import { useAppContext } from '../../lib/context'

export default function RestaurantCard(props) {
	const { authState, setAuth } = useAppContext()

	const deleteClick = async (id) => {
		deleteRestaurant(id)
			.then(() => Router.reload(window.location.pathname))
			.catch((err) => console.log(err))
	}

	return (
		<Link href={`/restaurant/${props._id}`} passHref>
			<article className={styles.card}>
				<figure>
					<Image src={props.image} layout='fill' objectFit='cover' alt={props.name} />
				</figure>
				<div className={styles.info}>
					<p className={styles.small}>{props.cuisine_type}</p>
					<h3>{props.name}</h3>
					<div>
						<p>{props.neighborhood}</p>
						{authState.isLoggedIn && (
							<div>
								<figure className={styles.icon}>
									<Image
										onClick={() => deleteClick(props._id)}
										src='/images/delete.svg'
										width={25}
										height={25}
										alt={props.name}
									/>
								</figure>
								<figure className={styles.icon}>
									<Link href={`/restaurant/edit/${props._id}`} passHref>
										<Image
											src='/images/edit.svg'
											width={22}
											height={22}
											alt={props.name}
										/>
									</Link>
								</figure>
								<figure className={styles.icon}>
									<Image
										src='/images/favourite.svg'
										width={25}
										height={25}
										alt={props.name}
									/>
								</figure>
							</div>
						)}
					</div>
				</div>
			</article>
		</Link>
	)
}
