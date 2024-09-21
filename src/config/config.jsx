// src/config/config.js
//Se utliza para cambiar de entorno de desarrollo 
// eslint-disable-next-line react-refresh/only-export-components
const ENV = "production"; // Cambia a "production" o a "development"

const config = {
  development: {
    API_URL: "http://127.0.0.1:8000",
  },
  production: {
    API_URL: "https://event-app-backend-44ux.onrender.com",
  }
};

export const API_URL = config[ENV].API_URL;
