import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '../styles/forms/auth.module.css'
import Image from 'next/image'

export default function Signup() {
	const router = useRouter()

	const [state, setState] = useState({
		username: '',
		password: '',
	})

	const handleInputChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		axios
			.post('https://restaurantlist-api.herokuapp.com/api/signup', state)
			.then((res) => {
				router.push('/login')
			})
			.catch((err) => console.log(err.response.data.message[0].msg))
	}

	return (
		<Layout title='Signup'>
			<section className='content-container'>
				<div className={styles.wraper}>
					<form className='form-container' onSubmit={handleSubmit}>
						<div className='form-group'>
							<label htmlFor='username'>Username: </label>
							<input
								className='input'
								name='username'
								value={state.username}
								type='text'
								onChange={handleInputChange}
								placeholder='Username'
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password'>Password: </label>
							<input
								className='input'
								name='password'
								type='password'
								onChange={handleInputChange}
								placeholder='Password'
								required
							/>
						</div>
						<div>
							<input className='button' type='submit' />
						</div>
					</form>
					<figure>
						<Image
							src='https://res.cloudinary.com/hector/image/upload/v1626388789/restaurantlist/illustration_signup_dvvosr.png'
							layout='fill'
							alt='locations map'
						/>
					</figure>
				</div>
			</section>
		</Layout>
	)
}
