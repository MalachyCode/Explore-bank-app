import 'react-multi-carousel/lib/styles.css';

import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPassword';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import Transfer from './pages/TransferPage/Transfer';
import StaffDashboard from './pages/CashierDashboard/StaffDashboard';
import Search from './pages/CashierDashboard/sections/Search/Search';
import CreateStaffAccount from './pages/CreateStaffAccount/CreateStaffAccount';

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <Routes>
          <Route
            path='/dashboard-staff/create-staff'
            element={<CreateStaffAccount />}
          />
          <Route path='/dashboard-staff/search' element={<Search />} />
          <Route path='/dashboard-client/:id/transfer' element={<Transfer />} />
          <Route path='/dashboard-staff' element={<StaffDashboard />} />
          <Route path='/dashboard-client' element={<ClientDashboard />} />
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
