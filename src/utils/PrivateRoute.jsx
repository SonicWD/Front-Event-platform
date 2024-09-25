// src/PrivateRoute.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// `element` es ahora JSX (es decir, <Component />)
const PrivateRoute = ({ element }) => {
  const { authState } = useContext(AuthContext);

  return authState.isAuthenticated ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired, // Esperamos un ReactElement
};

export default PrivateRoute;
