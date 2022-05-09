import React, { useState, useEffect } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import client, { urlFor } from "../../lib/client";

function ProductDetails({ product, products }) {
  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0);
  const { qty, incQty, decQty, addOnCart, setQty, setShowCart } =
    useStateContext();

  const handleBuyNow = () => {
    addOnCart(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((img, i) => {
              return (
                <img
                  src={urlFor(img)}
                  key={i}
                  className={
                    i == index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => addOnCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((product) => {
              return <Product key={product._id} productDetails={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  let query = `*[_type=='product']{
        slug{
            current
        }
    }`;
  const products = await client.fetch(query);
  const paths = products?.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(productQuery);

  const productsQuery = `*[_type=='product']`;
  const products = await client.fetch(productsQuery);
  return {
    props: {
      product,
      products,
    },
  };
}

export default ProductDetails;
