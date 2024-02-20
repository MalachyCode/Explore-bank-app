import { useEffect, useState } from 'react';
import FormInput from '../../components/FormInput';
import './Transfer.scss';
import { Account, TransferType, User } from '../../types';
import { useNavigate } from 'react-router-dom';
import accountService from '../../services/accounts';

const Transfer = () => {
  const navigate = useNavigate();
  const [transferDetials, setTransferDetials] = useState<TransferType>({
    bankName: '',
    accountNumber: '',
    amount: '',
  });
  const [user, setUser] = useState<User>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  const formInputs = [
    {
      id: 'bankName',
      name: 'bankName',
      type: 'text',
      placeholder: 'Bank Name',
      errorMessage: 'Enter a valid bank name',
      label: 'Bank Name',
      required: true,
    },
    {
      id: 'accountNumber',
      name: 'accountNumber',
      type: 'text',
      placeholder: 'Account Number',
      errorMessage: 'Enter a valid account number',
      label: 'Account Number',
      required: true,
    },
    {
      id: 'amount',
      name: 'amount',
      type: 'text',
      placeholder: 'Amount',
      errorMessage: 'Enter transfer amount',
      label: 'Amount',
      required: true,
    },
  ];

  // const date = new Date();
  // console.log(date);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard-client');
    console.log(
      `You transfered ${transferDetials.amount} to ${transferDetials.accountNumber} of bank ${transferDetials.bankName}`
    );
    setTransferDetials({
      ...transferDetials,
      bankName: '',
      amount: '',
      accountNumber: '',
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferDetials({ ...transferDetials, [e.target.name]: e.target.value });
  };

  return (
    <div className='transfer'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='account-balance-container'>
          {userAccounts.map((account) => (
            <div className='account-balance'>&#8358; {account.balance}</div>
          ))}
        </div>
        <div className='daily-limit-box'>
          <div className='total'>
            <span>daily limit</span>1,000,000
          </div>
          <div className='remaining'>
            <span>remaining</span>950,000
          </div>
        </div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={transferDetials[input.name as keyof TransferType]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Transfer
        </button>
      </form>
    </div>
  );
};

export default Transfer;
