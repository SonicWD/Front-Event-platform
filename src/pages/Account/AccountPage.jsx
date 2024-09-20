// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import MyAccount from './My-Account';
import EditAccount from './EditAccount';
import { getUserInfo } from '../Main/api'; // Importa la función de la API aquí

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState(null); // Inicializa userInfo como null para indicar estado de carga
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getUserInfo(token);
          setUserInfo(userData); // Actualiza userInfo con los datos del usuario
        } catch (error) {
          console.error('Error fetching user info:', error);
          // Manejo de errores, por ejemplo, mostrar un mensaje al usuario o redirigir a una página de error
        }
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setIsEditing(false);
    // Aquí puedes hacer una llamada a la API para guardar los cambios si es necesario
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token'); // Elimina el token del localStorage
    // Otros pasos necesarios para cerrar sesión, como redirigir a la página de inicio de sesión
  };

  if (!userInfo) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos del usuario
  }

  return (
    <div className="login">
      <div className="form-container">
        <h1 className="title">Mi cuenta</h1>
        {isEditing ? (
          <>
            <EditAccount
              initialName={userInfo.username}
              initialEmail={userInfo.email}
              onSave={handleSave}
            />
            <button className="secondary-button" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <MyAccount
              name={userInfo.username}
              email={userInfo.email}
              password='**************'
            />
            <button className="secondary-button" onClick={() => setIsEditing(true)}>
              Editar
            </button>
            <button className="primary-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
