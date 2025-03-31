import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // NEW CHANGE: Added error handling for empty responses
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/users');
      if (res.data && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]); // Ensure users is always an array
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again."); // NEW CHANGE: Clearer error
      setLoading(false);
    }
  };

  // NEW CHANGE: Added confirmation before delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/users/users/${id}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Check console for details."); // NEW CHANGE: Detailed error
    }
  };

  const handleEdit = (userId) => { 
    window.location.href = `/edit-user/${userId}`; // Change to your preferred routing
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error-text">{error}</p>; // NEW CHANGE: Added error class

  return (
    <div className="user-management">
      <h1>User Management</h1>

      {showPopup && <div className="popup">User deleted successfully!</div>}

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
                    className="delete-btn" // NEW CHANGE: Added class for styling
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => handleEdit(user._id)} 
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
    </div>
  );
};

export default UserManagement;
