import React from "react";
import { useSession, signIn, signOut } from "next-auth/client"
import Link from "next/link";
import ProductListing from "../components/ProductListing";


export default function Index({products}) {
  const [ session, loading ] = useSession()

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={signOut}>Sign out</button>
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
