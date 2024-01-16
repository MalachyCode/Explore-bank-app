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
    <div className='container'>
      <div className='welcome-note'>
        <h3>Welcome to Explore bank</h3>
        <p>
          At Explore bank, your financial success is our priority. We're
          committed to providing you with secure, easy-to-use banking solutions
          that fit your lifestyle. Let's make your dreams a reality, together!
        </p>
        <p>
          Join us today and experience banking like never before. Welcome to a
          world of endless possibilities. Welcome to Explore bank!
        </p>
      </div>
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
    </div>
  );
}

export default App;
