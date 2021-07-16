import axios from 'axios'

const handler = axios.create({
	baseURL: `https://restaurantlist-api.herokuapp.com/api/restaurants`,
	withCredentials: true,
})

export const getAllRestaurants = () => {
	return handler.get('/')
}

export function getOneRestaurant(id) {
	return handler.get(`/${id}`)
}
