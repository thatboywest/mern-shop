import React, { useState } from 'react';
import { IoIosMore, IoMdCloseCircle } from 'react-icons/io';
import { useCart } from '../context/Cart_context';
import { useAuth } from '../context/AuthContext';
import Alert from './Alert';
import './products.css';

function Product(props) {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { name, brand, desc, price, Image } = props.data;

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowAlert(true);
      return;
    }

    const item = { name, brand, price };
    addToCart(item);
    setShowAlert(true); // Display a generic message for now
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className={`card ${expanded ? 'card-expanded' : ''}`}>
        <img src={Image} alt="image" />
        <div className="disc">
          <p>NAME: {name}</p>
          <p>BRAND: {brand}</p>
          <p>PRICE: {price}</p>
          <div className={`more ${expanded ? 'more-expanded' : ''}`}>
            <p>DESCRIPTION: {desc}</p>
          </div>
          <div className="btns">
            <button className="btn" onClick={handleAddToCart}>
              Add to cart
            </button>
            <button className='btn-expand' onClick={handleToggleExpand}>
              {expanded ? <IoMdCloseCircle  /> : <IoIosMore />}
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <Alert
          message={isLoggedIn ?` ${name}' added to cart!'` : 'Please log in first.'}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
}

export default Product;

