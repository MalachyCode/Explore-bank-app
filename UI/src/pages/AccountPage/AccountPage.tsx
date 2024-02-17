import { useEffect, useState } from 'react';
import { User } from '../../types';
import './AccountPage.scss';

const AccountPage = (props: { user: User | null | undefined }) => {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);
  return (
    <div className='account-page'>
      <div className='container'>
        <div className='details-container'>
          <div className='name-container'>
            <span>Account Name</span>
            {props.user?.firstName} {props.user?.lastName}
          </div>
          <div className='account-number-container'>
            <span>Account Number</span>
            {props.user?.number}
          </div>
          <div className='mail-container'>
            <span>Mail</span>
            {props.user?.email}
          </div>
          <div className='number-container'>
            <span>Phone</span>
            {props.user?.number}
          </div>
        </div>
        <div className='buttons-container'>
          {!user?.isAdmin && <button>Debit Account</button>}
          {!user?.isAdmin && <button>Credit Account</button>}
          <button>Deactivate Account</button>
          <button className='delete'>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
