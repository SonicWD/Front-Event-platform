// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/useTheme';
import { Eye, EyeOff, Save } from 'lucide-react';
import API_URL from "../../config/config";

const EditAccount = ({ initialName = '', initialEmail = '', onSave }) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/updateUser`,
        { username: name, email, password },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        }
      );

      if (response.status === 200) {
        onSave({ name, email, password });
        navigate('/login');
        alert('Update info');
      } else {
        console.error('Error updating user information:', response.data);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
        <input 
          type="text" 
          id="name"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <input 
          type="email" 
          id="email"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input 
            type={showPassword ? "text" : "password"}
            id="password"
            className={`block w-full pr-10 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Save className="mr-2 h-5 w-5" aria-hidden="true" />
        Save
      </button>
    </form>
  );
};

EditAccount.propTypes = {
  initialName: PropTypes.string.isRequired,
  initialEmail: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAccount;