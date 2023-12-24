// Cart.js
import React from 'react';
import { useCart } from '../context/Cart_context';
import './Cart.css';
import PayButton from '../components/PayButton';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, calculateTotalPrice } = useCart();

  const handleUpdateQuantity = (item, newQuantity) => {
    updateQuantity({ ...item, quantity: newQuantity });
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.cartItemId}>
                  <td>
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                    </div>
                  </td>
                  <td>
                    <div className="item-details">
                      <p className="item-price">${item.price}</p>
                    </div>
                  </td>
                  <td>
                    <div className="quantity-buttons">
                      <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-price">Total Price: ${calculateTotalPrice()}</p>
          <PayButton cartItems={cartItems}></PayButton>
        </>
      )}
    </div>
  );
}

export default Cart;
