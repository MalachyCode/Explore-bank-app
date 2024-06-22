import { useEffect, useState } from 'react';
import './MobileTopUp.scss';
import {
  Account,
  BarChartInfo,
  MobileTopUpType,
  NewTransaction,
  Notification,
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
import notificationsService from '../../../../services/notifications';
import usersService from '../../../../services/users';
import barChartInfoUpdater from '../../../../functions/barChartInfoUpdater';
import incomeExpenseService from '../../../../services/incomeExpense';
import { formatMoney } from '../../../../functions/formatMoney';

const MobileTopUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
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
      if (selected) {
        if (accountToShow?.status === 'active') {
          if (
            topupDetails.amount &&
            !isNaN(Number(topupDetails.amount)) &&
            topupDetails.amount.length > 2
          ) {
            if (accountToShow.balance >= Number(topupDetails.amount)) {
              if (
                topupDetails.phoneNumber.length === 11 &&
                !isNaN(Number(topupDetails.phoneNumber))
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
    selected,
    topupDetails.amount,
    topupDetails.phoneNumber,
    user,
  ]);

  const formInputs = [
    {
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'phoneNumber',
      // placeholder: 'Mobile Number',
      label: 'Mobile Number',
      errorMessage: `Phone number should be 11 numbers and shouldn't include any letters`,
      regex: '^[0-9]{11}$',
      // pattern: '^[0-9]{11}$',
      required: true,
    },
    {
      id: 'amount',
      name: 'amount',
      type: 'text',
      // placeholder: 'Enter Amount',
      errorMessage:
        'Enter valid topup amount. Must be at least 10 Naira and not more than 1000000 Naira.',
      label: 'Amount',
      regex: '^[0-9]{2,7}$',
      required: true,
    },
  ];

  const userAccountNotificationBox = notifications.find(
    (notification) => notification.owner === user?.id
  );

  // console.log(userAccountNotificationBox);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && accountToShow) {
      try {
        const isPinValid = await usersService.checkPin({
          email: user.email,
          transferPin: transferPin,
        });

        if (isPinValid) {
          const updatedSendingAccount = {
            ...accountToShow,
            balance:
              accountToShow &&
              accountToShow?.balance - Number(topupDetails.amount),
          };

          accountsService
            .updateAccount(accountToShow?.id, updatedSendingAccount)
            .then((response) => {
              console.log(response);

              if (userBarChartInfo) {
                barChartInfoUpdater(
                  userBarChartInfo,
                  'debit',
                  Number(topupDetails.amount)
                );
              }

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
                .then((mobileTopUpTransaction) => {
                  if (userAccountNotificationBox) {
                    const mobileTopupNotification: Notification = {
                      ...userAccountNotificationBox,
                      newNotifications:
                        userAccountNotificationBox?.newNotifications.concat({
                          message: mobileTopUpTransaction.description,
                          accountId: accountToShow.id,
                          accountNumber: accountToShow.accountNumber,
                          transactionId: mobileTopUpTransaction.id,
                        }),
                    };

                    notificationsService
                      .updateNotification(
                        userAccountNotificationBox?.id,
                        mobileTopupNotification
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

          setTopupDetails({
            ...topupDetails,
            amount: '',
            phoneNumber: '',
          });
        }
      } catch (e: any) {
        toast.error(e.response.data.error, {
          position: 'top-center',
        });
        setOpenConfirm(false);
      }
    } else {
      toast.error('Account not selected or User not logged in', {
        position: 'top-center',
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopupDetails({ ...topupDetails, [e.target.name]: e.target.value });
  };

  console.log(topupDetails);

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
          <p className='confirm-message'>
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
              <h2 className='amount'>
                &#8358;{' '}
                {accountToShow && formatMoney(+accountToShow?.balance, 0)}
              </h2>
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
        <button
          disabled={disableButton}
          type='submit'
          className={'btn ' + (disableButton && 'disabled')}
        >
          Proceed
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MobileTopUp;
