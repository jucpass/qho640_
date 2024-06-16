// pages/products.js
import React, {useState, useEffect} from "react";
import AddItemPage from "../app/products/addItemForm";
import ProductCards from "../app/products/productsCards";
import useProtectRoute from "../app/utils/useProtectRoute";
import { db } from "../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AddProducts = () => {
  const { role } = useProtectRoute('admin'); // Get the current user role
  const [products, setProducts] = useState([]); // State to store products

  // Function to fetch products from the database
  useEffect(() => {
      const fetchProducts = async () => { // Fetch products from the database
          const querySnapshot = await getDocs(collection(db, "productsCategories")); // Get all documents from the collection
          const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to an array
          setProducts(productsArray); // Set the products state
      };

      fetchProducts(); // Call the fetchProducts function
  }, []);

  // Function to refresh products
  const refreshProducts = async () => { // Refresh products
      const querySnapshot = await getDocs(collection(db, "productsCategories")); // Get all documents from the collection
      const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to an array
      setProducts(productsArray); // Set the products state
  };

  // Return the product management page
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