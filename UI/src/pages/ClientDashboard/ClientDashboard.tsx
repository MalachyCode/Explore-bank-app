import './ClientDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div className='dashboard'>
      <div className={'sidebar ' + (menuOpen && 'active')}>
        <div className='sidebar-container'>
          <div className='item'>
            <img
              src='./assets/icons8-bank-account-48.png'
              alt=''
              // className='account-icon'
            />
            <span>Open Account</span>
          </div>
          <div className='item'>
            <img src='./assets/icons8-bill-48.png' alt='' className='icon' />
            <span>Bill Payment</span>
          </div>
          <div className='item'>
            <img
              src='./assets/icons8-topup-payment-48.png'
              alt=''
              className='icon'
            />
            <span>Mobile Topup</span>
          </div>
          <div className='item'>
            <img
              src='./assets/icons8-money-transfer-48.png'
              alt=''
              className='icon'
            />
            <span>Transfer</span>
          </div>
          <div className='item'>
            <img src='./assets/loan2.png' alt='' className='loan-icon' />
            <span className='loan-tag'>Loans</span>
          </div>
          <div className='item'>
            <img
              src='./assets/icons8-reward-48.png'
              alt=''
              className='rewards-icon'
            />
            <span>Referal & Rewards</span>
          </div>
          <div className='item'>
            <img
              src='./assets/icons8-volleyball-48.png'
              alt=''
              className='icon'
            />
            <span>Sport Wallet Funding</span>
          </div>
          <div className='item'>
            <HistoryIcon className='icon' />
            <span>Transaction History</span>
          </div>
          <div className='item free'></div>
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
          <div className='total'>
            <div className='total-info'>
              <h3>Total balance</h3>
              <strong>
                <h2 className='amount'>$54,376</h2>
              </strong>
              <p className='savings-percentage'>Saved 20%</p>
            </div>
          </div>
          <div className='total two'>
            <div className='total-info'>
              <h3>Total balance</h3>
              <strong>
                <h2 className='amount'>$54,376</h2>
              </strong>
              <p className='savings-percentage'>Saved 20%</p>
            </div>
          </div>
          <div className='menu-icons-container'>
            <div className='item'>
              <img
                src='./assets/icons8-bank-account-48.png'
                alt=''
                // className='account-icon'
              />
              <span>Open Account</span>
            </div>
            <div className='item'>
              <img src='./assets/icons8-bill-48.png' alt='' className='icon' />
              <span>Bill Payment</span>
            </div>
            <div className='item'>
              <img
                src='./assets/icons8-topup-payment-48.png'
                alt=''
                className='icon'
              />
              <span>Mobile Topup</span>
            </div>
            <div className='item'>
              <img
                src='./assets/icons8-money-transfer-48.png'
                alt=''
                className='icon'
              />
              <span>Transfer</span>
            </div>
            <div className='item'>
              <img src='./assets/loan2.png' alt='' className='loan-icon' />
              <span className='loan-tag'>Loans</span>
            </div>
            <div className='item'>
              <img
                src='./assets/icons8-reward-48.png'
                alt=''
                className='rewards-icon'
              />
              <span>Referal & Rewards</span>
            </div>
            <div className='item'>
              <img
                src='./assets/icons8-volleyball-48.png'
                alt=''
                className='icon'
              />
              <span>Sport Wallet Funding</span>
            </div>
            <div className='item'>
              <HistoryIcon className='icon' />
              <span>Transaction History</span>
            </div>
            <div className='item free'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
