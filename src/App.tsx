import './assets/sass/App.scss';
import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import ForgotPassword from './page/ForgotPassword';
import FrontPage from './page/FrontPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<FrontPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/elearning-web" element={<FrontPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
    </Router>
  );
}

export default App;