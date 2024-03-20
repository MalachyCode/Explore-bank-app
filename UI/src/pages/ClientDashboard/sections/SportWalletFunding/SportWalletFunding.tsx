import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import accountsService from '../../../../services/accounts';
import transactionsService from '../../../../services/transactions';
import './SportWalletFunding.scss';
import {
  Account,
  BillPaymentType,
  NewTransaction,
  User,
} from '../../../../types';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SelectBox from '../BillPayments/comoponents/SelectBox/SelectBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  billerProductsSportsBet,
  billerProductsTest,
  sportsBetBillerOptions,
} from './components/BillerAndProducts';
// import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SportWalletFunding = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [accountToShow, setAccountToShow] = useState<Account>();
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAccountSelectBox, setOpenAccountSelectBox] = useState(false);
  const [openSelectBox, setOpenSelectBox] = useState(false);
  const [servicesToShow, setServicesToShow] = useState('');
  const [biller, setBiller] = useState('');
  const [product, setProduct] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<BillPaymentType>({
    amount: '',
    pin: '',
    description: '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (accountToShow?.status === 'active') {
      if (user?.transferPin === paymentDetails.pin) {
        const updatedSendingAccount = {
          ...accountToShow,
          balance:
            accountToShow &&
            accountToShow?.balance - Number(paymentDetails.amount),
        };
        accountsService
          .debit(accountToShow?.id as string, updatedSendingAccount as Account)
          .then((response) => console.log(response));

        const newDebitTransaction: NewTransaction = {
          accountNumber: accountToShow?.accountNumber,
          createdOn: new Date(),
          type: 'debit',
          amount: Number(paymentDetails.amount),
          oldBalance: accountToShow?.balance,
          newBalance: updatedSendingAccount.balance,
          description: `Top up ${paymentDetails.amount} for user ${paymentDetails.phoneNumber} To ${biller} account. For service ${product}: ${paymentDetails.description}`,
        };
        transactionsService
          .newDebitTransaction(newDebitTransaction)
          .then((response) => console.log(response));

        navigate('/dashboard-client');

        setBiller('');
        setProduct('');
        setPaymentDetails({
          ...paymentDetails,
          amount: '',
          pin: '',
          description: '',
          phoneNumber: '',
        });
      } else {
        toast.error('Wrong transfer pin', {
          position: 'top-center',
        });
      }
    } else {
      toast.error(
        'Your account is not active. Please visit our branch near you to reactivate',
        {
          position: 'top-center',
        }
      );
    }
  };

  return (
    <div className='sport-wallet-funding'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() => navigate('/dashboard-client')}
        />
        <h2>Sport Wallet Funding</h2>
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

        {/* select box for bill pay biller */}

        <div
          className='select'
          onClick={() => {
            setServicesToShow('Biller');
            setOpenSelectBox(true);
          }}
        >
          <div className='text'>
            <p className={'text-head ' + (biller && 'reduce-biller')}>Biller</p>
            {biller}
          </div>
          <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
        </div>
        {biller && (
          <div className='product-and-form-container'>
            <div
              className='select'
              onClick={() => {
                setServicesToShow('Product');
                setOpenSelectBox(true);
              }}
            >
              <div
                className='text'
                style={{ paddingTop: 0, paddingBottom: 6, height: 47 }}
              >
                <p className={'text-head ' + (product && 'reduce-product')}>
                  Product
                </p>
                {product}
              </div>
              <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
            </div>
            <form onSubmit={handleSubmit}>
              <div className='input-box'>
                <span className='naira-symbol'>&#8358;</span>
                <input
                  type='text'
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      amount: e.target.value,
                    })
                  }
                />
                <span
                  className={
                    'placeholder amount ' + (paymentDetails.amount && 'active')
                  }
                >
                  Amount
                </span>
              </div>
              <div className='input-box'>
                <input
                  type='text'
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      phoneNumber: e.target.value,
                    })
                  }
                />
                <span
                  className={
                    'placeholder ' + (paymentDetails.phoneNumber && 'active')
                  }
                >
                  Phone Number
                </span>
              </div>
              <div className='input-box'>
                <input
                  type='text'
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      description: e.target.value,
                    })
                  }
                />
                <span
                  className={
                    'placeholder ' + (paymentDetails.description && 'active')
                  }
                >
                  Description
                </span>
              </div>
              <div className='input-box'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      pin: e.target.value,
                    })
                  }
                />
                <span
                  className={'placeholder ' + (paymentDetails.pin && 'active')}
                >
                  Pin
                </span>
                <VisibilityIcon
                  className='show-password-icon'
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <button type='submit'>Pay</button>
            </form>
          </div>
        )}
        <SelectBox
          services={
            servicesToShow === 'Biller'
              ? sportsBetBillerOptions
              : servicesToShow === 'Product'
              ? billerProductsSportsBet
              : billerProductsTest
          }
          openSelectBox={openSelectBox}
          setOptions={servicesToShow === 'Biller' ? setBiller : setProduct}
          setOpenSelectBox={setOpenSelectBox}
          header={servicesToShow}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SportWalletFunding;
