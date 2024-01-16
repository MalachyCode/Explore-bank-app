import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TopBar from './pages/sections/topbar/TopBar';

function App() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='app'>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className='container'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
        {/* <button onClick={() => navigate('/login')}>To login page</button> */}
      </div>
    </div>
  );
}

export default App;
