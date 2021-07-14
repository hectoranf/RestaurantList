import axios from 'axios'

const handler = axios.create({
	// baseURL: `${process.env.REACT_APP_API_URL}/restaurants`,
	baseURL: `https://restaurantlist-api.herokuapp.com/api/restaurants`,
	withCredentials: true,
})

// export function getAllRestaurants() {
// 	return handler.get('/')
// }

export const getAllRestaurants = () => {
	return handler.get('/')
}
