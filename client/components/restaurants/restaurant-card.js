import Image from 'next/image'
import styles from './restaurant-card.module.css'
import Link from 'next/link'

export default function RestaurantCard(props) {
	return (
		<Link href={`/restaurant/${props._id}`}>
			<article className={styles.card}>
				<figure>
					<Image src={props.image} layout='fill' objectFit='cover' alt={props.name} />
				</figure>
				<div className={styles.info}>
					<p className={styles.small}>{props.cuisine_type}</p>
					<h3>{props.name}</h3>
					<p>{props.neighborhood}</p>
				</div>
			</article>
		</Link>
	)
}

// href={`/restaurant/${elm._id}`}
