export default async (req,res) => {

  const {method, query: {id}} = req

  if(method!='GET'){
    res.status(405).json({"status":"Method not allowed"})
    return
  }

  const STORE_ID = process.env.STORE_ID

  const headers = {
    "X-Auth-Token": process.env.AUTH_TOKEN,
    "Accept": "application/json",
    "Content-type": "application/json"
    }

  const url = `https://api.bigcommerce.com/stores/${process.env.STORE_ID}/v3/catalog/products?categories:in=${id}&include=primary_image`

  const resp = await fetch(url, {headers})
  const data = await resp.json()

  res.status(200).json(data)

}