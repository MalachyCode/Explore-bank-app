import './ClientDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import BarChartComponent from '../../components/BarChartComponent';
import {
  RenderIcons,
  RenderTotals,
} from '../../components/RenderIconsandTotals';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className='dashboard'>
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
          <button className='logout-btn' onClick={() => navigate('/login')}>
            Logout
          </button>
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
            Welcome back <strong className='account-name'>Malachy</strong>
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