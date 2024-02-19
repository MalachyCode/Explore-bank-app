import 'react-multi-carousel/lib/styles.css';

import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPassword';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import Transfer from './pages/TransferPage/Transfer';
import StaffDashboard from './pages/StaffDashboard/StaffDashboard';
import Search from './pages/StaffDashboard/sections/Search';
import CreateStaffAccount from './pages/CreateStaffAccount/CreateStaffAccount';
import { useEffect, useState } from 'react';
import userService from './services/users';
import { User } from './types';
import AccountPage from './pages/AccountPage/AccountPage';
import OpenAccount from './pages/OpenAccount/OpenAccount';

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const match = useMatch('/dashboard-staff/search/users/:id');
  const user = match
    ? users.find((user) => user.id === Number(match.params.id))
    : null;

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // window.localStorage.removeItem('loggedAppUser');
    window.localStorage.clear();
    // setUser(null);
    navigate('/login');
  };

  return (
    <div className='app'>
      <div className='container'>
        <Routes>
          <Route
            path='/dashboard-staff/create-staff'
            element={<CreateStaffAccount />}
          />
          <Route
            path='/dashboard-staff/search/users/:id'
            element={<AccountPage user={user} />}
          />
          <Route path='/dashboard-staff/search/users' element={<Search />} />
          <Route path='/dashboard-client/:id/transfer' element={<Transfer />} />
          <Route
            path='/dashboard-staff'
            element={<StaffDashboard handleLogout={handleLogout} />}
          />
          <Route path='/open-account' element={<OpenAccount />} />
          <Route
            path='/dashboard-client'
            element={<ClientDashboard handleLogout={handleLogout} />}
          />
          <Route path='/password-reset' element={<ForgotPasswordPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
