import { useEffect, useState } from 'react';
import './MobileTopUp.scss';
import { Account, MobileTopUpType, User } from '../../types';
import FormInput from '../../components/FormInput';
import { RenderIcons } from '../../components/RenderIconsandTotals';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import accountsService from '../../services/accounts';

const MobileTopUp = () => {
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((accounts) => {
      setAccounts(accounts);
      setAccountToShow(accounts[0])
    });
  }, []);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  // console.log(userAccounts);

  // console.log(topupDetails.amount.split('.')[0]);
  // console.log(networkProvider);

  console.log(accountToShow);

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
      <div
        className={'account-select-box ' + (openAccountSelectBox && 'active')}
      >
        <div>Account</div>
        {userAccounts.map((account) => (
          <div className='account-to-select' onClick={() => {
            setAccountToShow(account);
            setOpenAccountSelectBox(false);
            }}>
            <div>
              {user?.firstName} {user?.lastName}
            </div>
            <div>
              {account.accountNumber} . &#8358; {account.balance} . REGULAR
            </div>
          </div>
        ))}
      </div>

      <form className='form' onSubmit={handleSubmit}>
        {/* <strong className='form-header'>Mobile Top-Up</strong>
        <div className='form-header-seperator'></div> */}

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
          Top-Up
        </button>
      </form>
    </div>
  );
};

export default MobileTopUp;
