import { getAllRestaurantsIds, getOneRestaurant } from "../../lib/restaurants"
import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/layout"
import Image from "next/image"
import styles from "../../styles/details.module.css"

export default function RestaurantDetails({ details }) {
  return (
    <Layout>
      <Head>
        <title>{details.name}</title>
      </Head>
      <h1 className={styles.title}>{details.name}</h1>
      <section className={styles.detailsContainer}>
        <figure className={styles.restaurantImg}>
          <Image
            priority
            src={details.image}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={details.name}
          />
        </figure>
        <article className={styles.info}>
          <p>{details.address}</p>
          <p>({details.neighborhood})</p>
          <br />
          <p>
            <span className="bold">
              <span className="green">amazing </span>Cuisine Type:{" "}
            </span>

            {details.cuisine_type}
          </p>
          <br />
          <p className="bold">Operating Hours:</p>
          <ul>
            {Object.keys(details.operating_hours).map((key) => {
              return <li>{`${key} : ${details.operating_hours[key]}`}</li>
            })}
          </ul>
          <Link href="/">
            <a className="green bold back-to-list">
              ← Back to the restaurant list
            </a>
          </Link>
        </article>
      </section>
      <br />
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

export async function getStaticProps({ params }) {
  return await getOneRestaurant(params.id).then((res) => {
    return {
      props: {
        details: res.data,
      },
    }
  })
}
