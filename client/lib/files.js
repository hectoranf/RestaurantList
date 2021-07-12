import axios from "axios"

const handler = axios.create({
  baseURL: `http://localhost:5000/api/files`,
  withCredentials: true,
})

export function uploadImage(imageForm) {
  return handler.post("/upload", imageForm)
}
