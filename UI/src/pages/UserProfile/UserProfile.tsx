import { useEffect, useState } from 'react';
import { Account, User } from '../../types';
import accountsService from '../../services/accounts';
import './UserProfile.scss';

const UserProfile = () => {
  const [user, setUser] = useState<User>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  return (
    <div className='user-profile'>
      <div className='profile-photo'></div>
      User Profile
      <div className='user-info'>
        <div className='name'>
          {user?.firstName} {user?.lastName}
        </div>
        <div className='mail'>{user?.email}</div>
        <div className='number'>{user?.number}</div>
        <div className='account-numbers'>
          {userAccounts.map((account) => (
            <div key={account.id}>{account.accountNumber}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
