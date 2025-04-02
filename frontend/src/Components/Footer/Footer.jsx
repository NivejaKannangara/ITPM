import React, { useState } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = ({ setShowEmployeeLogin }) => {
  const [menu, setMenu] = useState("home");
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="FoodieGo Logo" />
          <p>
            FoodieGo is your go-to food delivery app, bringing freshly prepared 
            meals from top-rated restaurants straight to your door. We ensure 
            quality, speed, and satisfaction with every order.
          </p>
          <div className="footer-social-icons">
            <a href="mailto:rameshjanahan1@gmail.com">
              <img src={assets.inbox_icon} alt="Email" />
            </a>
            <a href="https://www.facebook.com/healthyfoodguide" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>EXPLORE</h2>
          <ul>
            <li 
              onClick={() => setMenu("home")} 
              className={menu === "home" ? "active" : ""}
            >
              Home
            </li>
            <li 
              onClick={() => setMenu("about")} 
              className={menu === "about" ? "active" : ""}
            >
              About Us
            </li>
            <li 
              onClick={() => setMenu("delivery")} 
              className={menu === "delivery" ? "active" : ""}
            >
              Delivery Info
            </li>
            <li 
              onClick={() => setMenu("terms")} 
              className={menu === "terms" ? "active" : ""}
            >
              Terms & Conditions
            </li>
            <li 
              onClick={() => setShowEmployeeLogin(true)}
              className={`${menu === "employee" ? "active" : ""} footer-employee-link`}
            >
              Employee
            </li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>CONTACT US</h2>
          <ul>
            <li>+91 9582292422</li>
            <li>support@foodiego.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        By using FoodieGo, you agree to our Terms of Service, Cookie Policy, 
        and Privacy Policy. All trademarks belong to their respective owners. 
        {getCurrentYear()} © FoodieGo Inc. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;