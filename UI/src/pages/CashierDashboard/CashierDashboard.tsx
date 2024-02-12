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
        <div className='box one'>Search for Client</div>
        <div className='box two'>Open Client Account</div>
        <div className='box one'>Credit Client Account</div>
        <div className='box two'>Generate Statement</div>
      </div>
      <div className='right'>
        <div className='box two'>All Clients</div>
        <div className='box one'>Money Transfer</div>
        <div className='box two'>Dedit Client Account</div>
        <div className='box one'>Update Account Info</div>
      </div>
    </div>
  </div>
);

export default CashierDashboard;
