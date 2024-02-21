import { useEffect, useState } from 'react';
import { Account, User } from '../../types';
import './AccountPage.scss';
import accountsService from '../../services/accounts';

const AccountPage = (props: { user: User | null | undefined }) => {
  const [user, setUser] = useState<User | null>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  // const userAccounts = [1234567899, 5566774433];
  const userAccounts = accounts.filter(
    (account) => account.owner === props.user?.id
  );

  return (
    <div className='account-page'>
      <div className='container'>
        <div className='details-container'>
          <div className='name-container'>
            <span>Account Name</span>
            {props.user?.firstName} {props.user?.lastName}
          </div>
          <div className='account-number-container'>
            <span>Account Number(s)</span>
            {/* {props.user?.number} */}
            {userAccounts.map((account) => (
              <div>{account.accountNumber}</div>
            ))}
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
