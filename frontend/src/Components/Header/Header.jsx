import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial login state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for storage changes
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('storage')); // Trigger global update
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="header-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a href="#products" onClick={() => setMenu("products")} className={menu === "products" ? "active" : ""}>
          Products
        </a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>
          Contact us
        </a>
      </ul>
      <div className="header-right">
        <Link to="/cart">
          <img src={assets.basket_icon} alt="Cart" className="icon" />
        </Link>
        {isLoggedIn ? (
          <button onClick={logout} className="logout-button">
            Log Out
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)} className="signin-button">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;