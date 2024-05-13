// pages/products.js
import React, {useState, useEffect} from "react";
import ProductCards from "../app/products/productsCards";
import { db } from "../app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.Model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.Make.toLowerCase().includes(searchTerm.toLowerCase())
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
  