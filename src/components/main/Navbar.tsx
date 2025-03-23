"use client";
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Home, Store, Truck, MessageSquare, Heart, ShoppingCart, Menu, X, Moon, Sun } from 'lucide-react'

interface INav {
  nav: string;
  link: string;
  icon: React.ReactNode;
}

const nav: INav[] = [
  {
    nav: "الرئيسية",
    link: "/",
    icon: <Home className="w-5 h-5" />
  },
  {
    nav: "المتاجر",
    link: "#",
    icon: <Store className="w-5 h-5" />
  },
  {
    nav: "التوصيل",
    link: "#",
    icon: <Truck className="w-5 h-5" />
  },
  {
    nav: "المفضلة",
    link: "#",
    icon: <Heart className="w-5 h-5" />
  },
  {
    nav: "السلة",
    link: "#",
    icon: <ShoppingCart className="w-5 h-5" />
  },
  {
    nav: "تواصل معنا",
    link: "#",
    icon: <MessageSquare className="w-5 h-5" />
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize dark mode based on user preference or system setting
  useEffect(() => {
    // Check if user has a preference stored
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);
  
  // Update document class and localStorage when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <nav className={`fixed rounded-2xl top-3 left-0 right-0 w-[95%] md:w-[90%] lg:w-[80%] m-auto backdrop-blur-lg z-50 ${
      darkMode 
        ? 'bg-gray-900/40 border-gray-700 text-white' 
        : 'bg-white/40 border-neutral-300 text-black'
    } border shadow-md transition-colors duration-300`}>
      <div className="px-4 md:px-6 lg:px-10 py-4 flex justify-between items-center">
        {/* Logo - Same on mobile and desktop */}
        <h1 className="text-xl md:text-2xl font-bold flex justify-center align-middle items-center">
          <p className={`${darkMode ? 'text-amber-300 bg-gray-600' : 'text-amber-300 bg-black'} rounded-l-3xl text-md px-2 mb-3 rounded-tr-3xl `}>
            daily
          </p>
          <p className={`${darkMode ? 'text-gray-900 bg-amber-300' : 'text-black bg-amber-300'} rounded-r-3xl text-md px-2 mt-3 rounded-bl-3xl`}>
            store
          </p>
        </h1>

    

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          {nav.map((item, key) => (
            <Link 
              key={key} 
              href={item.link} 
              className={`flex items-center gap-2 text-sm hover:text-amber-500 font-semibold transition ${
                item.nav === 'الرئيسية' 
                  ? 'text-amber-500' 
                  : darkMode ? 'text-white' : 'text-black'
              }`}
            >
              {item.icon}
              <span>{item.nav}</span>
            </Link>
          ))}
        </ul>
            {/* Dark mode toggle + Mobile menu button container */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-gray-700 text-amber-300' : 'bg-amber-100 text-amber-600'
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className={`md:hidden px-4 pb-4 rounded-b-2xl border-t ${
          darkMode 
            ? 'bg-gray-800/90 border-gray-700' 
            : 'bg-white/60 border-neutral-200'
        }`}>
          <ul className="flex flex-col space-y-3 pt-2 text-right">
            {nav.map((item, key) => (
              <Link
                key={key}
                href={item.link}
                className={`flex items-center justify-end gap-2 py-2 px-3 rounded-lg ${
                  darkMode 
                    ? item.nav === 'الرئيسية'
                      ? 'text-amber-500 bg-gray-700/50' 
                      : 'text-white hover:bg-gray-700/30'
                    : item.nav === 'الرئيسية'
                      ? 'text-amber-600 bg-amber-50' 
                      : 'text-black hover:bg-amber-100'
                } transition`}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.nav}</span>
                {item.icon}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar