
import './AddProduct.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Rice',
    productPrice: ''
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          image: 'Only JPEG, PNG, or GIF images are allowed'
        });
        e.target.value = ''; // Clear the file input
        setImage(null);
      } else {
        setErrors({ ...errors, image: '' });
        setImage(file);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!image) {
      newErrors.image = 'Product image is required';
    }
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.productPrice || isNaN(formData.productPrice)) {
      newErrors.productPrice = 'Valid price is required';
    } else if (formData.productPrice <= 0) {
      newErrors.productPrice = 'Price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append('productImage', image);
    data.append('productName', formData.productName);
    data.append('category', formData.category);
    data.append('productPrice', formData.productPrice);

    try {
      await axios.post('http://localhost:5000/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccessMessage('Product added successfully!');
      setTimeout(() => {
        navigate('/productDetails');
      }, 1500);
      
      // Reset form
      setFormData({
        productName: '',
        category: 'Rice',
        productPrice: ''
      });
      setImage(null);
    } catch (err) {
      console.error('Error adding product:', err);
      setErrors({
        ...errors,
        submit: err.response?.data?.error || 'Failed to add product'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Image</label>
          <input 
            type="file" 
            onChange={handleImageChange} 
            accept="image/jpeg, image/png, image/gif"
            required
          />
          {errors.image && (
            <div className="error-message">{errors.image}</div>
          )}
        </div>
        
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
          {errors.productName && (
            <div className="error-message">{errors.productName}</div>
          )}
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select 
            name="category" 
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Rice">Rice</option>
            <option value="Noodles">Noodles</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Price (Rs)</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
          {errors.productPrice && (
            <div className="error-message">{errors.productPrice}</div>
          )}
        </div>
        
        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}
        
        <button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;