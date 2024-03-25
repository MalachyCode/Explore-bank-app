import { useNavigate } from 'react-router-dom';
import './StaffDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { User } from '../../types';

const StaffDashboard = (props: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {user ? (
        <div className='cashier-dashboard'>
          <div className='top'>
            <h3>
              Welcome back{' '}
              <strong className='account-name'>{user?.firstName}</strong>
            </h3>
            <div className='right'>
              <div className='notification-icon-container'>
                <NotificationsNoneIcon
                  fontSize='large'
                  className='notification-icon'
                />
                <div className='notification-alert'></div>
              </div>
              <AccountCircleIcon
                fontSize='large'
                className='account-icon'
                onClick={handleClick}
              />
            </div>
          </div>
          <div className='body'>
            <div className={'account-menu ' + (menuOpen && 'active')}>
              <div>Profile</div>
              <span></span>
              <div className='logout' onClick={props.handleLogout}>
                Logout
              </div>
            </div>
            <div className={'container ' + (!user.isAdmin && 'cashier')}>
              <div className='box' onClick={() => navigate('/open-account')}>
                Open Account
              </div>
              <div
                className='box'
                onClick={() => navigate('/dashboard-staff/search/users')}
              >
                Manage Accounts
              </div>
              {user?.isAdmin && (
                <div
                  className='box'
                  onClick={() => navigate('/dashboard-staff/create-staff')}
                >
                  Create Staff Account
                </div>
              )}
              {user?.isAdmin && <div className='box last'></div>}
            </div>
          </div>
        </div>
      ) : (
        <div className='login-message'>
          <div className='header'>Ooops, You're not logged in</div>
          <div className='body'>
            click{' '}
            <span className='link' onClick={() => navigate('/login')}>
              here
            </span>{' '}
            to jump back in
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
