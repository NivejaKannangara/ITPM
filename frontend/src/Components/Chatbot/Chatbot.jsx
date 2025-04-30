import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = ({ onClose, isLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setMessages([{ 
        text: "Welcome to FoodieGo Assistant! Please choose:\n1. Menu Suggestions\n2. Support Agent", 
        isBot: true 
      }]);
    } else {
      setMessages([{ 
        text: "Please login to use this feature", 
        isBot: true 
      }]);
    }
  }, [isLoggedIn]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      if (input === '1') {
        const response = await fetch('http://localhost:5000/api/chatbot/suggestions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        
        if (data.length > 0 && !data[0].message) {
          const suggestionText = "Here are personalized suggestions for you:\n" + 
            data.map(item => `- ${item.name}`).join('\n');
          setMessages([...newMessages, { text: suggestionText, isBot: true }]);
        } else {
          setMessages([...newMessages, { 
            text: "No matching menus found. Try updating your preferences.", 
            isBot: true 
          }]);
        }
      } else if (input === '2') {
        setMessages([...newMessages, { 
          text: "You'll be connected to a support agent soon. Thank you!", 
          isBot: true 
        }]);
      } else {
        setMessages([...newMessages, { 
          text: "Please enter either 1 or 2 to choose an option.", 
          isBot: true 
        }]);
      }
    } catch (error) {
      setMessages([...newMessages, { 
        text: "Error processing your request. Please try again.", 
        isBot: true 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3><FaRobot /> FoodieGo Assistant</h3>
        <button onClick={onClose} className="close-btn">
          <FaTimes />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
            {msg.text.split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        ))}
        {loading && <div className="message bot">Thinking...</div>}
      </div>

      <form onSubmit={handleSend} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLoggedIn ? "Type 1 or 2..." : "Please login first"}
          disabled={!isLoggedIn || loading}
        />
        <button type="submit" disabled={!isLoggedIn || loading}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;