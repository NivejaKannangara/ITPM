import React, { useState } from 'react';
import "./Home.css";
import HomeBanner from '../../Components/HomeBanner/HomeBanner';
import { FaRobot } from 'react-icons/fa';
import Chatbot from '../../Components/Chatbot/Chatbot'; // Ensure this path matches your structure

const Home = () => {
  const [category, setCategory] = useState("All");
  const [showChatbot, setShowChatbot] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token'); // Uses your existing auth

  return (
    <div className="home-container">
      <HomeBanner />
      
      {/* Floating Chatbot Button */}
      <button 
        onClick={() => setShowChatbot(true)}
        className="floating-chatbot-btn"
      >
        <FaRobot size={24} />
      </button>

      {/* Chatbot Modal */}
      {showChatbot && (
        <Chatbot 
          onClose={() => setShowChatbot(false)} 
          isLoggedIn={isLoggedIn} 
        />
      )}

      <div className="category-section">
        {/* Your existing category content */}
      </div>
    </div>
  );
};

export default Home;