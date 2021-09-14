import { useSession, signIn, signOut } from "next-auth/client"
import ProductListing from "../components/listing"

export default function Index({products}) {
  const [ session, loading ] = useSession()

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {session && (
        <>
          <ProductListing products={products}/>
        </>
      )}
    </>
  );
}

export async function getStaticProps(context){

  const STORE_ID = process.env.STORE_ID

  const headers = {
    "X-Auth-Token": process.env.AUTH_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
    }

  const url = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/products?categories:in=${process.env.CATEGORY_ID}&include=primary_image`

  const resp = await fetch(url, {headers})
  const { data } = await resp.json()

  return {
    props: {
      products: data
    }
  }
}
