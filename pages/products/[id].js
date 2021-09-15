import Image from 'next/image'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/client"

const STORE_ID = process.env.STORE_ID
const ID = process.env.CATEGORY_ID

const headers = {
  "X-Auth-Token": process.env.AUTH_TOKEN,
  "Accept": "application/json",
  "Content-type": "application/json"
  }

export default function Product({data, options}) {

  const [ session, loading ] = useSession()
  const router = useRouter()
  
  if (loading) {
    return (<></>)
  }

  if (!session && typeof window !== 'undefined'){
    router.push('/') 
    return null 
  }

  console.log(session)

  return (
    <div>
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="text-3xl">
        <h1>{data.name}</h1>
      </div>
      <div className="flex my-5">
        <div className="mr-5 ">
          <Image src={data.primary_image.url_standard} width="400" height="400"/>
        </div>
        <div>
          <div className="text-4xl">
            ${data.calculated_price.toFixed(2)}
          </div>
          <div className="my-3">
            Size:
            <div className="flex flex-row my-2">
              {options[0].option_values.map(option=>(
                <div key={option.id} className="px-3 py-2 border-2 mr-2">{option.label}</div>
              ))}
            </div>
          </div>
          <div className="my-3">
            <button className="bg-black text-white p-4">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>    
  );
}

export async function getStaticProps({params}){

  const { id } = params

  const url = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/products/${id}?include=primary_image,variants`

  const resp = await fetch(url, {headers})
  const { data } = await resp.json()

  const optionsUrl = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/products/${id}/options`

  const optionsResp = await fetch(optionsUrl, {headers})
  const { data : options } = await optionsResp.json()

  return {
    props:{
      data,
      options
    }
  }
}

export const getStaticPaths = async () => {

  const url = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/products?categories:in=${ID}&include_fields=id`

  const resp = await fetch(url, {headers})
  const { data } = await resp.json()

  const paths = data.map((product) => ({
    params: { id: product.id.toString() },
  }))

  return {
    paths,
    fallback:false
  }
}
