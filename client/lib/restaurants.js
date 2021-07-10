import axios from "axios"

const handler = axios.create({
  baseURL: `${process.env.LOCAL_API_URL}/restaurants`,
  withCredentials: true,
})

export function getAllRestaurants() {
  return handler.get("/")
}

export function getOneRestaurant(id) {
  return handler.get(`/${id}`)
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
