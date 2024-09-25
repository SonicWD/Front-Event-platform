// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useContext } from 'react'; // Importa React y algunos hooks
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de propiedades

// Crea un contexto para la autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
const useAuth = () => {
    return useContext(AuthContext);
};

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
    // Estado inicial de autenticación, basado en el token almacenado en localStorage
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || '', // Obtiene el token de localStorage o un string vacío si no existe
        isAuthenticated: !!localStorage.getItem('token'), // Verifica si el usuario está autenticado
    });

    // Efecto que se ejecuta al montar el componente
    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtiene el token de localStorage
        if (token) {
            // Si hay un token, actualiza el estado de autenticación
            setAuthState({ token, isAuthenticated: true });
        }
    }, []); // El array vacío indica que este efecto solo se ejecuta una vez al montar el componente

    return (
        // Proveedor del contexto de autenticación
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children} {/* Renderiza los componentes hijos */}
        </AuthContext.Provider>
    );
};

// Validación de propiedades del componente AuthProvider
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // children es un nodo de React y es requerido
};

// Exportar el hook useAuth por defecto
export default useAuth;
