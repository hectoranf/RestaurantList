import Head from "next/head"
import Link from "next/link"
import Layout from "../../../components/layout"
import {
  getAllRestaurantsIds,
  getOneRestaurant,
  updateRestaurant,
} from "../../../lib/restaurants"
import { uploadImage } from "../../../lib/files"
import React, { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

export default function editRestaurantForm({ restaurantInfo }) {
  const [state, setState] = useState({
    name: restaurantInfo.name,
    neighborhood: restaurantInfo.neighborhood,
    address: restaurantInfo.address,
    cuisine_type: restaurantInfo.cuisine_type,
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateRestaurant(restaurantInfo._id, state)
      .then(() => router.push(`/restaurant/${restaurantInfo._id}`))
      .catch((err) => console.log(err))
  }

  return (
    <Layout>
      <Head>
        <title>Edit {restaurantInfo.name}</title>
      </Head>
      <h1>Edit {restaurantInfo.name}</h1>
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
            value={state.neighborhood}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Address: </label>
          <input
            className="input"
            name="address"
            value={state.address}
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
export async function getStaticPaths() {
  const paths = await getAllRestaurantsIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getServerSideProps({ params }) {
  return await getOneRestaurant(params.id).then((res) => {
    return {
      props: {
        restaurantInfo: res.data,
      },
    }
  })
}
