import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomeBanner from "./Components/HomeBanner/HomeBanner";
import Home from "./Pages/Home/Home";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import UserManagement from "../Admin/UserManagement";
import EditUser from "../Admin/EditUser"; 

const AppContent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  return (
    <div className="app">
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {/* Render Header only on home page */}
      {location.pathname === "/" && <Header setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/footer" element={<Footer />} />
        {/* If you also have a route for Header, be careful */}
        <Route path="/homebanner" element={<HomeBanner />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
