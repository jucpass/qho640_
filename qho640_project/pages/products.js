// pages/products.js
import React from "react";
import ProductCards from "../app/products/productsCards";

const Products = () => {
    return (
      <section className="section is-medium">
      <h1 className="title">Products</h1>
    <p>Render products here</p>
    <ProductCards />
  </section>
    )
  };
  
  export default Products;
  