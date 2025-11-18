import React from 'react';
import { Wifi, Battery, Search } from 'lucide-react'; // Added for premium feel

const MenuBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 h-10 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-6 h-full text-gray-800 dark:text-white">
        
        {/* Left Side Actions */}
        <div className="flex items-center space-x-6">
          <span className="font-bold text-sm tracking-wide">Portfolio</span>
          <div className="hidden md:flex items-center space-x-5 text-xs font-medium opacity-80">
            <span className="hover:opacity-100 cursor-pointer transition-opacity">File</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Edit</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">View</span>
          </div>
        </div>

        {/* Right Side Status */}
        <div className="flex items-center space-x-4 text-xs font-medium">
          <Search className="w-4 h-4 opacity-60 hover:opacity-100 cursor-pointer" />
          <Wifi className="w-4 h-4 opacity-60" />
          <span className="opacity-90">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;