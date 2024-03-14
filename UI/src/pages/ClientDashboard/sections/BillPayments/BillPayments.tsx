import { useNavigate } from 'react-router-dom';
import './BillPayments.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Account, User } from '../../../../types';
import accountsService from '../../../../services/accounts';

const BillPayments = () => {
  const navigate = useNavigate();
  const [openSelectBox, setOpenSelectBox] = useState(false);
  const [openAccountSelectBox, setOpenAccountSelectBox] = useState(false);
  const [user, setUser] = useState<User>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [accountToShow, setAccountToShow] = useState<Account>();
  const [category, setCategory] = useState('');
  const [biller, setBiller] = useState('');

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

  const billPayServices = [
    {
      id: 1,
      name: 'CABLE TV',
    },
    {
      id: 2,
      name: 'DATA PURCHASE',
    },
    {
      id: 3,
      name: 'EDUCATION',
    },
    {
      id: 4,
      name: 'FINANCIAL SERVICES',
    },
    {
      id: 5,
      name: 'INSURANCE',
    },
  ];

  return (
    <div className='bill-pay'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() => navigate('/dashboard-client')}
        />
        <h2>Payments</h2>
      </div>
      <div className='body'>
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

        <div className='select' onClick={() => setOpenSelectBox(true)}>
          <div className='text'>
            <p className={'text-head ' + (category && 'reduce-category')}>
              Category
            </p>
            {category}
          </div>
          <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
        </div>

        {category && (
          <div className='select'>
            <div className='text'>
              <p className={'text-head ' + (biller && 'reduce-biller')}>
                Biller
              </p>
              {biller}
            </div>
            <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
          </div>
        )}
        <div className={'select-box ' + (openSelectBox && 'active')}>
          <div className='select-box-top'>
            <CloseIcon
              fontSize='large'
              className='close-icon'
              onClick={() => setOpenSelectBox(false)}
            />
            <h3>Category</h3>
          </div>
          {billPayServices.map((service) => (
            <div
              key={service.id}
              className='bill-pay-service'
              onClick={() => {
                setCategory(service.name);
                setOpenSelectBox(false);
              }}
            >
              {service.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillPayments;
