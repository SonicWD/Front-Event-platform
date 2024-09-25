// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import API_URL from "../../config/config"; // Importa la URL de la API

const EditAccount = ({ initialName = '', initialEmail = '', initialPassword = '', onSave }) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);  // Estado para visibilidad de la contraseña
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

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
        console.error('Error al actualizar la información del usuario:', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="name" className="label">Nombre</label>
        <input 
          type="text" 
          className="input" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        
        <label htmlFor="email" className="label">Correo Electrónico</label>
        <input 
          type="email" 
          className="input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <label htmlFor="password" className="label">Contraseña</label>
        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            className="input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={togglePasswordVisibility}
          >
            <img
              src={showPassword ? "/images/icons/view-password-on.svg" : "/images/icons/view-password-off.svg"}
              alt="toggle password visibility"
              className="toggle-password-icon"
            />
          </button>
        </div>
      </div>
      <input type="submit" value="Guardar" className="primary-button" />
    </form>
  );
};

EditAccount.propTypes = {
  initialName: PropTypes.string.isRequired,
  initialEmail: PropTypes.string.isRequired,
  initialPassword: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

export default EditAccount;
