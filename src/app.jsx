import React, { useState } from 'react';
import { Navigation } from './components/navigation.jsx';
import StockListings from './components/stockListings.jsx';

export const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  function handleTagClick(tag) {
    setSelectedCategory(tag);
  }

  return (
    <div className="bg-gray-800 min-h-screen"> {/* This sets the background color for the entire screen */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[300px] bg-gray-200">
          <Navigation onTagClick={handleTagClick} />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-900"> {/* This is to set the background color of the main content */}
          <StockListings selectedSector={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default App;






