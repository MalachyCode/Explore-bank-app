import { useEffect, useState } from 'react';
import FormInput from '../../components/FormInput';
import './Transfer.scss';
import { Account, TransferType, User } from '../../types';
import { useNavigate } from 'react-router-dom';
import accountService from '../../services/accounts';
import userService from '../../services/users';

const Transfer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<Array<User>>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [accountForTransfer, setAccountForTransfer] = useState<number>();
  const [transferPin, setTransferPin] = useState<string>('');
  const [selected, setSelected] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [transferDetials, setTransferDetials] = useState<TransferType>({
    bankName: '',
    accountNumber: '',
    amount: '',
    from: '',
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    userService.getAll().then((users) => setUsers(users));
    accountService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  const sendingAccount = accounts.find(
    (account) => account.accountNumber === accountForTransfer
  );
  const destinationAccount = accounts.find(
    (account) => account.accountNumber === Number(transferDetials.accountNumber)
  );

  const destinationAccountOwner = users?.find(
    (user) => user.id === destinationAccount?.owner
  );

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
  console.log(accountForTransfer);

  // const date = new Date();
  // console.log(date);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedOriginAccount = {
      ...sendingAccount,
      balance:
        sendingAccount &&
        sendingAccount?.balance - Number(transferDetials.amount),
    };
    const updatedDestinationAccount = {
      ...destinationAccount,
      balance:
        destinationAccount &&
        destinationAccount?.balance + Number(transferDetials.amount),
    };

    accountService
      .transfer(
        sendingAccount?.id as string,
        updatedOriginAccount as Account,
        destinationAccount?.id as string,
        updatedDestinationAccount as Account
      )
      .then((response) => console.log(response));

    console.log(updatedOriginAccount);
    console.log(updatedDestinationAccount);
    console.log(Number(transferPin));

    navigate('/dashboard-client');
    // console.log(
    //   `You transfered ${transferDetials.amount} to ${transferDetials.accountNumber} of bank ${transferDetials.bankName}`
    // );
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
      <div className={'confirm-container ' + (openConfirm && 'active')}>
        <div className='confirm'>
          <h3>Tranfer Confirmation</h3>
          <div className='seperator'></div>
          Transfer &#8358;{transferDetials.amount} to{' '}
          {destinationAccountOwner?.firstName}{' '}
          {destinationAccountOwner?.lastName} with account number{' '}
          {destinationAccount?.accountNumber} of {transferDetials.bankName}
          <div className='confirmation-form'>
            <form className='form' onSubmit={handleSubmit}>
              <label htmlFor='pin' className='form-label'>
                <p>Enter Pin</p>
              </label>
              <input
                value={transferPin}
                className='form-input'
                id='pin'
                onChange={(e) => setTransferPin(e.target.value)}
                required
              />
              <button type='submit' className='btn'>
                Transfer
              </button>
            </form>
          </div>
          <div className='cancel' onClick={() => setOpenConfirm(false)}>
            Cancel
          </div>
        </div>
      </div>

      <div className='form-container'>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            setOpenConfirm(true);
          }}
        >
          <div className='account-balance-container'>
            {userAccounts.map((account) => (
              <div
                key={account.id}
                className={
                  'account-balance ' +
                  (selected && account.accountNumber === accountForTransfer
                    ? 'active'
                    : '')
                }
                onClick={() => {
                  setSelected(true);
                  setAccountForTransfer(account.accountNumber);
                }}
              >
                &#8358; {account.balance}
              </div>
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
    </div>
  );
};

export default Transfer;
