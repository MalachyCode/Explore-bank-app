import './ClientDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const ClientDashboard = () => {
  return (
    <div className='dashboard'>
      <div className='sidebar'></div>
      <div className='body'>
        <div className='top'>
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
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
