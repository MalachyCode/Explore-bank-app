import { useNavigate } from 'react-router-dom';
import './FinancialHealthCheckPage.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import accountsService from '../../../../services/accounts';
import { Account } from '../../../../types';

const FinancialHealthCheckPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account>();
  const [accountNumber, setAccountNumber] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [financialStatus, setFinancialStatus] = useState('');

  useEffect(() => {
    if (
      accountNumber &&
      accountNumber.length === 10 &&
      !isNaN(Number(accountNumber))
    ) {
      setDisableButton(false);
    } else if (
      (accountNumber.length === 10 && isNaN(Number(accountNumber))) ||
      accountNumber.length > 10
    ) {
      toast.error('Account number must be 10 numbers', {
        position: 'top-center',
      });
    } else {
      setDisableButton(true);
    }
  }, [accountNumber]);

  const checkFinancialStatus = (account: Account) => {
    if (account.balance <= 10000) {
      return 'Critical';
    }
    if (account.balance > 10000 && account.balance <= 30000) {
      return 'Okay';
    }
    if (account.balance > 30000 && account.balance <= 50000) {
      return 'Good';
    }
    if (account.balance > 50000 && account.balance <= 100000) {
      return 'Great';
    }
    if (account.balance > 100000) {
      return 'Excellent';
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    accountsService
      .findByAccountNumber({ accountNumber: Number(accountNumber) })
      .then((response) => {
        console.log(response);

        setAccount(response);

        const financialStat = checkFinancialStatus(response as Account);

        if (financialStat) {
          setFinancialStatus(financialStat);
        }

        toast.success(`Account found successfully! ${response.status}`, {
          position: 'top-center',
        });
      })
      .catch((e) => {
        toast.error(`${e.response.data.error}, please confirm account.`, {
          position: 'top-center',
        });
      });

    setAccountNumber('');
  };

  console.log(account);

  return (
    <div className='financial-health-check'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Financial Health Check</h2>
      </div>
      <div className='body'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Enter Account Number</h2>
          <input
            type='text'
            className='form-input'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <button
            className={'btn ' + (disableButton && 'disabled')}
            type='submit'
            disabled={disableButton}
          >
            Check
          </button>
        </form>
        {account && (
          <div className={'check-result-box'}>
            <div
              className={
                'account-circle-container ' +
                (financialStatus && financialStatus)
              }
            >
              <div className='account-circle'>
                <span className='header'>Balance</span>
                <span
                  className={
                    'account-balance ' + (financialStatus && financialStatus)
                  }
                >
                  {account.balance}
                </span>
                <span className='account-number'>{account.accountNumber}</span>
              </div>
            </div>
            <div className='color-bar-container'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className='financial-status-container'>
              Financial Status: {financialStatus}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FinancialHealthCheckPage;
