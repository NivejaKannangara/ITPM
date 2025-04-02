import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees/employees');
      if (res.data && Array.isArray(res.data)) {
        setEmployees(res.data);
      } else {
        setEmployees([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to load employees. Please try again.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/employees/employees/${id}`);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError("Failed to delete employee. Check console for details.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>

      {showPopup && <div className="popup">Employee deleted successfully!</div>}

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id}>
                <td>{employee.email}</td>
                <td>••••••••</td>
                <td>
                  <button 
                    onClick={() => handleDelete(employee._id)}
                    className="delete-btn"
                  >
                    Delete
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

export default EmployeeManagement;