import React, { useState } from 'react';
import "./Home.css";
import Header from '../../Components/Header/Header';
import HomeBanner from '../../Components/HomeBanner/HomeBanner';

const Home = () => {
  const [category, setCategory] = useState("All");


  return (
    <div>
      <HomeBanner />
      <div className="category-section">
        {/* Your category content */}
      </div>
    </div>
  );
}

export default Home;