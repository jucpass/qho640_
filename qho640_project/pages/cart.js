
import React, {useEffect} from 'react';
import CartDisplay from '../app/checkout/cartCards';
import { UserAuth } from '../app/auth/AuthContext'; 

const Cart = () => {
    const { user } = UserAuth();

    useEffect(() => {
      console.log("Current user in Cart:", user);
  }, [user]);


    return (
      <section className="section is-medium">
      <h1 className="title has-text-centered">Basket</h1>
    <CartDisplay user={user} />
  </section>
    )
  };
  
  export default Cart;
