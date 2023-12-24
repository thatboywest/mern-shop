// Import necessary modules and dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './login.css';

function Login() {
  // State for form data and error message
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // Auth context for handling login
  const { login, isAuthenticated } = useAuth();

  // React Router hook for navigation
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful login
        const { user } = await response.json();
        login(user); // Assuming login updates your authentication context
        setMessage('Login successful');
        navigate('/'); // Redirect to home page or desired destination
      } else {
        // Handle authentication error here
        const { error } = await response.json();
        console.error('Authentication error:', error);
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  // Redirect to home page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <center><h1>LOG IN</h1></center>
        <div className="inputGroup">
        <input
          placeholder='Email'
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder='Password'
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        </div>
        <button type="submit">Login</button>
        <button className='btn'><Link to="/Create">Sign up</Link></button>
        <center><p>{message}</p></center>
      </form>
    </div>
  );
}

export default Login;
