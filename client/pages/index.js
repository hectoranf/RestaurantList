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
            <Link href={`/restaurant/${elm._id}`} key={elm._id}>
              <article className={styles.restaurantItem}>
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
  return {
    props: {
      data,
    },
  }
}

export default Home
