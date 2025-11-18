import React from 'react';

const MenuBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-lg h-8 shadow-lg">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-sm">Portfolio</span>
          <span className="text-sm">File</span>
          <span className="text-sm">Edit</span>
          <span className="text-sm">View</span>
          <span className="text-sm">Go</span>
          <span className="text-sm">Window</span>
          <span className="text-sm">Help</span>
        </div>
        <div className="text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
