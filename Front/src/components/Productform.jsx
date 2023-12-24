// ProductForm.js
import { useState } from 'react';
import axios from 'axios';
import './Productform.css';
import Alert from '../components/Alert';

const ProductForm = () => {
  const [productImg, setProductImg] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleProductUpload = (e) => {
    const file = e.target.files[0];
    TransFormFile(file);
  };

  const TransFormFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg('');
    }
  };

  const submitProduct = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/products', {
        name,
        brand,
        desc,
        price,
        image: formData.get('productImg'),
      });

      console.log('Product created successfully:', response.data);
      setShowAlert(true);

      setName('');
      setBrand('');
      setPrice('');
      setDesc('');
      setProductImg('');
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productImg', productImg);
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('desc', desc);

    await submitProduct(formData);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <h3>Create product</h3>
      <div className="admin">
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/" onChange={handleProductUpload} />
          <input
            type="text"
            required
            placeholder="item name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="brand"
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
        {productImg ? (
          <div className="prev">
            <img height={200} src={productImg} alt="preview" />
          </div>
        ) : (
          <p>preview </p>
        )}
      </div>
      {showAlert && <Alert message="Product created successfully" onClose={handleAlertClose} />}
    </>
  );
};

export default ProductForm;
