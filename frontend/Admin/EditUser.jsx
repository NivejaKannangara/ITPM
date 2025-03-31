import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditUser.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '••••••••',
    preferences: {
      cheeseLover: false,
      cuisine: '',
      spicyLevel: ''
    }
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/users/${id}`);
        setUser(res.data);
        setFormData({
          email: res.data.email,
          password: '••••••••',
          preferences: res.data.preferences || { // Fallback if preferences are null
            cheeseLover: false,
            cuisine: '',
            spicyLevel: ''
          }
        });
      } catch (err) {
        setError("Failed to load user data.");
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handlePreferenceChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/users/${id}`,
        { preferences: formData.preferences }
      );
      
      if (response.status === 200) {
        navigate('/usermanagement'); // Redirect on success
      } else {
        setError("Failed to save changes.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save changes.");
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="edit-user-form">
      <h2>Edit User: {user.email}</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Email (read-only) */}
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={formData.email} 
            readOnly 
            className="readonly-input"
          />
        </div>

        {/* Password (read-only) */}
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="text" 
            value={formData.password} 
            readOnly 
            className="readonly-input"
          />
        </div>

        {/* Cheese Lover */}
        <div className="preference-group">
          <label>Cheese Lover?</label>
          <div className="radio-options-horizontal">
            <label className="radio-option">
              <input
                type="radio"
                name="cheeseLover"
                checked={formData.preferences.cheeseLover === true}
                onChange={() => handlePreferenceChange("cheeseLover", true)}
              />
              Yes
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="cheeseLover"
                checked={formData.preferences.cheeseLover === false}
                onChange={() => handlePreferenceChange("cheeseLover", false)}
              />
              No
            </label>
          </div>
        </div>

        {/* Cuisine */}
        <div className="preference-group">
          <label>Favorite Cuisine:</label>
          {["Thai", "Chinese", "Italian", "Indian"].map((cuisine) => (
            <label key={cuisine} className="radio-option">
              <input
                type="radio"
                name="cuisine"
                value={cuisine}
                checked={formData.preferences.cuisine === cuisine}
                onChange={() => handlePreferenceChange("cuisine", cuisine)}
                required
              />
              {cuisine}
            </label>
          ))}
        </div>

        {/* Spicy Level */}
        <div className="preference-group">
          <label>Spicy Level:</label>
          {["Mild", "Medium", "Spicy"].map((level) => (
            <label key={level} className="radio-option">
              <input
                type="radio"
                name="spicyLevel"
                value={level}
                checked={formData.preferences.spicyLevel === level}
                onChange={() => handlePreferenceChange("spicyLevel", level)}
                required
              />
              {level}
            </label>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditUser;