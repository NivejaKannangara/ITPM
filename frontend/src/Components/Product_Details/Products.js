
import './Products.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  
//until this
  return (
    <div className="products-container">
      <h2>Our Menu</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img 
              src={`http://localhost:5000/uploads/${product.productImage}`} 
              alt={product.productName}
            />
            <h3>{product.productName}</h3>
            <p>Category: {product.category}</p>
            <p>Price: Rs. {product.productPrice}</p>
            <div className="product-actions">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

