import Head from "next/head"
import Layout from "../components/layout"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { getAllRestaurants, getAllRestaurantsIds } from "../lib/restaurants"
import Link from "next/link"

const Home = ({ data }) => {
  return (
    <Layout>
      <div>
        <h1 className={styles.title}>
          the <span className="green">amazing</span>
          <br></br>restaurants<br></br>
          <span className="green">amazing</span> list
        </h1>
        <section className={styles.restaurantsContainer}>
          {data.map((elm) => (
            <Link href={`/restaurant/${elm._id}`}>
              <article className={styles.restaurantItem} key={elm._id}>
                <figure className={styles.restaurantImg}>
                  <Image
                    priority
                    src={elm.image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    alt={elm.name}
                  />
                </figure>
                <a>{elm.name}</a>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getAllRestaurants()
    .then((res) => res.data)
    .catch((err) => console.log(err))
  const paths = await getAllRestaurantsIds()
  console.log(paths)
  return {
    props: {
      data,
    },
  }
}

export default Home
