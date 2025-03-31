import React, { useState } from 'react';
import "./Home.css";
import Header from '../../Components/Header/Header';
import HomeBanner from '../../Components/HomeBanner/HomeBanner'; // Assuming you have this component
import Footer from '../../Components/Footer/Footer'; // Assuming you have this component


const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
     
     
      {/* Home Banner */}
      <HomeBanner />
      
      {/* Add your page content here if needed */}
      <div className="category-section">
        {/* Category section */}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
