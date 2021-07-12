import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/layout"
import { createRestaurant } from "../../lib/restaurants"
import { uploadImage } from "../../lib/files"
import React, { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

export default function newRestaurantForm() {
  const [state, setState] = useState({
    name: "",
    neighborhood: "",
    address: "",
    image: "",
    cuisine_type: "Other",
  })

  const [uploading, setUpload] = useState(false)

  const router = useRouter()

  const createNewRestaurant = async (data) => {
    await axios
      .post(`http://localhost:5000/api/restaurants/`, data)
      .then((res) => router.push("/"))
      .catch((err) => console.log(err))
  }

  const handleFileUpload = async (e) => {
    setUpload(true)
    const uploadData = new FormData()
    uploadData.append("imageUrl", e.target.files[0])
    // this.setState({ uploadingActive: true })
    await uploadImage(uploadData)
      .then((res) => {
        setState({ ...state, image: res.data.secure_url })
        setUpload(false)
      })
      .catch((err) => console.log(err))
  }

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // createRestaurant(state)
    if (!uploading) {
      createRestaurant(state)
        .then((res) => router.push("/"))
        .catch((err) => console.log(err))
    }
  }

  return (
    <Layout>
      <Head>
        <title>New restaurant</title>
      </Head>
      <h1>New restaurant</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Restaurant Name: </label>
          <input
            className="input"
            name="name"
            value={state.name}
            type="text"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Neighbourhood: </label>
          <input
            className="input"
            name="neighborhood"
            type="text"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address: </label>
          <input
            className="input"
            name="address"
            type="text"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cuisine Type: </label>
          <select
            className="input"
            name="cuisine_type"
            value={state.cuisine_type}
            onChange={handleInputChange}
          >
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="Pizza">Pizza</option>
            <option value="Mexican">Mexican</option>
            <option value="Italian">Italian</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image: </label>
          <input
            className="input"
            name="image"
            type="file"
            onChange={handleFileUpload}
            required
          />
        </div>
        <div>
          <input className="button" type="submit" />
        </div>
        <Link href="/">
          <a className="green bold back-to-list">
            ← Back to the restaurant list
          </a>
        </Link>
      </form>
    </Layout>
  )
}
