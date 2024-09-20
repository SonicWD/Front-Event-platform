// src/PrivateRoute.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {  Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ element: Component }) => {
    const { authState } = useContext(AuthContext);
  
    return authState.isAuthenticated ? <Component /> : <Navigate to="/login" />;
  };

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
};
export default PrivateRoute;
