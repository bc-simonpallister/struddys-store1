
const STORE_ID = process.env.STORE_ID
const ID = process.env.CATEGORY_ID

const headers = {
  "X-Auth-Token": process.env.AUTH_TOKEN,
  "Accept": "application/json",
  "Content-type": "application/json"
  }

export default function Product({data}) {
  return (
    <div>
      
    </div>
  );
}

export async function getStaticProps({params}){

  const { id } = params

  const url = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/products/${id}?include=primary_image,variants`

  const resp = await fetch(url, {headers})
  const { data } = await resp.json()

  console.log(data)

  return {
    props:{
      data
    }
  }
}

export const getStaticPaths = async () => {

  const url = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/products?categories:in=${ID}&include=primary_image`

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
