import axios from "axios"

const handler = axios.create({
  // baseURL: `${process.env.REACT_APP_API_URL}/restaurants`,
  baseURL: `http://localhost:5000/api/restaurants`,
  withCredentials: true,
})

export function getAllRestaurants() {
  return handler.get("/")
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

export async function getAllRestaurantsIds() {
  return handler
    .get("/")
    .then((res) => {
      return res.data.map((elm) => {
        return {
          params: {
            id: elm._id,
          },
        }
      })
    })
    .catch((err) => console.log(err))
}
