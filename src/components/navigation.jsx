import React, { useState, useEffect } from 'react';

export const Categories = [
  "Technology",
  "Automotive",
  "Healthcare",
  "Finance",
  "Consumer Discretionary"
];

export const Navigation = ({ onTagClick }) => {
  const [selected, setSelected] = useState('all'); // Track selected sector

  useEffect(() => {
    // Ensure that the selected sector doesn't trigger unnecessary re-renders
    onTagClick(selected);
  }, [selected, onTagClick]); // Only trigger when 'selected' changes

  const handleTagClick = (sector) => {
    if (sector !== selected) {
      setSelected(sector);
    }
  };

  return (
    <div className='w-full py-4 flex justify-center'>
      <div className='bg-blue-950 p-6 text-white flex flex-col items-center'>
        <h3 className="text-2xl font-semibold mb-4">Sectors</h3>
        <div className='flex flex-wrap justify-center gap-4'>
          <button
            className={`bg-amber-500 rounded-full text-black px-4 py-2 hover:bg-black hover:text-white ${selected === 'all' ? 'bg-black text-white' : ''}`}
            onClick={() => handleTagClick('all')}>
            all
          </button>
          {Categories.map(tag => (
            <button
              key={tag}
              className={`bg-amber-500 rounded-full text-black px-4 py-2 hover:bg-black hover:text-white ${selected === tag ? 'bg-black text-white' : ''}`}
              onClick={() => handleTagClick(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
