import { useNavigate } from 'react-router-dom';
import './StaffDashboard.scss';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { Notification, NotificationBody, User } from '../../types';
import notificationsService from '../../services/notifications';

const StaffDashboard = (props: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      notificationsService.getAll().then((allNotifications) => {
        setNotificationCount(
          allNotifications.find(
            (notification: Notification) => notification.owner === user.id
          )?.newNotifications.length || 0
        );
        setNotifications(allNotifications);
      });
      setUser(user);
    }
  }, []);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const userNotifications = notifications.filter(
    (notification) => notification.owner === user?.id
  );

  const handleNotificationService = () => {
    notificationsService.updateNotification(
      userNotifications[0].id,
      userNotifications[0]
    );
  };

  const handleOldNotificationClick = (oldNotification: NotificationBody) => {
    oldNotification?.accountNumber
      ? navigate(
          `/dashboard-client/account-info/${oldNotification?.accountId}/transactions/${oldNotification?.accountNumber}/${oldNotification?.transactionId}`
        )
      : oldNotification.message.includes('personal data')
      ? navigate(`/dashboard-client/${user?.id}/change-personal-data`)
      : console.log('happiness');
  };

  const handleNewNotificationClick = (
    notification: Notification,
    newNotification: NotificationBody
  ) => {
    notification.newNotifications.splice(
      notification.newNotifications.indexOf(newNotification),
      1
    );
    notification.oldNotifications.push(newNotification && newNotification);
    console.log(userNotifications);
    setNotificationCount(userNotifications[0].newNotifications.length);
    handleNotificationService();
    newNotification?.accountNumber
      ? navigate(
          `/dashboard-client/account-info/${newNotification?.accountId}/transactions/${newNotification?.accountNumber}/${newNotification?.transactionId}`
        )
      : newNotification.message.includes('personal data')
      ? navigate(`/dashboard-client/${user?.id}/change-personal-data`)
      : console.log('happiness');
  };

  const handleReadAllNotificationClick = () => {
    userNotifications[0].oldNotifications =
      userNotifications[0].oldNotifications.concat(
        userNotifications[0].newNotifications as Array<NotificationBody>
      );
    userNotifications[0].newNotifications.length = 0;
    console.log(userNotifications);
    setNotificationCount(userNotifications[0].newNotifications.length);
    handleNotificationService();
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
              <div
                className={
                  'notification-icon-container ' +
                  (notificationCount !== 0 && 'active')
                }
              >
                <div className='notification-icon-background'>
                  <NotificationsNoneIcon
                    fontSize='large'
                    className='notification-icon'
                    onClick={() => {
                      setNotificationOpen(!notificationOpen ? true : false);
                    }}
                  />
                </div>
                <div
                  className={
                    'notification-alert ' +
                    (notificationCount === 0 && 'remove')
                  }
                >
                  {notificationCount}
                </div>
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
              <div
                onClick={() => navigate(`/dashboard-staff/${user?.id}/profile`)}
              >
                Profile
              </div>
              <span></span>
              <div className='logout' onClick={props.handleLogout}>
                Logout
              </div>
            </div>
            {/* Notifcation dropdown box */}
            <div
              className={
                'notifications-container ' + (notificationOpen && 'active')
              }
            >
              {/* Read all notification by clicking the span below */}
              {notificationCount !== 0 && (
                <span
                  className='read-all'
                  onClick={handleReadAllNotificationClick}
                >
                  Mark all as read
                </span>
              )}
              {userNotifications.map((notification) => (
                <div className='notifications' key={notification.id}>
                  <div className='new-notifications-container'>
                    {/* Clickable New notifications */}
                    {notification.newNotifications.map((newNotification) => (
                      <div
                        className='single-new-notification'
                        onClick={() =>
                          handleNewNotificationClick(
                            notification as Notification,
                            newNotification as NotificationBody
                          )
                        }
                      >
                        {newNotification?.message}
                      </div>
                    ))}
                  </div>
                  {/* Older notifications */}
                  <p>Older</p>
                  <div className='old-notifications-container'>
                    {notification.oldNotifications.map((oldNotification) => (
                      <div
                        className='single-old-notification'
                        onClick={() =>
                          handleOldNotificationClick(
                            oldNotification as NotificationBody
                          )
                        }
                      >
                        {oldNotification?.message}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
