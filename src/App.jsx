import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/accounts-login/Login.jsx";
import Main from "./pages/LandingPage.jsx";
import CreateAccount from "./pages/accounts-login/CreateAccount.jsx"; // Importamos la página CreateAccount
import { AuthProvider } from "./context/AuthContext"; // Importamos el AuthProvider

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Envolvemos la app con el AuthProvider */}
      <Router>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
