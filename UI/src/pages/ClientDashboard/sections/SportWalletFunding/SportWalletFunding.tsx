import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import accountsService from '../../../../services/accounts';
import transactionsService from '../../../../services/transactions';
import './SportWalletFunding.scss';
import {
  Account,
  BarChartInfo,
  BillPaymentType,
  NewTransaction,
  Notification,
  User,
} from '../../../../types';
import { useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SelectBox from '../BillPayments/comoponents/SelectBox/SelectBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  billerProductsSportsBet,
  billerProductsTest,
  sportsBetBillerOptions,
} from './components/BillerAndProducts';
// import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notificationsService from '../../../../services/notifications';
import usersService from '../../../../services/users';
import barChartInfoUpdater from '../../../../functions/barChartInfoUpdater';
import incomeExpenseService from '../../../../services/incomeExpense';

// import sgMail from '@sendgrid/mail';
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com', // Use the email address or domain you verified above
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };

const SportWalletFunding = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
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
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [userAccounts, setUserAccounts] = useState<Array<Account>>();
  const [disableButton, setDisableButton] = useState(true);
  const [userBarChartInfo, setUserBarChartInfo] = useState<BarChartInfo>();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setUser(retrievedUser);

      accountsService
        .findUserAccounts({ owner: retrievedUser.id })
        .then((retrievedUserAccounts) => {
          setAccountToShow(retrievedUserAccounts[0]);

          setUserAccounts(retrievedUserAccounts);
        });

      incomeExpenseService
        .findUserBarChartInfo({ owner: retrievedUser.id })
        .then((returnedData) => setUserBarChartInfo(returnedData));
    }

    notificationsService
      .getAll()
      .then((retrievedNotifications) =>
        setNotifications(retrievedNotifications)
      );
  }, []);

  useEffect(() => {
    if (user) {
      if (biller && product) {
        if (accountToShow?.status === 'active') {
          if (
            paymentDetails.amount &&
            !isNaN(Number(paymentDetails.amount)) &&
            paymentDetails.amount.length > 2
          ) {
            if (accountToShow.balance >= Number(paymentDetails.amount)) {
              if (
                paymentDetails.phoneNumber?.length === 11 &&
                !isNaN(Number(paymentDetails.phoneNumber))
              ) {
                setDisableButton(false);
                return;
              }
            } else {
              toast.error('Insufficient balance', {
                position: 'top-center',
              });
            }
          }
        } else {
          toast.error(
            'Your account is not active for transfers. Please visit our branch near you',
            {
              position: 'top-center',
            }
          );
        }
      }
    }
    setDisableButton(true);
  }, [
    accountToShow?.balance,
    accountToShow?.status,
    biller,
    paymentDetails.amount,
    paymentDetails.phoneNumber,
    product,
    user,
  ]);

  const userAccountNotificationBox = notifications.find(
    (notification) => notification.owner === user?.id
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && accountToShow) {
      try {
        const isPinValid = await usersService.checkPin({
          email: user.email,
          transferPin: paymentDetails.pin,
        });

        if (isPinValid) {
          const updatedSendingAccount = {
            ...accountToShow,
            balance:
              accountToShow &&
              accountToShow?.balance - Number(paymentDetails.amount),
          };

          accountsService
            .updateAccount(accountToShow?.id, updatedSendingAccount)
            .then((response) => {
              console.log(response);

              if (userBarChartInfo) {
                barChartInfoUpdater(
                  userBarChartInfo,
                  'debit',
                  Number(paymentDetails.amount)
                );
              }

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
                .then((sportWalletFundingTransaction) => {
                  if (userAccountNotificationBox) {
                    const sportWalletFundingNotification: Notification = {
                      ...userAccountNotificationBox,
                      newNotifications:
                        userAccountNotificationBox?.newNotifications.concat({
                          message: sportWalletFundingTransaction.description,
                          accountId: accountToShow.id,
                          accountNumber: accountToShow.accountNumber,
                          transactionId: sportWalletFundingTransaction.id,
                        }),
                    };

                    notificationsService
                      .updateNotification(
                        userAccountNotificationBox?.id,
                        sportWalletFundingNotification
                      )
                      .then((response) => console.log(response));
                  }
                });

              navigate('/dashboard-client');
            })
            .catch((e) => {
              console.log(e);
              window.localStorage.clear();

              navigate('/login');
            });

          setBiller('');
          setProduct('');
          setPaymentDetails({
            ...paymentDetails,
            amount: '',
            pin: '',
            description: '',
            phoneNumber: '',
          });
        }
      } catch (e: any) {
        toast.error(e.response.data.error, {
          position: 'top-center',
        });
      }
    } else {
      toast.error('Account not selected or User not logged in', {
        position: 'top-center',
      });
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
            {userAccounts?.map((account) => (
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
                {showPassword ? (
                  <VisibilityOffIcon
                    className='show-password-icon'
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityIcon
                    className='show-password-icon'
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <button
                className={'btn ' + (disableButton && 'disabled')}
                type='submit'
                disabled={disableButton}
              >
                Pay
              </button>
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
