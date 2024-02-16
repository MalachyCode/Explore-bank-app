import './ClientDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import BarChartComponent from '../../components/BarChartComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  RenderIcons,
  RenderTotals,
} from '../../components/RenderIconsandTotals';
import { User } from '../../types';

const ClientDashboard = (props: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [profileOpen, setProfileOpen] = useState(false);
  const id = 1;
  // const user = 'Malachy';

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleClick = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <div className='client-dashboard'>
      <div className={'sidebar ' + (menuOpen && 'active')}>
        <div className='sidebar-container'>
          <RenderIcons
            label='Open Account'
            icon='./assets/icons8-bank-account-48.png'
          />
          <RenderIcons
            label='Bill Payment'
            icon='./assets/icons8-bill-48.png'
          />
          <RenderIcons
            label='Mobile Topup'
            icon='./assets/icons8-topup-payment-48.png'
          />
          <RenderIcons
            label='Transfer'
            icon='./assets/icons8-money-transfer-48.png'
            onClick={() => navigate(`/dashboard-client/${id}/transfer`)}
          />
          <RenderIcons
            iconClassName='loan-icon'
            label='Loans'
            icon='./assets/loan2.png'
            spanClassName='loan-tag'
          />
          <RenderIcons
            iconClassName='rewards-icon'
            label='Referal & Rewards'
            icon='./assets/icons8-reward-48.png'
          />
          <RenderIcons
            label='Sport Wallet Funding'
            icon='./assets/icons8-volleyball-48.png'
          />
          <div className='item'>
            <HistoryIcon className='icon' />
            <span>Transaction History</span>
          </div>
          {/* <button className='logout-btn' onClick={props.handleLogout}>
            Logout
          </button> */}
        </div>
      </div>
      <div className='body'>
        <div className='top'>
          <MenuIcon
            fontSize='large'
            className='menu-hamburger'
            onClick={() => setMenuOpen(!menuOpen ? true : false)}
          />
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
        <div className='container'>
          <div className={'profile-menu ' + (profileOpen && 'active')}>
            <div>Profile</div>
            <span></span>
            <div className='logout' onClick={props.handleLogout}>
              Logout
            </div>
          </div>
          <div className='totals-container'>
            <RenderTotals
              label='Total balance'
              amount='$54,376'
              percentage='Saved 20%'
              className='total'
            />
            <RenderTotals
              label='Total balance'
              amount='$54,376'
              percentage='Saved 20%'
              className='total two'
            />
          </div>
          <div className='menu-icons-container'>
            <RenderIcons
              label='Open Account'
              icon='./assets/icons8-bank-account-48.png'
            />
            <RenderIcons
              label='Bill Payment'
              icon='./assets/icons8-bill-48.png'
            />
            <RenderIcons
              label='Mobile Topup'
              icon='./assets/icons8-topup-payment-48.png'
            />
            <RenderIcons
              label='Transfer'
              icon='./assets/icons8-money-transfer-48.png'
              onClick={() => navigate(`/dashboard-client/${id}/transfer`)}
            />
            <RenderIcons
              iconClassName='loan-icon'
              label='Loans'
              icon='./assets/loan2.png'
              spanClassName='loan-tag'
            />
            <RenderIcons
              iconClassName='rewards-icon'
              label='Referal & Rewards'
              icon='./assets/icons8-reward-48.png'
            />
            <RenderIcons
              label='Sport Wallet Funding'
              icon='./assets/icons8-volleyball-48.png'
            />
            <div className='item'>
              <HistoryIcon className='icon' />
              <span>Transaction History</span>
            </div>
            <div className='item free'></div>
          </div>
          <div className='chart-container'>
            <BarChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
