import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import EmployeeLogin from "./Components/EmployeeLogin/EmployeeLogin";
import HomeBanner from "./Components/HomeBanner/HomeBanner";
import UserManagement from "../Admin/UserManagement";
import EditUser from "../Admin/EditUser";
import EmployeeManagement from "../Admin/EmployeeManagement";

const AppContent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);
  const location = useLocation();

  return (
    <div className="app">
      {/* Modals */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showEmployeeLogin && <EmployeeLogin setShowEmployeeLogin={setShowEmployeeLogin} />}

      {/* Header */}
      {location.pathname === "/" && <Header setShowLogin={setShowLogin} />}

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/homebanner" element={<HomeBanner />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/employee-management" element={<EmployeeManagement />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* Footer - now properly at bottom */}
      {location.pathname === "/" && <Footer setShowEmployeeLogin={setShowEmployeeLogin} />}
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