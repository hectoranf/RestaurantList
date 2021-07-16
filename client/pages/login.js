import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../styles/forms/auth.module.css'
import { login } from '../services/auth.service'
import axios from 'axios'

export default function Login() {
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
		const { username, password } = state
		const handler = axios.create({
			baseURL: `https://restaurantlist-api.herokuapp.com/api`,
			withCredentials: true,
		})
		handler
			.post('/login', { username, password })
			.then(() => {
				router.push('/')
			})
			.catch((err) => console.log(err))
	}

	return (
		<Layout title='Login'>
			<section className='content-container'>
				<div className={`${styles.wraper} ${styles.inverse}`}>
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
							<button className='form-button' type='submit'>
								Log in
							</button>
						</div>
					</form>
					<figure>
						<Image
							src='https://res.cloudinary.com/hector/image/upload/v1626388785/restaurantlist/illustration_login_fqhjig.png'
							layout='fill'
							alt='locations map'
						/>
					</figure>
				</div>
			</section>
		</Layout>
	)
}
