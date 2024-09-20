import { API_URL } from "../config/config"; // Importa la URL de la API desde el archivo de configuración

// Función asíncrona para obtener la información del usuario
export const getUserInfo = async (token) => {
    try {
        // Realiza una solicitud GET a la API para obtener la información del usuario
        const response = await fetch(`${API_URL}/user-info`, {
            method: 'GET', // Método HTTP GET
            headers: {
                'Authorization': `Bearer ${token}`, // Encabezado de autorización con el token
                'Content-Type': 'application/json', // Tipo de contenido JSON
            },
        });

        // Verifica si la respuesta no es exitosa
        if (!response.ok) {
            // Si el estado de la respuesta es 401, lanza un error de autorización
            if (response.status === 401) {
                throw new Error('Unauthorized: Token expired or invalid');
            }
            // Para otros estados de error, lanza un error genérico de fallo en la obtención de información
            throw new Error('Failed to fetch user info');
        }

        // Si la respuesta es exitosa, convierte la respuesta a JSON
        const data = await response.json();
        return data; // Retorna los datos obtenidos
    } catch (error) {
        // Captura y muestra cualquier error que ocurra durante la solicitud
        console.error('Error fetching user info:', error);
        return null; // Retorna null en caso de error
    }
};