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

export function createRestaurant(restaurantData) {
	return handler.post(`/`, restaurantData)
}

export function updateRestaurant(id, restaurantData) {
	return handler.put(`/${id}`, restaurantData)
}

export function deleteRestaurant(id) {
	return handler.delete(`/${id}`)
}
