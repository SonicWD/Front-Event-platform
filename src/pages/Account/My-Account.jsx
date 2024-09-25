// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/useTheme';
import { User, Mail, Lock } from 'lucide-react';

const MyAccount = ({ name, email, password }) => {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
        <div className={`mt-1 flex items-center px-3 py-2 rounded-md shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <User className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
          <p className="text-sm text-gray-900 dark:text-white">{name}</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
        <div className={`mt-1 flex items-center px-3 py-2 rounded-md shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <Mail className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
          <p className="text-sm text-gray-900 dark:text-white">{email}</p>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
        <div className={`mt-1 flex items-center px-3 py-2 rounded-md shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <Lock className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
          <p className="text-sm text-gray-900 dark:text-white">{password}</p>
        </div>
      </div>
    </div>
  );
};

MyAccount.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default MyAccount;