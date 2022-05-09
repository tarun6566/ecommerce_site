import React from 'react'
import { urlFor } from '../lib/client'
import Link from 'next/link'

export default function Product({productDetails}) {
  return (
    <div>
      <Link href={`/product/${productDetails.slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(productDetails.image && productDetails.image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{productDetails.name}</p>
          <p className="product-price">Rs {productDetails.price}</p>
        </div>
      </Link>
    </div>
  );
}
