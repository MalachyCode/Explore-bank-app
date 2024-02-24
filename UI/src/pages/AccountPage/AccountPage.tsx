import { useEffect, useState } from 'react';
import { Account, User } from '../../types';
import './AccountPage.scss';
import accountsService from '../../services/accounts';
import usersService from '../../services/users';
import { useNavigate } from 'react-router-dom';

const AccountPage = (props: { user: User | null | undefined }) => {
  const navigate = useNavigate();
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

  const userAccounts = accounts.filter(
    (account) => account.owner === props.user?.id
  );

  const handleDelete = (id: string | undefined) => {
    if (
      window.confirm(`Delete ${props.user?.firstName} ${props.user?.lastName}`)
    ) {
      const userAccount = accounts.find((account) => account.owner === id);
      accountsService
        .deleteAccount(userAccount?.id)
        .then((response) => console.log(response));
      usersService
        .deleteUser(id as string)
        .then((response) => console.log(response));
    }
    navigate('/dashboard-staff/search/users');
  };

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
          <button
            className='delete'
            onClick={() => handleDelete(props.user?.id)}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
