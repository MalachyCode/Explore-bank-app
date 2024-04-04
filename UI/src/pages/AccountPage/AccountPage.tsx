import { useEffect, useState } from 'react';
import { Account, NewTransaction, User } from '../../types';
import './AccountPage.scss';
import accountsService from '../../services/accounts';
import usersService from '../../services/users';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import transactionsService from '../../services/transactions';

interface TransactionType {
  amount: string;
  description: string;
}

const RenderFormInput = (props: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  detail: string | undefined;
}) => (
  <div className='input-box'>
    {props.label === 'Amount' && <span className='naira-symbol'>&#8358;</span>}
    <input type='text' onChange={props.onChange} />
    <span
      className={
        'placeholder ' +
        (props.detail && 'active ') +
        (props.label === 'Amount' && 'amount')
      }
    >
      {props.label}
    </span>
  </div>
);

const AccountPage = (props: { user: User | null | undefined }) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<User | null>();
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
  const [activeDeactivateBox, setActiveDeactivateBox] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setLoggedInUser(retrievedUser);
    }
    accountsService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  const userAccounts = accounts.filter(
    (account) => account.owner === props.user?.id
  );

  const accountToDeactivateOrActivate = userAccounts.find(
    (account) => account.accountNumber === Number(accountNumber)
  );

  const handleDelete = (id: string | undefined) => {
    if (
      window.confirm(`Delete ${props.user?.firstName} ${props.user?.lastName}`)
    ) {
      userAccounts.forEach((account) =>
        accountsService
          .deleteAccount(account?.id)
          .then((response) => console.log(response))
      );

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

      if (accountToUpdateForDebit) {
        const debitedAccount = {
          ...accountToUpdateForDebit,
          balance:
            accountToUpdateForDebit &&
            accountToUpdateForDebit?.balance -
              Number(transactionDetails.amount),
        };

        const newDebitTransaction: NewTransaction = {
          accountNumber: accountToUpdateForDebit?.accountNumber,
          createdOn: new Date(),
          type: 'debit',
          cashier: loggedInUser?.id,
          amount: Number(transactionDetails.amount),
          oldBalance: accountToUpdateForDebit?.balance,
          newBalance: debitedAccount.balance,
          description: `Over counter debit transaction at Explore Bank branch by cashier: ${loggedInUser?.firstName} ${loggedInUser?.lastName}; ${transactionDetails.description}`,
        };

        console.log(accountToUpdateForDebit);
        console.log(debitedAccount);

        accountsService
          .debit(
            accountToUpdateForDebit?.id as string,
            debitedAccount as Account
          )
          .then((response) => console.log(response));

        transactionsService
          .newDebitTransaction(newDebitTransaction)
          .then((response) => console.log(response));
      }
    }

    if (transactionType === 'credit') {
      console.log(transactionDetails, 'credit');

      const accountToUpdateForCredit = userAccounts.find(
        (account) => account.accountNumber === Number(accountNumber)
      );

      if (accountToUpdateForCredit) {
        const creditedAccount = {
          ...accountToUpdateForCredit,
          balance:
            accountToUpdateForCredit &&
            accountToUpdateForCredit?.balance +
              Number(transactionDetails.amount),
        };

        const newCreditTransaction: NewTransaction = {
          accountNumber: accountToUpdateForCredit?.accountNumber,
          createdOn: new Date(),
          type: 'credit',
          cashier: loggedInUser?.id,
          amount: Number(transactionDetails.amount),
          oldBalance: accountToUpdateForCredit?.balance,
          newBalance: creditedAccount.balance,
          description: `Over counter credit transaction at Explore Bank branch by cashier: ${loggedInUser?.firstName} ${loggedInUser?.lastName}; ${transactionDetails.description}`,
        };

        console.log(accountToUpdateForCredit);
        console.log(creditedAccount);

        accountsService
          .credit(
            accountToUpdateForCredit?.id as string,
            creditedAccount as Account
          )
          .then((response) => console.log(response));

        transactionsService
          .newCreditTransaction(newCreditTransaction)
          .then((response) => console.log(response));
      }
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

  const handleActivateDeactivate = () => {
    const messageVariable =
      accountToDeactivateOrActivate?.status === 'active'
        ? 'Deactivate'
        : 'Activate';
    if (window.confirm(`${messageVariable} ${accountNumber}`)) {
      const userAccount = accounts.find(
        (account) => account.accountNumber === Number(accountNumber)
      );
      const deactivatedActivatedAccount = {
        ...userAccount,
        status: userAccount?.status === 'active' ? 'dormant' : 'active',
      };
      accountsService
        .deactivateActivate(
          userAccount?.id,
          deactivatedActivatedAccount as Account
        )
        .then((response) => console.log(response));
    }
    setAccountNumber('');
    navigate('/dashboard-staff/search/users');
  };

  const formInputs = [
    {
      id: 1,
      label: 'Amount',
      detail: transactionDetails.amount,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTransactionDetails({
          ...transactionDetails,
          amount: e.target.value,
        }),
    },
    {
      id: 2,
      label: 'Description',
      detail: transactionDetails.description,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTransactionDetails({
          ...transactionDetails,
          description: e.target.value,
        }),
    },
  ];

  console.log(accountNumber);
  console.log(accountToDeactivateOrActivate);
  console.log(typeof accountNumber);

  return (
    <div className='account-page'>
      <div className='container'>
        <div className={'transaction-box ' + (openTransactionBox && 'open')}>
          <CloseIcon
            className='close'
            onClick={() => {
              setTransactionDetails({
                ...transactionDetails,
                amount: '',
                description: '',
              });
              setOpenTransactionBox(false);
            }}
          />
          <div className='form-container'>
            <form onSubmit={handleTransaction}>
              {formInputs.map((input) => (
                <RenderFormInput
                  label={input.label}
                  onChange={input.onChange}
                  detail={input.detail}
                  key={input.id}
                />
              ))}
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
        </div>
        <div
          className={
            'activate-deactivate-box ' + (activeDeactivateBox && 'open')
          }
        >
          <CloseIcon
            className='close'
            onClick={() => setActiveDeactivateBox(false)}
          />
          <div className={'activate-deactivate'}>
            <h3>Deactivate Account</h3>
            <form onSubmit={handleActivateDeactivate}>
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
              <button type='submit' className='btn'>
                {accountToDeactivateOrActivate?.status === 'active' ||
                !accountToDeactivateOrActivate
                  ? 'Deactivate'
                  : 'Activate'}
              </button>
            </form>
          </div>
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
          {!loggedInUser?.isAdmin && (
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
          {!loggedInUser?.isAdmin && (
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
          <button onClick={() => setActiveDeactivateBox(true)}>
            Deactivate Account
          </button>
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
