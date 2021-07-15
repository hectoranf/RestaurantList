import Image from 'next/image'
import styles from './restaurant-card.module.css'
export default function RestaurantCard(props) {
	return (
		<article className={styles.card}>
			<figure>
				<Image src={props.image} layout='fill' objectFit='cover' alt='locations map' />
			</figure>
			<div className={styles.info}>
				<p className={styles.small}>{props.cuisine_type}</p>
				<h3>{props.name}</h3>
				<p>{props.neighborhood}</p>
			</div>
		</article>
	)
}
