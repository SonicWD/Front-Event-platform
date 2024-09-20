// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../utils/fetchUserInfo';
import { motion } from 'framer-motion';
import '../index.css';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);  // Estado para manejar el modo oscuro
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

    // Verifica si el usuario ya tiene una preferencia para el modo oscuro
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    fetchUserInfo();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const logout = () => {
    setUsername('');
    localStorage.removeItem('token');
    navigate('/');
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
      className="fixed top-0 w-full bg-white dark:bg-black text-black dark:text-white shadow-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 70, damping: 15 }}
    >
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <img
          src="/images/logos/logo.svg"
          alt="logo"
          className="h-10 cursor-pointer"
          onClick={() => navigateTo('/eventsP')}
        />

        {/* Botón de cambio de modo */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 focus:outline-none"
        >
          {darkMode ? '🌙 Modo Noche' : '☀️ Modo Día'}
        </button>

        {/* Botón de menú para móviles */}
        <button
          onClick={toggleMenu}
          className="text-black dark:text-white md:hidden focus:outline-none"
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Menú para dispositivos móviles y pantallas grandes */}
      <motion.nav
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:justify-between`}
        initial={menuOpen ? { opacity: 0 } : { opacity: 1 }}
        animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 items-center p-4">
          <li>
            <a
              onClick={() => navigateTo('/create-event')}
              className="block py-2 md:py-0 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Crear Evento
            </a>
          </li>
          <li>
            <a
              onClick={() => navigateTo('/eventsP')}
              className="block py-2 md:py-0 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Ver Eventos
            </a>
          </li>
          <li>
            <a
              onClick={() => navigateTo('/account')}
              className="block py-2 md:py-0 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Cuenta
            </a>
          </li>
        </ul>
      </motion.nav>

      {/* Sección de usuario */}
      <div className="hidden md:flex items-center justify-end p-4">
        <ul className="flex space-x-6">
          <li>
            <span className="mr-2">{username}</span>
            {username ? (
              <a
                onClick={logout}
                className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors duration-300"
              >
                Cerrar sesión
              </a>
            ) : (
              <a
                onClick={() => navigateTo('/login')}
                className="hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors duration-300"
              >
                Iniciar Sesión
              </a>
            )}
          </li>
        </ul>
      </div>
    </motion.header>
  );
};

export default Navbar;
