// import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  // const [count, setCount] = useState(0);
  // const [path, setPath] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <div className='card'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
        <button onClick={() => navigate('/login')}>To login page</button>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
    </>
  );
}

export default App;
