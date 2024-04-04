import { useEffect, useState } from 'react';
import './MobileTopUp.scss';
import {
  Account,
  MobileTopUpType,
  NewTransaction,
  User,
} from '../../../../types';
import FormInput from '../../../../components/FormInput';
import { RenderIcons } from '../../../../components/RenderIconsandTotals';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import accountsService from '../../../../services/accounts';
import transactionsService from '../../../../services/transactions';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MobileTopUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [topupDetails, setTopupDetails] = useState<MobileTopUpType>({
    phoneNumber: '',
    amount: '',
  });
  const [networkProvider, setNetworkProvider] = useState('');
  const [selected, setSelected] = useState(false);
  const [openAccountSelectBox, setOpenAccountSelectBox] = useState(false);
  const [accountToShow, setAccountToShow] = useState<Account>();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [transferPin, setTransferPin] = useState<string>('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((accounts) => {
      setAccounts(accounts);
      setAccountToShow(accounts[0]);
    });
  }, []);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  // console.log(userAccounts);

  // console.log(topupDetails.amount.split('.')[0]);
  // console.log(networkProvider);

  console.log(selected);

  const formInputs = [
    {
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'phoneNumber',
      placeholder: 'Mobile Number',
      label: 'Mobile Number',
      errorMessage: `Phone number should be 11 numbers and shouldn't include any letters`,
      pattern: '^[0-9]{11}$',
      required: true,
    },
    {
      id: 'amount',
      name: 'amount',
      type: 'text',
      placeholder: 'Enter Amount',
      errorMessage: 'Enter topup amount',
      label: 'Amount',
      required: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected) {
      if (accountToShow?.status === 'active') {
        if (user?.transferPin === transferPin) {
          const updatedSendingAccount = {
            ...accountToShow,
            balance:
              accountToShow &&
              accountToShow?.balance - Number(topupDetails.amount),
          };
          accountsService
            .debit(accountToShow?.id, updatedSendingAccount)
            .then((response) => console.log(response));

          const newDebitTransaction: NewTransaction = {
            accountNumber: accountToShow?.accountNumber,
            createdOn: new Date(),
            type: 'debit',
            amount: Number(topupDetails.amount),
            oldBalance: accountToShow?.balance,
            newBalance: updatedSendingAccount.balance,
            description: `Mobile TopUp of ${topupDetails.amount} For ${topupDetails.phoneNumber}`,
          };
          transactionsService
            .newDebitTransaction(newDebitTransaction)
            .then((response) => console.log(response));

          navigate('/dashboard-client');

          setTopupDetails({
            ...topupDetails,
            amount: '',
            phoneNumber: '',
          });
        } else {
          toast.error('Wrong transfer pin', {
            position: 'top-center',
          });
          setOpenConfirm(false);
          setTransferPin('');
        }
      } else {
        toast.error(
          'Your account is not active. Please visit our branch near you to reactivate',
          {
            position: 'top-center',
          }
        );
        setOpenConfirm(false);
        setTransferPin('');
      }
    } else {
      toast.error('Select a network provider', {
        position: 'top-center',
      });
      setOpenConfirm(false);
      setTransferPin('');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopupDetails({ ...topupDetails, [e.target.name]: e.target.value });
  };

  const logoInputs = [
    {
      id: 'mtnLogo',
      name: 'mtn',
      icon: '../../assets/mtn.256x256.png',
    },
    {
      id: 'gloLogo',
      name: 'glo',
      icon: '../../assets/globacom-limited.256x256.png',
    },
    {
      id: 'airtelLogo',
      name: 'airtel',
      icon: '../../assets/airtel-nigeria.220x256.png',
    },
    {
      id: 'nineMobileLogo',
      name: 'nineMobile',
      icon: '../../assets/9mobile.147x256.png',
    },
  ];

  const amountOptions = [
    { id: 1, value: '100.00' },
    { id: 2, value: '500.00' },
    { id: 3, value: '1000.00' },
    { id: 4, value: '2000.00' },
  ];

  return (
    <div className='mobile-topup'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() => navigate('/dashboard-client')}
        />
        <h2>Mobile Top-Up</h2>
      </div>
      <div className={'confirm-container ' + (openConfirm && 'active')}>
        <div className='confirm'>
          <h3>Top Up Confirmation</h3>
          <div className='seperator'></div>
          <p>
            Recharge &#8358;{topupDetails.amount} for {topupDetails.phoneNumber}
          </p>
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
              Top-Up
            </button>
          </form>
          <div className='cancel' onClick={() => setOpenConfirm(false)}>
            Cancel
          </div>
        </div>
      </div>

      {/* box (shows all accounts) to select account */}
      <div
        className={
          'account-select-box-container ' + (openAccountSelectBox && 'active')
        }
        onClick={() => setOpenAccountSelectBox(false)}
      >
        <div className='account-select-box'>
          <div>Account</div>
          {userAccounts.map((account) => (
            <div
              className='account-to-select'
              onClick={() => {
                setAccountToShow(account);
                setOpenAccountSelectBox(false);
              }}
              key={account.id}
            >
              <div>
                {user?.firstName} {user?.lastName}
              </div>
              <div>
                {account.accountNumber} . &#8358; {account.balance} . REGULAR
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          setOpenConfirm(true);
        }}
      >
        {/* box to show selected account */}
        <div
          className='total'
          onClick={() =>
            setOpenAccountSelectBox(!openAccountSelectBox ? true : false)
          }
        >
          <div className='total-info'>
            <h3>{`Account: ${accountToShow?.accountNumber}`}</h3>
            <strong>
              <h2 className='amount'>&#8358; {accountToShow?.balance}</h2>
            </strong>
            <p className='savings-percentage'>{`Status: ${accountToShow?.status}`}</p>
          </div>
          <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
        </div>
        <div className='logos-container'>
          {logoInputs.map((logoInput) => (
            <RenderIcons
              icon={logoInput.icon}
              // label={logoInput.label}
              key={logoInput.id}
              onClick={() => {
                setSelected(true);
                setNetworkProvider(logoInput.name);
              }}
              className={
                'item ' +
                (selected && logoInput.name === networkProvider ? 'active' : '')
              }
            />
          ))}
        </div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={topupDetails[input.name as keyof MobileTopUpType]}
            onChange={onChange}
          />
        ))}
        <div className='amount-option-box'>
          {amountOptions.map((option) => (
            <div
              onClick={() =>
                setTopupDetails({
                  ...topupDetails,
                  amount: option.value,
                })
              }
              key={option.id}
            >
              &#8358;{option.value}
            </div>
          ))}
        </div>
        <button type='submit' className='btn'>
          Proceed
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MobileTopUp;
