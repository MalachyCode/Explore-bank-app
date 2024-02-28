import { useEffect, useState } from 'react';
import { Account, User } from '../../types';
import './AccountPage.scss';
import accountsService from '../../services/accounts';
import usersService from '../../services/users';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import CloseIcon from '@mui/icons-material/Close';

interface TransactionDetails {
  amount: string;
  description: string;
}

const AccountPage = (props: { user: User | null | undefined }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [transactionDetials, setTransactionDetials] =
    useState<TransactionDetails>({
      amount: '',
      description: '',
    });
  const [transactionType, setTransactionType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [transactionBoxOpen, setTransactionBoxOpen] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  const formInputs = [
    {
      id: 'amount',
      name: 'amount',
      type: 'text',
      placeholder: 'Amount',
      errorMessage: 'Enter transfer amount',
      label: 'Amount',
      required: true,
    },
    {
      id: 'description',
      name: 'description',
      type: 'text',
      placeholder: 'Description',
      errorMessage: `Enter transaction description longer than 5 characters`,
      label: 'Description',
      // pattern: '^[A-Za-z0-9]{5,500}$',
      required: true,
    },
  ];

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionDetials({
      ...transactionDetials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='account-page'>
      <div className={'transaction-box ' + (transactionBoxOpen && 'open')}>
        <CloseIcon
          className='close'
          onClick={() => setTransactionBoxOpen(false)}
        />
        <form
          className='form'
          onSubmit={(e) => {
            console.log(transactionType);
            console.log(accountNumber);
            console.log(transactionDetials.amount);
            console.log(transactionDetials.description);
            console.log(accountNumber);

            e.preventDefault();
          }}
        >
          <label htmlFor='accountType'>Account Type</label>
          <select
            name='accountType'
            id='accountType'
            value={transactionType}
            className='form-select'
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value='debit'>Debit</option>
            <option value='credit'>Credit</option>
          </select>
          <label htmlFor='accountNumber'>Account Number</label>
          <select
            name='accountNumber'
            id='accountNumber'
            value={`${accountNumber}`}
            className='form-select'
            onChange={(e) => setAccountNumber(e.target.value)}
          >
            {userAccounts.map((account) => (
              <option key={account.id} value={account.accountNumber}>
                {account.accountNumber}
              </option>
            ))}
          </select>
          {formInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={transactionDetials[input.name as keyof TransactionDetails]}
              onChange={onChange}
            />
          ))}
          <button type='submit' className='btn'>
            {transactionType === 'debit' ? 'Debit' : 'Credit'}
          </button>
        </form>
      </div>
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
          {!user?.isAdmin && (
            <button
              className='debit'
              onClick={() => {
                setTransactionBoxOpen(true);
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
                setTransactionBoxOpen(true);
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
