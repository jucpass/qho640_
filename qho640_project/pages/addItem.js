// pages/products.js
import React from "react";
import AddItemPage from "../app/products/addItemForm";
import ProductCards from "../app/products/productsCards";

const AddProducts = () => {
    return (
      <section className="section is-medium">
      <h1 className="title has-text-centered">Product Management</h1>
    <AddItemPage />
    <h1 className="title has-text-centered">Edit and Delete products</h1>
    <ProductCards />
  </section>
    )
  };
  
  export default AddProducts;