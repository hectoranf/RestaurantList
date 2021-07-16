import Image from 'next/image'
import styles from './restaurant-card.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { deleteRestaurant } from '../../services/restaurant.service'
import { useAppContext } from '../../lib/context'
import { updateFavourites } from '../../services/user.service'

export default function RestaurantCard(props) {
	const { authState, setAuth } = useAppContext()

	//Is a favourite restaurant
	const [favState, setFab] = useState(false)

	useEffect(() => {
		setFab(checkIsFav())
	}, [authState])

	//Check if Id is in array of Favourites
	const checkIsFav = () => {
		return authState.user
			? authState.user.favouriteRestaurants.filter((elm) => elm._id === props._id).length > 0
			: false
	}

	const addFav = () => {
		const copyFav = [...authState.user.favouriteRestaurants]
		const favIds = copyFav.map((elm) => elm._id)
		favIds.push(props._id)
		update(favIds)
	}

	const removeFav = () => {
		const copyFav = [...authState.user.favouriteRestaurants]
		const favIds = copyFav.map((elm) => elm._id)
		const index = favIds.indexOf(props._id)
		if (index > -1) {
			favIds.splice(index, 1)
		}

		update(favIds)
	}

	const update = (favourites) => {
		updateFavourites(authState.user._id, favourites)
			.then((res) => {
				setAuth({ isLoggedIn: true, user: res.data })
			})
			.catch((err) => console.log(err))
	}

	const deleteClick = async (id) => {
		deleteRestaurant(id)
			.then(() => Router.reload(window.location.pathname))
			.catch((err) => console.log(err))
	}

	return (
		<article className={styles.card}>
			<Link href={`/restaurant/${props._id}`} passHref>
				<figure>
					<Image src={props.image} layout='fill' objectFit='cover' alt={props.name} />
				</figure>
			</Link>
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
							<Link href={`/restaurant/edit/${props._id}`} passHref>
								<figure className={styles.icon}>
									<Image
										src='/images/edit.svg'
										width={22}
										height={22}
										alt={props.name}
									/>
								</figure>
							</Link>
							<figure
								className={favState ? styles.fav : styles.unfav}
								onClick={favState ? () => removeFav() : () => addFav()}>
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
	)
}
