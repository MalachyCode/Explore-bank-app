import { useNavigate } from 'react-router-dom';
import './StaffDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useEffect, useState } from 'react';
import { User } from '../../types';

const CashierDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div className='cashier-dashboard'>
      <div className='top'>
        <h3>
          Welcome back{' '}
          <strong className='account-name'>{user?.firstName}</strong>
        </h3>
        <div className='notification-icon-container'>
          <NotificationsNoneIcon
            fontSize='large'
            className='notification-icon'
          />
          <div className='notification-alert'></div>
        </div>
      </div>
      <div className='container'>
        <div className='left'>
          <div className='box one'>All Clients</div>
          <div
            className='box two'
            onClick={() => navigate('/dashboard-cashier/search')}
          >
            Debit Cards
          </div>
          {/* <div className='box one'>
            Credit Client Account Dedit Client Account
          </div>
          <div className='box two'>Update Account Info</div> */}
        </div>
        <div className='right'>
          <div className='box two'>Open Client Account</div>
          <div
            className='box one'
            onClick={() => navigate('/dashboard-cashier/search')}
          >
            Manage Accounts
          </div>
          {/* <div className='box two'>Generate Statement</div>
          <div className='box one'>Close Accounts</div> */}
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
