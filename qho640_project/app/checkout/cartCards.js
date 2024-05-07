
import React from "react";
import { useCart } from "../checkout/cartContext";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


function CartDisplay() {
    const { cart, total, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        router.push('/checkout');
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleIncrease = (id) => {
        increaseQuantity(id);
    };

    const handleDecrease = (id) => {
        decreaseQuantity(id);
    }


    return (
        <div className="columns">
            <div className="column"></div>
            <div className="column"> 
            <h1 className="title">Your Cart</h1>
            <div>
                {cart.map((item) => (
                    <div key={item.id} className="box">
                        <article className="media">
                        <div className="media-left">
                        <figure className="image is-64x64">
                            <Image 
                                src={item.Image}
                                alt={item.Model}
                                width={10}
                                height={20}
                                unoptimized={true} 
                            />
                        </figure>
                        </div>
                        <div className="media-content">
                        <div className="content">
                        <p className="is-size-3">{item.Model}</p>
                        <p className="is-italic">{item.Make}</p>
                         <p>£{item.Price}</p>
                        </div>
                        <p className="buttons">
                        <button className="button" onClick={() => handleIncrease(item.id)}>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon={faPlus} />
                        </span>
                        </button>
                        <button className="button is-static">
                        <span className="icon is-small">
                        {item.quantity}
                        </span>
                        </button>
                        <button className="button" onClick={() => handleDecrease(item.id)} disabled={item.quantity <= 1}>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon={faMinus} />
                        </span>
                        </button>
                        <button className="button" onClick={() => handleRemove(item.id)}>
                        <span className="icon is-small">
                        <FontAwesomeIcon icon={faTrash} />
                        </span>
                        </button>
                        </p>
                        </div>
                        </article>
                    </div>
                ))}
                {cart.length === 0 && <p>Your cart is empty.</p>}
            </div>
            <p className="title">Total: £{total.toFixed(2)}</p>
            <button className="button is-success" onClick={handleCheckout}>
                Proceed to Checkout
            </button>
            </div>
            <div className="column"></div>
        </div>
    );
}

export default CartDisplay;
