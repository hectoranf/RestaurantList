import Link from 'next/link'
import Layout from '../../components/layout/layout'
import { createRestaurant } from '../../services/restaurant.service'
import { uploadImage } from '../../services/file.service'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/forms/restaurant.module.css'

export default function NewRestaurantForm() {
	const [state, setState] = useState({
		name: '',
		neighborhood: '',
		address: '',
		image: '',
		cuisine_type: 'Other',
	})

	const [uploading, setUpload] = useState(false)

	const router = useRouter()

	const handleFileUpload = async (e) => {
		setUpload(true)
		const uploadData = new FormData()
		uploadData.append('imageUrl', e.target.files[0])
		await uploadImage(uploadData)
			.then((res) => {
				setState({ ...state, image: res.data.secure_url })
				setUpload(false)
			})
			.catch((err) => console.log(err))
	}

	const handleInputChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		if (!uploading) {
			createRestaurant(state)
				.then((res) => router.push(`/restaurant/${res.data._id}`))
				.catch((err) => console.log(err))
		}
	}

	return (
		<Layout title='New restaurant'>
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
							type='text'
							value={state.neighborhood}
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
					<div className={`form-group ${styles.fileInput}`}>
						<div>
							<label>Image: </label>
							<input
								className='input'
								name='image'
								type='file'
								onChange={handleFileUpload}
								required
							/>
						</div>
						{uploading && <p className={styles.uploadingMsg}>Uploading Image...</p>}
					</div>
					<div>
						<button type='submit'>Add restaurant</button>
					</div>
				</form>
			</section>
		</Layout>
	)
}
