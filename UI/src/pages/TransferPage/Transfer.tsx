import { useEffect, useState } from 'react';
import FormInput from '../../components/FormInput';
import './Transfer.scss';
import { Account, NewTransaction, TransferType, User } from '../../types';
import { useNavigate } from 'react-router-dom';
import accountService from '../../services/accounts';
import userService from '../../services/users';
import transactionsService from '../../services/transactions';

const Transfer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<Array<User>>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [accountForTransfer, setAccountForTransfer] = useState<number>();
  const [transferPin, setTransferPin] = useState<string>('');
  const [selected, setSelected] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accountErrorMessage, setAccountErrorMessage] = useState<string | null>(
    null
  );

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
  const receivingAccount = accounts.find(
    (account) => account.accountNumber === Number(transferDetials.accountNumber)
  );

  const receivingAccountOwner = users?.find(
    (user) => user.id === receivingAccount?.owner
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
      errorMessage: accountErrorMessage ? accountErrorMessage : '',
      // errorMessage: `Can't find account with account number ${transferDetials.accountNumber}`,
      label: 'Account Number',
      // pattern: accounts.some(
      //   (account) =>
      //     account.accountNumber === Number(transferDetials.accountNumber)
      // ),
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sendingAccount?.status === 'active') {
      if (receivingAccount) {
        if (user?.transferPin === transferPin) {
          const updatedSendingAccount = {
            ...sendingAccount,
            balance:
              sendingAccount &&
              sendingAccount?.balance - Number(transferDetials.amount),
          };

          const updatedRecievingAccount = {
            ...receivingAccount,
            balance:
              receivingAccount &&
              receivingAccount?.balance + Number(transferDetials.amount),
          };

          accountService
            .debit(
              sendingAccount?.id as string,
              updatedSendingAccount as Account
            )
            .then((response) => console.log(response));

          accountService
            .credit(
              receivingAccount?.id as string,
              updatedRecievingAccount as Account
            )
            .then((response) => console.log(response));

          const newCreditTransaction: NewTransaction = {
            accountNumber: receivingAccount?.accountNumber,
            createdOn: new Date(),
            type: 'credit',
            amount: Number(transferDetials.amount),
            oldBalance: receivingAccount?.balance,
            newBalance: updatedRecievingAccount.balance,
          };

          const newDebitTransaction: NewTransaction = {
            accountNumber: sendingAccount?.accountNumber,
            createdOn: new Date(),
            type: 'debit',
            amount: Number(transferDetials.amount),
            oldBalance: sendingAccount?.balance,
            newBalance: updatedSendingAccount.balance,
          };

          transactionsService
            .newCreditTransaction(newCreditTransaction)
            .then((response) => console.log(response));

          transactionsService
            .newDebitTransaction(newDebitTransaction)
            .then((response) => console.log(response));

          navigate('/dashboard-client');

          setTransferDetials({
            ...transferDetials,
            bankName: '',
            amount: '',
            accountNumber: '',
          });
        } else {
          setErrorMessage('Wrong transfer pin');
          setOpenConfirm(false);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        }
      } else {
        setAccountErrorMessage(
          `Can't find account with account number ${transferDetials.accountNumber}`
        );
        // setOpenConfirm(false);
        // setTimeout(() => {
        //   setErrorMessage(null);
        // }, 5000);
      }
    } else {
      setErrorMessage(
        'Your account is not active for transfers. Please visit our branch near you'
      );
      setOpenConfirm(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  console.log(receivingAccount);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferDetials({ ...transferDetials, [e.target.name]: e.target.value });
    if (e.target.name === 'accountNumber') {
      accounts.some(
        (account) =>
          account.accountNumber === Number(transferDetials.accountNumber)
      )
        ? setAccountErrorMessage(null)
        : setAccountErrorMessage(
            `Can't find account with account number ${transferDetials.accountNumber}!`
          );
    }
  };

  return (
    <div className='transfer'>
      {errorMessage && <div className='error'>{errorMessage}</div>}
      {/* {accountErrorMessage && (
        <div className='error'>{accountErrorMessage}</div>
      )} */}
      <div className={'confirm-container ' + (openConfirm && 'active')}>
        <div className='confirm'>
          <h3>Tranfer Confirmation</h3>
          <div className='seperator'></div>
          Transfer &#8358;{transferDetials.amount} to{' '}
          {receivingAccountOwner?.firstName} {receivingAccountOwner?.lastName}{' '}
          with account number {receivingAccount?.accountNumber} of{' '}
          {transferDetials.bankName}
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
          {user?.transferPin === '' && (
            <p
              className='set-pin'
              onClick={() =>
                navigate(`/dashboard-client/${user.id}/set-transfer-pin`)
              }
            >
              Set Transfer Pin
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Transfer;
