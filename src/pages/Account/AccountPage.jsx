// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyAccount from './My-Account';
import EditAccount from './EditAccount';
import { getUserInfo } from '../../utils/fetchUserInfo';
import { useTheme } from '../../context/useTheme';
import { LogOut, Edit, X } from 'lucide-react';

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUserInfo(token);
          setUserInfo(userData);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!userInfo) {
    return <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>Loading...</div>;
  }

  return (
    <div className={`min-h-screen pt-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">My Account</h1>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 sm:p-6">
            {isEditing ? (
              <>
                <EditAccount
                  initialName={userInfo.username}
                  initialEmail={userInfo.email}
                  onSave={handleSave}
                />
                <button
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="mr-2 h-5 w-5" aria-hidden="true" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <MyAccount
                  name={userInfo.username}
                  email={userInfo.email}
                  password="**************"
                />
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="mr-2 h-5 w-5" aria-hidden="true" />
                    Edit
                  </button>
                  <button
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;