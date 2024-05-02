import { useEffect, useState } from 'react';
import { RenderTotals } from '../../../components/RenderIconsandTotals';
import accountsService from '../../../services/accounts';
import { Account } from '../../../types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './SelectAccount.scss';
import { useNavigate } from 'react-router-dom';

const SelectAccount = () => {
  const navigate = useNavigate();
  const [userAccounts, setUserAccounts] = useState<Array<Account>>();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      accountsService
        .findUserAccounts({ owner: retrievedUser.id })
        .then((retrievedUserAccounts) => {
          setUserAccounts(retrievedUserAccounts);
        });
    }
  }, []);

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
        {userAccounts?.map((account) => (
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
