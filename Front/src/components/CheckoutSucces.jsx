// CheckoutSuccess.js
import React from 'react';
import './CheckoutSuccess.css';

function CheckoutSuccess() {
  return (
    <div className="checkout-success-container">
      <div className="checkout-success-content">
        <center>
          <h2>CHECKOUT SUCCESS</h2>
        </center>
        <p>Thank you for your purchase! Your order has been successfully processed.</p>
        <p>An email with the order details has been sent to your registered email address.</p>
        <p>Your items will be shipped to you shortly. If you have any questions, please contact our customer support.</p>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
