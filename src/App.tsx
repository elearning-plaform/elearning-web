import './assets/sass/App.scss';
import Home from './page/Home';
import Signup from './page/Signup';
import Login from './page/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/elearning-web" element={<Login />} />
          </Routes>
    </Router>
  );
}

export default App;