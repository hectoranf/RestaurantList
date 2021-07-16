import axios from 'axios'

const handler = axios.create({
	// baseURL: `http://localhost:5000/api`,
	baseURL: `https://restaurantlist-api.herokuapp.com/api`,
	withCredentials: true,
})

export const signup = (credentials) => {
	return handler.post('/signup', credentials)
}

export function login(credentials) {
	return handler.post('/login', credentials)
}

export function logout() {
	return handler.post('/logout')
}
