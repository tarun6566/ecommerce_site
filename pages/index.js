import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import client from "../lib/client";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speaker of many variantions</p>
      </div>
      <div className="products-container">
        {products?.map((product) => {
          return <Product productDetails={product} key={product._id} />;
        })}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export async function getServerSideProps() {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);
  const bannerQuery = `*[_type=="banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
}
