import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import TopBar from './pages/HomePage/sections/topbar/TopBar';
import Menu from './pages/HomePage/sections/menu/Menu';

function App() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className='app'>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className='container'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
