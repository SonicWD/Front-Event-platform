/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Esto permitirá cambiar entre los modos usando la clase 'dark'
  theme: {
    extend: {
      colors: {
        primary: '#000000',  // Negro
        secondary: '#ffffff', // Blanco
      },
    },
  },
  plugins: [],
}