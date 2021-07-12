import axios from "axios"

const handler = axios.create({
  baseURL: `https://restaurant-list-api.herokuapp.com/api/files`,
  withCredentials: true,
})

export function uploadImage(imageForm) {
  return handler.post("/upload", imageForm)
}
