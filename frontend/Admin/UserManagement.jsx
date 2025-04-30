import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedPreferences, setUpdatedPreferences] = useState({
    cheeseLover: false,
    cuisine: '',
    spicyLevel: ''
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/users');
      if (res.data && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/users/users/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Check console for details.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedPreferences({
      cheeseLover: user.preferences?.cheeseLover || false,
      cuisine: user.preferences?.cuisine || '',
      spicyLevel: user.preferences?.spicyLevel || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/users/${editingUser._id}`, {
        preferences: updatedPreferences
      });
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user. Check console for details.");
    }
  };

  const handleCloseEdit = () => {
    setEditingUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="user-management">
      <h1>User Management</h1>

      {showPopup && <div className="popup">User deleted successfully!</div>}

      {editingUser ? (
        <div className="edit-form-container">
          <div className="edit-form-header">
            <h2>Edit User Preferences</h2>
            <button onClick={handleCloseEdit} className="close-edit-btn">
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleUpdate} className="edit-form">
            <div className="form-group">
              <label>Email:</label>
              <input type="text" value={editingUser.email} disabled />
            </div>
            <div className="form-group">
              <label>Cheese Lover:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="cheeseLover"
                    checked={updatedPreferences.cheeseLover === true}
                    onChange={() => setUpdatedPreferences({...updatedPreferences, cheeseLover: true})}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="cheeseLover"
                    checked={updatedPreferences.cheeseLover === false}
                    onChange={() => setUpdatedPreferences({...updatedPreferences, cheeseLover: false})}
                  />
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Favorite Cuisine:</label>
              <select
                value={updatedPreferences.cuisine}
                onChange={(e) => setUpdatedPreferences({...updatedPreferences, cuisine: e.target.value})}
              >
                <option value="">Select Cuisine</option>
                <option value="Thai">Thai</option>
                <option value="Chinese">Chinese</option>
                <option value="Italian">Italian</option>
                <option value="Indian">Indian</option>
              </select>
            </div>
            <div className="form-group">
              <label>Spicy Level:</label>
              <select
                value={updatedPreferences.spicyLevel}
                onChange={(e) => setUpdatedPreferences({...updatedPreferences, spicyLevel: e.target.value})}
              >
                <option value="">Select Level</option>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Spicy">Spicy</option>
              </select>
            </div>
            <button type="submit" className="update-btn">Update Preferences</button>
          </form>
        </div>
      ) : (
        <>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Cheese Lover</th>
                  <th>Favorite Cuisine</th>
                  <th>Spicy Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>••••••••</td>
                    <td>{user.preferences?.cheeseLover ? "Yes" : "No"}</td>
                    <td>{user.preferences?.cuisine || "N/A"}</td>
                    <td>{user.preferences?.spicyLevel || "N/A"}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(user._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => handleEdit(user)} 
                        className="edit-btn"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default UserManagement;