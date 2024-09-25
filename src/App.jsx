import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/accounts-login/Login';
import CreateEvent from './pages/Events/CreateEvent';
import CreateAccount from './pages/accounts-login/CreateAccount';
import EventPage from './pages/Events/EventPage';
import AccountPage from './pages/Account/AccountPage';
import PrivateRoute from './utils/PrivateRoute';
import UpdateEvent from './pages/Events/UpdateEvent';
import  useAuth from './context/AuthContext';
import './index.css';

const App = () => {
  const { authState } = useAuth();
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/create-account', '/'];

  return (
    <div>
      {authState.isAuthenticated && !hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />

          {/* Rutas privadas */}
          <Route path="/create-event" element={<PrivateRoute element={<CreateEvent />} />} />
          <Route path="/eventsP/*" element={<PrivateRoute element={<EventPage />} />} />
          <Route path="/account" element={<PrivateRoute element={<AccountPage />} />} />
          <Route path="/events-update/:eventId" element={<PrivateRoute element={<UpdateEvent />} />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
