import axios from 'axios'

const handler = axios.create({
	baseURL: `http://localhost:5000/api/user`,
	// baseURL: `https://restaurantlist-api.herokuapp.com/api/user`,
	withCredentials: true,
})

export const getTheUser = () => {
	return handler.get('/')
}

export const updateFavourites = (userId, favourites) => {
	return handler.put(`/updateFavourites/${userId}`, favourites)
}
