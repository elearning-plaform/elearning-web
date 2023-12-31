import './assets/sass/App.scss';
import Main from './page/Main';
import Signup from './page/Signup';
import Login from './page/Login';
import ForgotPassword from './page/ForgotPassword';
import Home from './page/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FindWord from './page/FindWord';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/elearning-web" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/main" element={<Main />} />
            <Route path="/FindWord" element={<FindWord />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;