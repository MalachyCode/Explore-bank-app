import { useEffect, useState } from 'react';
import { Account, User } from '../../types';
import accountsService from '../../services/accounts';
import CloseIcon from '@mui/icons-material/Close';
import PinIcon from '@mui/icons-material/Pin';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import LockIcon from '@mui/icons-material/Lock';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import './UserProfile.scss';
import { useNavigate } from 'react-router';

const RenderOptions = (props: { onClick: () => void; optionName: string }) => (
  <div className='option' onClick={props.onClick}>
    <div className='left'>
      {props.optionName === 'Logout' ? (
        <LogoutIcon className='logout-icon' />
      ) : props.optionName === 'Change Password' ? (
        <LockIcon />
      ) : props.optionName === 'Change/Reset PIN' ? (
        <PinIcon />
      ) : (
        <EditNoteIcon />
      )}
    </div>
    <div className='middle'>{props.optionName}</div>
    <div className='right'>
      <ExpandCircleDownIcon className='arrow-icon' />
    </div>
  </div>
);

const UserProfile = (props: { handleLogout: () => void }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [enlargeProfilePicture, setEnlargeProfilePicture] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  const logout = () => {
    if (window.confirm(`Are you sure you want to logout?`)) {
      props.handleLogout();
    }
  };

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  const optionsToRender = [
    {
      id: 1,
      optionName: 'Change/Reset PIN',
      onClick: () => navigate(''),
    },
    {
      id: 2,
      optionName: 'Change Password',
      onClick: () => navigate('/password-reset'),
    },
    {
      id: 3,
      optionName: 'Change Personal Data',
      onClick: () => navigate(''),
    },
    {
      id: 4,
      optionName: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <div className='user-profile'>
      <div className='container'>
        <div className='top'>
          <h3>User Profile</h3>
          <div
            className={'profile-photo ' + (enlargeProfilePicture && 'active')}
            onClick={() => setEnlargeProfilePicture(!enlargeProfilePicture)}
          >
            {/* <img src='../../assets/pexels-aog-pixels-12698491.jpg' alt='' /> */}
          </div>
          <div className='user-name'>
            {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
          </div>
          <div
            className='show-details'
            onClick={() => setShowUserInfo(!showUserInfo)}
          >
            {showUserInfo ? 'Hide Details' : 'Show Details'}
          </div>
        </div>
        <div className='body'>
          <div className={'user-info ' + (showUserInfo && 'active')}>
            <CloseIcon
              fontSize='small'
              className='close-icon'
              onClick={() => setShowUserInfo(!showUserInfo)}
            />
            <div className='name'>
              <div className='headings'>Full Name</div>
              {user?.firstName} {user?.lastName}
            </div>
            <div className='mail'>
              <div className='headings'>Email</div>
              {user?.email}
            </div>
            <div className='number'>
              <div className='headings'>Phone</div>
              {user?.number}
            </div>
            <div className='account-numbers'>
              <div className='headings'>Account Number(s)</div>
              {userAccounts.map((account) => (
                <div key={account.id} className='account-number-box'>
                  {account.accountNumber}
                </div>
              ))}
            </div>
          </div>
          <div className='profile-options'>
            {optionsToRender.map((option) => (
              <RenderOptions
                onClick={option.onClick}
                optionName={option.optionName}
                key={option.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
