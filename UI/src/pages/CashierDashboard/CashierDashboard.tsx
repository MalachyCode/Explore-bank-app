import './CahsierDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const CashierDashboard = () => (
  <div className='cashier-dashboard'>
    <div className='top'>
      <h3>
        Welcome back <strong className='account-name'>Staff</strong>
      </h3>
      <div className='notification-icon-container'>
        <NotificationsNoneIcon fontSize='large' className='notification-icon' />
        <div className='notification-alert'></div>
      </div>
    </div>
    <div className='container'>
      <div className='left'>
        <div className='box'>Search for Client</div>
        <div className='box'>Open Client Account</div>
        <div className='box'>Credit Client Account</div>
        <div className='box'>Generate Statement</div>
      </div>
      <div className='right'>
        <div className='box'>All Clients</div>
        <div className='box'>Money Transfer</div>
        <div className='box'>Dedit Client Account</div>
        <div className='box'>Update Account Info</div>
      </div>
    </div>
  </div>
);

export default CashierDashboard;
