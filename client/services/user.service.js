import axios from 'axios'

const handler = axios.create({
	baseURL: `https://restaurantlist-api.herokuapp.com/api/user`,
	withCredentials: true,
})

export const getTheUser = () => {
	return handler.get('/')
}
