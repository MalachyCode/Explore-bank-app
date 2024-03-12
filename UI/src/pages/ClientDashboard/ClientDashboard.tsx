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
import { Account, User } from '../../types';
import accountService from '../../services/accounts';

const ClientDashboard = (props: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [profileOpen, setProfileOpen] = useState(false);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [removeNotification, setRemoveNotification] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  // console.log(accounts);
  // console.log(transactions);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  // console.log(accounts.map((account) => account.owner));

  // console.log(accounts.map((account) => account.owner === user?.id));

  const iconInputs = [
    {
      id: 'openAccount',
      name: 'openAccount',
      icon: './assets/icons8-bank-account-48.png',
      label: 'Open Account',
      onClick: () => navigate(`/open-account`),
    },
    {
      id: 'billPayment',
      name: 'billPayment',
      icon: './assets/icons8-bill-48.png',
      label: 'Bill Payment',
    },
    {
      id: 'mobileTopup',
      name: 'mobileTopup',
      icon: './assets/icons8-topup-payment-48.png',
      label: 'Mobile Topup',
      onClick: () => navigate(`/dashboard-client/${user?.id}/mobile-topup`),
    },
    {
      id: 'transfer',
      name: 'transfer',
      icon: './assets/icons8-money-transfer-48.png',
      label: 'Transfer',
      onClick: () => navigate(`/dashboard-client/${user?.id}/transfer`),
    },
    {
      id: 'loans',
      name: 'loans',
      icon: './assets/loan2.png',
      label: 'Loans',
      iconClassName: 'loan-icon',
      spanClassName: 'loan-tag',
    },
    {
      id: 'referalReward',
      name: 'referalReward',
      icon: './assets/icons8-reward-48.png',
      label: 'Referal & Rewards',
      iconClassName: 'rewards-icon',
    },
    {
      id: 'sportWalletFunding',
      name: 'sportWalletFunding',
      icon: './assets/icons8-volleyball-48.png',
      label: 'Sport Wallet Funding',
    },
  ];

  const handleClick = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <div className='client-dashboard'>
      <div className={'sidebar ' + (menuOpen && 'active')}>
        <div className='sidebar-container'>
          {iconInputs.map((iconInput) => (
            <RenderIcons
              icon={iconInput.icon}
              label={iconInput.label}
              onClick={iconInput.onClick}
              key={iconInput.id}
              iconClassName={iconInput.iconClassName}
              spanClassName={iconInput.spanClassName}
            />
          ))}
          <div
            className='item'
            onClick={() =>
              navigate(
                `/dashboard-client/${user?.id}/transactions/select-account`
              )
            }
          >
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
            Welcome back
            <strong className='account-name'>{user?.firstName}</strong>
          </h3>
          <div className='right'>
            <div
              className='notification-icon-container'
              onClick={() => {
                setNotificationOpen(!notificationOpen ? true : false);

                setTimeout(() => {
                  setRemoveNotification(true);
                }, 5000);
              }}
            >
              <NotificationsNoneIcon
                fontSize='large'
                className='notification-icon'
              />
              <div
                className={
                  'notification-alert ' + (removeNotification && 'remove')
                }
              ></div>
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
          <div
            className={
              'notifications-container ' + (notificationOpen && 'active')
            }
          ></div>
          <div className='totals-container'>
            {userAccounts.map((account) => (
              <RenderTotals
                key={account.id}
                status={account.status}
                balance={account.balance}
                accountNum={account.accountNumber}
                className='total'
                id={account.id}
                onClick='toAccountInfo'
              />
            ))}
          </div>
          <div className='menu-icons-container'>
            {iconInputs.map((iconInput) => (
              <RenderIcons
                icon={iconInput.icon}
                label={iconInput.label}
                onClick={iconInput.onClick}
                key={iconInput.id}
                iconClassName={iconInput.iconClassName}
                spanClassName={iconInput.spanClassName}
              />
            ))}
            <div
              className='item'
              onClick={() =>
                navigate(
                  `/dashboard-client/${user?.id}/transactions/select-account`
                )
              }
            >
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
