// pages/products.js
import React, {useState, useEffect} from "react";
import ProductCards from "../app/products/productsCards";
import { db } from "../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const Products = () => {

  const [products, setProducts] = useState([]); // State to store products
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term

  // Function to fetch products from the database
  useEffect(() => {
      const fetchProducts = async () => { // Fetch products from the database
          const querySnapshot = await getDocs(collection(db, "productsCategories")); // Get all documents from the collection
          const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to an array
          setProducts(productsArray); // Set the products state
      };

      fetchProducts(); // Call the fetchProducts function
  }, []);

  const refreshProducts = async () => { // Refresh products
      const querySnapshot = await getDocs(collection(db, "productsCategories")); // Get all documents from the collection
      const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to an array
      setProducts(productsArray); // Set the products state
  };

  // Function to handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Set the search term
  };

  // Function to filter products
  const filteredProducts = products.filter(product => // Filter products
    product.Model.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Filter by model
    product.Make.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by make
  );

  return (
    <section className="section is-medium">
      <h1 className="title has-text-centered">Products</h1>
      <label>
      <h2 className="subtitle"><FontAwesomeIcon icon={faMagnifyingGlass} /> Search:</h2>
      <input
        className="input"
        type="text"
        placeholder="Search by Model or Make"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      </label>
      <div className='block'></div>
      <ProductCards products={filteredProducts} refreshProducts={refreshProducts} />
    </section>
  )
};
  export default Products;
  