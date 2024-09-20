import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

import Main from './pages/LandingPage.jsx';  

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/" element={<Main />} />
      </Routes>
      <Navbar />
          </Router>
  );
}
export default App;