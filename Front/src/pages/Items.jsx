import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import SearchInput from '../components/Search';
import './Items.css';

function ProductContainer() {
  const [productData, setProductData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();

      if (data && data.length > 0) {
        setProductData(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching product data:', error.message);
    }
  };

  const handleSearch = (text) => {
    const searchTextLower = text.toLowerCase();
    setSearchText(searchTextLower);

    // Filter products based on search text
    const filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTextLower)
    );

    setFilteredProducts(filtered);
  };

  return (
    <>
      <SearchInput onSearch={handleSearch} />

      <div className='items1'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </>
  );
}

export default ProductContainer;
