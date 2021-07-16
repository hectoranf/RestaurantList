import Link from 'next/link'
import Layout from '../../../components/layout/layout'
import { updateRestaurant, getOneRestaurant } from '../../../services/restaurant.service'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/forms/restaurant.module.css'

export default function NewRestaurantForm({ restaurant }) {
	const [state, setState] = useState({
		name: restaurant.name,
		neighborhood: restaurant.neighborhood,
		address: restaurant.address,
		cuisine_type: restaurant.cuisine_type,
	})

	const router = useRouter()

	const handleInputChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		updateRestaurant(restaurant._id, state)
			.then((res) => router.push(`/restaurant/${res.data._id}`))
			.catch((err) => console.log(err))
	}

	return (
		<Layout title='Edit restaurant'>
			<h1>New restaurant</h1>

			<section className={styles.restaurantForm}>
				<form className='form-container' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label>Restaurant Name: </label>
						<input
							className='input'
							name='name'
							value={state.name}
							type='text'
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Neighbourhood: </label>
						<input
							className='input'
							name='neighborhood'
							value={state.neighborhood}
							type='text'
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Address: </label>
						<input
							className='input'
							name='address'
							value={state.address}
							type='text'
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Cuisine Type: </label>
						<select
							className='input'
							name='cuisine_type'
							value={state.cuisine_type}
							onChange={handleInputChange}>
							<option value='American'>American</option>
							<option value='Asian'>Asian</option>
							<option value='Pizza'>Pizza</option>
							<option value='Mexican'>Mexican</option>
							<option value='Italian'>Italian</option>
							<option value='Spanish'>Spanish</option>
							<option value='French'>French</option>
							<option value='Other'>Other</option>
						</select>
					</div>

					<div>
						<button type='submit'>Edit restaurant</button>
					</div>
				</form>
			</section>
		</Layout>
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
