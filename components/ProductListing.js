import Image from 'next/image'
import Link from 'next/link'
export default function ProductListing({products}) {
  return (
    <div>
      <h1>Products</h1>
      <div className="flex flex-row flex-wrap w-full items-center">
        {products.map(product=>(
          <Link href={`/products/${product.id}`}>
            <a>
              <div className="flex-none p-5 m-3 w-40 h-72 border-2 rounded-md content-center text-center" key={product.id}>
                <Image src={product.primary_image.url_thumbnail} width="150" height="150" />
                <div className="text-sm">
                  {product.name}
                </div>
                <div className="text-sm font-bold">
                  ${product.calculated_price.toFixed(2)}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}