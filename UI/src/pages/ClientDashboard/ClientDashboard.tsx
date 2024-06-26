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
import {
  Account,
  BarChartInfo,
  Notification,
  NotificationBody,
  User,
} from '../../types';
import accountService from '../../services/accounts';
import notificationsService from '../../services/notifications';
import incomeExpenseService from '../../services/incomeExpense';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientDashboard = (props: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [userBarChartInfo, setUserBarChartInfo] = useState<BarChartInfo>();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [userAccounts, setUserAccounts] = useState<Array<Account>>();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      notificationsService.getAll().then((allNotifications) => {
        setNotificationCount(
          allNotifications.find(
            (notification: Notification) =>
              notification.owner === retrievedUser.id
          )?.newNotifications.length || 0
        );
        setNotifications(allNotifications);
      });
      setUser(retrievedUser);

      accountService
        .findUserAccounts({ owner: retrievedUser.id })
        .then((retrievedUserAccounts) => {
          setUserAccounts(retrievedUserAccounts);
        });

      incomeExpenseService
        .findUserBarChartInfo({ owner: retrievedUser.id })
        .then((returnedData) => setUserBarChartInfo(returnedData));
    }
  }, []);

  const userNotifications = notifications.filter(
    (notification) => notification.owner === user?.id
  );

  const notifyNoAccount = () => {
    return toast.warn(
      `You don't have an account yet and you need one to access this service. Click on Open Acoount to open an account.`,
      {
        position: 'top-center',
      }
    );
  };

  const iconInputs = [
    {
      id: 'openAccount',
      name: 'openAccount',
      icon: '../../assets/icons8-bank-account-48.png',
      label: 'Open Account',
      onClick: () => navigate(`/open-account`),
    },
    {
      id: 'billPayment',
      name: 'billPayment',
      icon: '../../assets/icons8-bill-48.png',
      label: 'Bill Payment',
      onClick:
        userAccounts && userAccounts?.length > 0
          ? () => navigate(`/dashboard-client/${user?.id}/bill-payments`)
          : () => notifyNoAccount(),
    },
    {
      id: 'mobileTopup',
      name: 'mobileTopup',
      icon: '../../assets/icons8-topup-payment-48.png',
      label: 'Mobile Topup',
      onClick:
        userAccounts && userAccounts?.length > 0
          ? () => navigate(`/dashboard-client/${user?.id}/mobile-topup`)
          : () => notifyNoAccount(),
    },
    {
      id: 'transfer',
      name: 'transfer',
      icon: '../../assets/icons8-money-transfer-48.png',
      label: 'Transfer',
      onClick:
        userAccounts && userAccounts?.length > 0
          ? () => navigate(`/dashboard-client/${user?.id}/transfer`)
          : () => notifyNoAccount(),
    },
    {
      id: 'loans',
      name: 'loans',
      icon: '../../assets/loan2.png',
      label: 'Loans',
      iconClassName: 'loan-icon',
      spanClassName: 'loan-tag',
      onClick:
        userAccounts && userAccounts?.length > 0
          ? () => navigate(`/dashboard-client/${user?.id}/loans`)
          : () => notifyNoAccount(),
    },
    {
      id: 'referalReward',
      name: 'referalReward',
      icon: '../../assets/icons8-reward-48.png',
      label: 'Referal & Rewards',
      iconClassName: 'rewards-icon',
      onClick:
        userAccounts && userAccounts?.length > 0
          ? () => navigate(`/dashboard-client/${user?.id}/referal-rewards`)
          : () => notifyNoAccount(),
    },
    {
      id: 'sportWalletFunding',
      name: 'sportWalletFunding',
      icon: '../../assets/icons8-volleyball-48.png',
      label: 'Sport Wallet Funding',
      onClick:
        userAccounts && userAccounts?.length > 0
          ? () => navigate(`/dashboard-client/${user?.id}/sport-wallet-funding`)
          : () => notifyNoAccount(),
    },
  ];

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setNotificationOpen(notificationOpen && false);
  };

  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen ? true : false);
    setProfileOpen(profileOpen && false);
  };

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
      : oldNotification.message.includes('a new account')
      ? navigate(`/dashboard-client/account-info/${oldNotification?.accountId}`)
      : oldNotification.message.includes('Welcome to Explore Bank')
      ? navigate(`/welcome/${user?.id}`)
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
      : newNotification.message.includes('a new account')
      ? navigate(`/dashboard-client/account-info/${newNotification?.accountId}`)
      : newNotification.message.includes('Welcome to Explore Bank')
      ? navigate(`/welcome/${user?.id}`)
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
              className='item'
            />
          ))}
          <div
            className='item'
            onClick={
              userAccounts && userAccounts?.length > 0
                ? () =>
                    navigate(
                      `/dashboard-client/${user?.id}/transactions/select-account`
                    )
                : () => notifyNoAccount()
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
              className={
                'notification-icon-container ' +
                (notificationCount !== 0 && 'active')
              }
            >
              <div className='notification-icon-background'>
                <NotificationsNoneIcon
                  fontSize='large'
                  className='notification-icon'
                  onClick={handleNotificationClick}
                />
              </div>
              <div
                className={
                  'notification-alert ' + (notificationCount === 0 && 'remove')
                }
              >
                {notificationCount}
              </div>
            </div>
            <div
              className='account-icon-container'
              onClick={handleProfileClick}
            >
              {!user?.profilePicture ? (
                <AccountCircleIcon fontSize='large' className='account-icon' />
              ) : (
                <div className={'profile-photo'}>
                  <img src={`${user?.profilePicture}`} alt='' />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='container'>
          <div className={'profile-menu ' + (profileOpen && 'active')}>
            <div
              className='profile'
              onClick={() => navigate(`/dashboard-client/${user?.id}/profile`)}
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
          <div className='totals-container'>
            {userAccounts?.map((account) => (
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
                className='item'
              />
            ))}
            <div
              className='item'
              onClick={
                userAccounts && userAccounts?.length > 0
                  ? () =>
                      navigate(
                        `/dashboard-client/${user?.id}/transactions/select-account`
                      )
                  : () => notifyNoAccount()
              }
            >
              <HistoryIcon className='icon' />
              <span>Transaction History</span>
            </div>
            <div className='item free'></div>
          </div>
          <div className='chart-container'>
            {userBarChartInfo && (
              <BarChartComponent data={userBarChartInfo?.barData} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClientDashboard;
