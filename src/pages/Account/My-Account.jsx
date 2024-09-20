// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../../index.css';
import PropTypes from 'prop-types';

const MyAccount = ({ name, email, password }) => {
  return (
    <form className="form">
      <div>
        <label htmlFor="name" className="label">Nombre</label>
        <p className="value">{name}</p>
        
        <label htmlFor="email" className="label">Email</label>
        <p className="value">{email}</p>
        
        <label htmlFor="password" className="label">Contraseña</label>
        <p className="value">{password}</p>
      </div>
     
    </form>
  );
};

MyAccount.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default MyAccount;
