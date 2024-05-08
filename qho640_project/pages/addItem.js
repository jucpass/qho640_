// pages/products.js
import React, {useState, useEffect} from "react";
import AddItemPage from "../app/products/addItemForm";
import ProductCards from "../app/products/productsCards";
import useProtectRoute from "../app/utils/useProtectRoute";
import { db } from "../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AddProducts = () => {
  const { role } = useProtectRoute('admin');
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

      role === 'admin' ? (
      <section className="section is-medium">
      <h1 className="title has-text-centered">Product Management</h1>
    <AddItemPage refreshProducts={refreshProducts} />
    <h1 className="title has-text-centered">Edit and Delete products</h1>
    <ProductCards products={products} refreshProducts={refreshProducts} />
  </section>
      ) : (
          <div>
              <h1>Access Denied</h1>
          </div>
      ) 
    )
  };
  
  export default AddProducts;