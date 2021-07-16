import axios from 'axios'

const handler = axios.create({
	baseURL: `https://restaurantlist-api.herokuapp.com/api/files`,
	withCredentials: true,
})

export function uploadImage(imageForm) {
	return handler.post('/upload', imageForm)
}
