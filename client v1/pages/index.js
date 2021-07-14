import Head from "next/head"
import Router from "next/router"
import Layout from "../components/layout"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { getAllRestaurants, deleteRestaurant } from "../lib/restaurants"
import Link from "next/link"

const Home = ({ data }) => {
  const deleteClick = async (id) => {
    deleteRestaurant(id)
      .then((res) => Router.reload(window.location.pathname))
      .catch((err) => console.log(err))
  }
  return (
    <Layout>
      <div>
        <h1 className={styles.title}>
          the <span className="green amazing">amazing</span>
          <br className={styles.invisible} />
          restaurants
          <br />
          <span className="green amazing">amazing</span> list
        </h1>
        <section className={styles.restaurantsContainer}>
          <Link href={`/restaurant/new`}>
            <article className={styles.restaurantItem}>
              <figure className={styles.addButton}>
                <Image
                  priority
                  src="/images/add.svg"
                  height={64}
                  width={64}
                  alt="add icon"
                />
              </figure>
              <h4 className={styles.addRestaurant}>Create new restaurant</h4>
            </article>
          </Link>
          {data.map((elm) => (
            <article className={styles.restaurantItem} key={elm._id}>
              <Link href={`/restaurant/${elm._id}`}>
                <figure className={styles.restaurantImg}>
                  <div className={styles.details}>More details</div>
                  <Image
                    priority
                    src={elm.image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    alt={elm.name}
                    className={styles.greyscale}
                  />
                </figure>
              </Link>
              <article className={styles.restaurantInfo}>
                <h4>{elm.name}</h4>
                <div className="white">
                  <Image
                    priority
                    src="/images/location.svg"
                    height={18}
                    width={20}
                    alt="add icon"
                  />
                  {elm.neighborhood}
                </div>
              </article>
              <div>
                <Link href={`/restaurant/edit/${elm._id}`}>
                  <a className={styles.button}>Edit</a>
                </Link>
                <button
                  onClick={() => deleteClick(elm._id)}
                  className={styles.button}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await getAllRestaurants()
    .then((res) => res.data)
    .catch((err) => console.log(err))
  return {
    props: {
      data,
    },
  }
}

export default Home
