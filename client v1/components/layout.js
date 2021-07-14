import Head from "next/head"

export const siteTitle = "The Restaurant List"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Discover your new favourite restaurants"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
    </>
  )
}
