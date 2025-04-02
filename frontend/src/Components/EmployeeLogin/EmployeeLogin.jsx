import React, { useState } from "react";
import "./EmployeeLogin.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const EmployeeLogin = ({ setShowEmployeeLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => /^(?=.*\d).{7,}$/.test(password);

  const areFieldsValid = () => {
    if (!data.email || !data.password) {
      setErrorMessage("Email and password are required.");
      return false;
    }
    if (!isValidEmail(data.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!isValidPassword(data.password)) {
      setErrorMessage("Password must be at least 7 characters and contain a number.");
      return false;
    }
    return true;
  };

  const onLogin = async (event) => {
    event.preventDefault();
    if (!areFieldsValid()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/employees/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setShowEmployeeLogin(false);
      } else {
        setErrorMessage(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    if (!areFieldsValid()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/employees/register-employee", {
        email: data.email,
        password: data.password
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setShowEmployeeLogin(false);
      } else {
        setErrorMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 
        "Registration error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-login">
      <form
        onSubmit={currState === "Login" ? onLogin : onSignUp}
        className="employee-login-container"
      >
        <div className="employee-login-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowEmployeeLogin(false)} 
            src={assets.cross_icon} 
            alt="Close" 
          />
        </div>

        <div className="employee-login-inputs">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : currState === "Login" ? "Login" : "Sign Up"}
        </button>

        <div className="employee-login-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and conditions</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")} className="link-text">
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")} className="link-text">
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default EmployeeLogin;