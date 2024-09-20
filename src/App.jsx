import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Main from './pages/LandingPage.jsx';  
import { AuthProvider } from './context/AuthContext'; // Importamos el AuthProvider

const App = () => {
  return (
    <AuthProvider> {/* Envolvemos la app con el AuthProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
