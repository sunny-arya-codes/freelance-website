'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  // Simple toggle logic for the preview environment
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Toggles a class on the root element for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground"
      title="Toggle theme"
    >
      {/* Sun Icon (Visible in Light Mode) */}
      <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'scale-0 rotate-90 hidden' : 'scale-100 rotate-0'}`} />
      
      {/* Moon Icon (Visible in Dark Mode) */}
      <Moon className={`h-5 w-5 transition-all ${theme === 'light' ? 'scale-0 -rotate-90 hidden' : 'scale-100 rotate-0'}`} />
      
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}