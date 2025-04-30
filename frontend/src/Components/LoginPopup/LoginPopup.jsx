import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
    preferences: {
      cheeseLover: false,
      cuisine: "",
      spicyLevel: ""
    }
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (field, value) => {
    setData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
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
    if (currState === "Sign Up" && (!data.preferences.cuisine || !data.preferences.spicyLevel)) {
      setErrorMessage("Please select all preferences.");
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
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event('storage')); // ADDED THIS LINE
        setShowLogin(false);
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
      const response = await axios.post("http://localhost:5000/api/users/register-user", {
        email: data.email,
        password: data.password,
        preferences: data.preferences
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event('storage')); // ADDED THIS LINE
        setShowLogin(false);
      } else {
        setErrorMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 
        "Registration error. Check your preferences or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form
        onSubmit={currState === "Login" ? onLogin : onSignUp}
        className="login-popup-container"
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src={assets.cross_icon} 
            alt="Close" 
          />
        </div>

        <div className="login-popup-inputs">
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

          {currState === "Sign Up" && (
            <div className="preferences-container">
              <div className="preference-group">
                <label>Cheese Lover?</label>
                <div className="radio-options-horizontal">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="cheeseLover"
                      checked={data.preferences.cheeseLover === true}
                      onChange={() => handlePreferenceChange("cheeseLover", true)}
                    />
                    Yes
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="cheeseLover"
                      checked={data.preferences.cheeseLover === false}
                      onChange={() => handlePreferenceChange("cheeseLover", false)}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="preference-group">
                <label>Favorite Cuisine:</label>
                {["Thai", "Chinese", "Italian", "Indian"].map((cuisine) => (
                  <label key={cuisine} className="radio-option">
                    <input
                      type="radio"
                      name="cuisine"
                      value={cuisine}
                      checked={data.preferences.cuisine === cuisine}
                      onChange={() => handlePreferenceChange("cuisine", cuisine)}
                      required
                    />
                    {cuisine}
                  </label>
                ))}
              </div>

              <div className="preference-group">
                <label>Spicy Level:</label>
                {["Mild", "Medium", "Spicy"].map((level) => (
                  <label key={level} className="radio-option">
                    <input
                      type="radio"
                      name="spicyLevel"
                      value={level}
                      checked={data.preferences.spicyLevel === level}
                      onChange={() => handlePreferenceChange("spicyLevel", level)}
                      required
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : currState === "Login" ? "Login" : "Sign Up"}
        </button>

        <div className="login-popup-condition">
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

export default LoginPopup;