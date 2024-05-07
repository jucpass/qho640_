// pages/cart.js
import React from 'react';
import CartDisplay from '../app/checkout/cartCards';

const Cart = () => {
    return (
      <section className="section is-medium">
      <h1 className="title has-text-centered">Basket</h1>
    <CartDisplay />
  </section>
    )
  };
  
  export default Cart;
