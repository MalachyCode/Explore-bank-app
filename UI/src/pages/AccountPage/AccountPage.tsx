import { useEffect, useState } from 'react';
import { Account, User } from '../../types';
import './AccountPage.scss';
import accountsService from '../../services/accounts';
import usersService from '../../services/users';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
// import Select from 'react-select';

interface TransactionType {
  amount: string;
  description: string;
}

const AccountPage = (props: { user: User | null | undefined }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [transactionDetails, setTransactionDetails] = useState<TransactionType>(
    {
      amount: '',
      description: '',
    }
  );
  const [openTransactionBox, setOpenTransactionBox] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

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

  const handleTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (transactionType === 'debit') {
      console.log(transactionDetails, 'debit');
      const accountToUpdateForDebit = userAccounts.find(
        (account) => account.accountNumber === Number(accountNumber)
      );

      const debitedAccount = {
        ...accountToUpdateForDebit,
        balance:
          accountToUpdateForDebit &&
          accountToUpdateForDebit?.balance - Number(transactionDetails.amount),
      };

      console.log(accountToUpdateForDebit);
      console.log(debitedAccount);

      accountsService
        .debit(accountToUpdateForDebit?.id as string, debitedAccount as Account)
        .then((response) => console.log(response));
    }
    if (transactionType === 'credit') {
      console.log(transactionDetails, 'credit');
      const accountToUpdateForCredit = userAccounts.find(
        (account) => account.accountNumber === Number(accountNumber)
      );

      const creditedAccount = {
        ...accountToUpdateForCredit,
        balance:
          accountToUpdateForCredit &&
          accountToUpdateForCredit?.balance + Number(transactionDetails.amount),
      };

      console.log(accountToUpdateForCredit);
      console.log(creditedAccount);

      accountsService
        .credit(
          accountToUpdateForCredit?.id as string,
          creditedAccount as Account
        )
        .then((response) => console.log(response));
    }

    setOpenTransactionBox(false);

    setAccountNumber('');
    setTransactionDetails({
      ...transactionDetails,
      amount: '',
      description: '',
    });
    navigate('/dashboard-staff/search/users/');
  };

  console.log(accountNumber);

  console.log(typeof accountNumber);

  return (
    <div className='account-page'>
      <div className='container'>
        <div className={'transaction-box ' + (openTransactionBox && 'open')}>
          <CloseIcon
            className='close'
            onClick={() => setOpenTransactionBox(false)}
          />
          <form className='form' onSubmit={handleTransaction}>
            <label htmlFor='amount' className='form-label'>
              Amount
            </label>
            <input
              type='text'
              name='amount'
              id='amount'
              className='form-input'
              value={transactionDetails.amount}
              placeholder='Amount'
              onChange={(e) =>
                setTransactionDetails({
                  ...transactionDetails,
                  amount: e.target.value,
                })
              }
              required
            />
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <input
              type='text'
              name='description'
              id='description'
              className='form-input'
              value={transactionDetails.description}
              placeholder='Description'
              onChange={(e) =>
                setTransactionDetails({
                  ...transactionDetails,
                  description: e.target.value,
                })
              }
              required
            />
            <label htmlFor='accountNumber' className='form-label select'>
              Account Number
            </label>
            <select
              name='accountNumber'
              id='accountNumber'
              value={accountNumber}
              className='form-select'
              onChange={(e) => {
                console.log(e.target.value);
                setAccountNumber(e.target.value);
              }}
            >
              <option value=''>Select Account Number</option>
              {userAccounts.map((account) => (
                <option key={account.id} value={`${account.accountNumber}`}>
                  {account.accountNumber}
                </option>
              ))}
            </select>
            <button className='btn'>
              {transactionType === 'credit' ? 'Credit' : 'Debit'}
            </button>
          </form>
        </div>
        <div className='details-container'>
          <div className='name-container'>
            <span>Account Name</span>
            {props.user?.firstName} {props.user?.lastName}
          </div>
          <div className='account-number-container'>
            <span>Account Number(s)</span>
            {userAccounts.map((account) => (
              <div key={account.id}>{account.accountNumber}</div>
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
          {!user?.isAdmin && (
            <button
              className='debit'
              onClick={() => {
                setOpenTransactionBox(true);
                setTransactionType('debit');
              }}
            >
              Debit Account
            </button>
          )}
          {!user?.isAdmin && (
            <button
              className='credit'
              onClick={() => {
                setOpenTransactionBox(true);
                setTransactionType('credit');
              }}
            >
              Credit Account
            </button>
          )}
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
