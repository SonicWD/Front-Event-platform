// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, LogOut, LogIn } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { getUserInfo } from '../utils/fetchUserInfo';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userInfo = await getUserInfo(token);
          if (userInfo) {
            setUsername(userInfo.username);
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          setUsername('');
        }
      }
    };
    
    fetchUserInfo();
  }, []);

  const logout = () => {
    setUsername('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navigateTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} shadow-md z-50 h-10`}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 70, damping: 15 }}
    >
      <div className="flex justify-between items-center px-4 h-full">
        <img
          src="/icons/icon.svg"
          alt="logo"
          className="h-3 cursor-pointer"
          onClick={() => navigateTo('/eventsP')}
        />

        <nav className="hidden md:flex space-x-4 text-sm">
          <a onClick={() => navigateTo('/create-event')} className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>Create Event</a>
          <a onClick={() => navigateTo('/eventsP')} className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>View Events</a>
          <a onClick={() => navigateTo('/account')} className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>Account</a>
        </nav>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="focus:outline-none"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={12} /> : <Moon size={12} />}
          </button>

          <span className={`text-xs hidden md:inline ${darkMode ? 'text-white' : 'text-black'}`}>{username}</span>
          {username ? (
            <button onClick={logout} className="focus:outline-none" aria-label="Log out">
              <LogOut size={12} />
            </button>
          ) : (
            <button onClick={() => navigateTo('/login')} className="focus:outline-none" aria-label="Log in">
              <LogIn size={12} />
            </button>
          )}

          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={12} /> : <Menu size={12} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          className={`md:hidden absolute top-5 left-0 right-0 shadow-md ${darkMode ? 'bg-black' : 'bg-white'}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col p-4 space-y-2 text-sm">
            <a onClick={() => navigateTo('/create-event')} className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>Create Event</a>
            <a onClick={() => navigateTo('/eventsP')} className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>View Events</a>
            <a onClick={() => navigateTo('/account')} className={`hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>Account</a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;