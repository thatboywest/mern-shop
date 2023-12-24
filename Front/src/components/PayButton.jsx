import React, { useState } from "react";
import axios from "axios";

function PayButton({ cartItems }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/stripe/create-checkout-session`,
        {
          cartItems,
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => handleCheckout()} disabled={loading}>
        {loading ? "Processing..." : "Checkout"}
      </button>
    </>
  );
}

export default PayButton;
