import { useEffect, useState } from 'react';
import { RenderTotals } from '../../../components/RenderIconsandTotals';
import accountsService from '../../../services/accounts';
import { Account, User } from '../../../types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './SelectAccount.scss';
import { useNavigate } from 'react-router-dom';

const SelectAccount = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((transactions) => setAccounts(transactions));
  }, []);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  return (
    <div className='select-account'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() => navigate('/dashboard-client')}
        />
        <h2>Select Account</h2>
      </div>
      <div className='container'>
        <h3 className='header'>Select Account</h3>
        {userAccounts.map((account) => (
          <RenderTotals
            key={account.id}
            status={account.status}
            balance={account.balance}
            accountNum={account.accountNumber}
            className='total'
            id={account.id}
            onClick='toAccountAllTransactions'
          />
        ))}
      </div>
    </div>
  );
};

export default SelectAccount;
