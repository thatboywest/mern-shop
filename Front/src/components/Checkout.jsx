import './Checkout.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const location = useLocation(); 

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const total = new URLSearchParams(location.search).get('totalPrice') || 0;

  const handlePayment = () => {
    if (paymentMethod === 'mpesa') {
      window.location.href = `/mpesa?amount=${total}`;
    } else if (paymentMethod === 'bank') {
      window.location.href = '/bank';
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <label>
          <input
            type="radio"
            value="mpesa"
            checked={paymentMethod === 'mpesa'}
            onChange={() => handlePaymentMethodChange('mpesa')}
          />
          Mpesa
        </label>
        <label>
          <input
            type="radio"
            value="bank"
            checked={paymentMethod === 'bank'}
            onChange={() => handlePaymentMethodChange('bank')}
          />
          Bank
        </label>
      </div>

      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
