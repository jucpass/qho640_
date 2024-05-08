// pages/products.js
import React, {useState, useEffect} from "react";
import ProductCards from "../app/products/productsCards";
import { db } from "../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
      const fetchProducts = async () => {
          const querySnapshot = await getDocs(collection(db, "productsCategories"));
          const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setProducts(productsArray);
      };

      fetchProducts();
  }, []);

  const refreshProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "productsCategories"));
      const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsArray);
  };

    return (
      <section className="section is-medium">
      <h1 className="title">Products</h1>
    <ProductCards products={products} refreshProducts={refreshProducts} />
  </section>
    )
  };
  
  export default Products;
  