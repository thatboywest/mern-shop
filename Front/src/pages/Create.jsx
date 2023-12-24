import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Create.css';

function Create() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    id_num: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setMessage('Successfully registered. Log in to start shopping');
        setFormData({
          name: '',
          email: '',
          phone: '',
          id_num: '',
          password: '',
        });
      } else {
        const error = await response.json();
        setErrorAlert(error.message);
        console.error('Error:', error);
      }
    } catch (error) {
      setErrorAlert('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  const handleAlertClose = () => {
    setErrorAlert(null);
  };

  return (
    <>
      <div className="fom">
        <form onSubmit={handleSubmit}>
          <center><h1>SIGN UP</h1></center>

          <input placeholder="Name" type="text" name="name" id="name" value={formData.name} onChange={handleChange} required />

          <input placeholder="Email" type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />

          <input placeholder="phone" type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required />
          <input placeholder="Id number" type="number" inputMode="numeric" name="id_num" id="id_num" value={formData.id_num} onChange={handleChange} required />

          <input placeholder="password" type="password" name="password" id="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">Sign Up</button>

          {errorAlert && (
            <div className="error-alert">
              <p>{errorAlert}</p>
              <button onClick={handleAlertClose}>Close</button>
            </div>
          )}

          <p>{message}</p>
          <button className='btn'><Link to="/login">Go to Login</Link></button>
        </form>
      </div>
    </>
  );
}

export default Create;
