import { useSession, signIn, signOut } from "next-auth/client"
import ProductListing from "../components/listing"
import Head from 'next/head'
import Image from 'next/image'


export default function Index({products, category}) {
  const [ session, loading ] = useSession()

  const head = (
    <Head>
      <title>{category.page_title}</title>
      <meta name="description" content={category.meta_description}/>
    </Head>
  )

  console.log(category)

  if (loading) {
    return (
      <>
      </>
    )
  }

  if (!session) {
    return (
      <>
        {head}
        <div className="flex">
          <div className="mr-5">
            <Image src={category.image_url} width="197" height="50"/>
          </div>
          <div className="text-7xl">
            <h1>{category.name}</h1>
          </div>
        </div>
        <div>
          <div dangerouslySetInnerHTML={{__html: category.description}}/>
        </div>
      </>
    )
  }

  return (
    <>
      {session && (
        <>
          {head}
          <div className="flex">
            <div className="mr-5">
              <Image src={category.image_url} width="100" height="142"/>
            </div>
            <div className="text-7xl">
              <h1>{category.name}</h1>
            </div>
          </div>
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
  
    const catUrl = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/categories/${process.env.CATEGORY_ID}`

    const catResp = await fetch(catUrl, {headers})
    const category = await catResp.json()
    

  return {
    props: {
      products: data,
      category: category.data
    }
  }
}
