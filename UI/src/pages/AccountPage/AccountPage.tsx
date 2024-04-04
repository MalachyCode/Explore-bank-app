import { useEffect, useState } from 'react';
import { Account, NewTransaction, Notification, User } from '../../types';
import './AccountPage.scss';
import accountsService from '../../services/accounts';
import usersService from '../../services/users';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import transactionsService from '../../services/transactions';
import notificationsService from '../../services/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TransactionType {
  amount: string;
  description: string;
}

const RenderFormInput = (props: {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  detail: string | undefined;
  value: string;
}) => (
  <div className='input-box'>
    {props.label === 'Amount' && <span className='naira-symbol'>&#8358;</span>}
    <input type='text' onChange={props.onChange} value={props.value} />
    <span
      className={
        'placeholder ' +
        (props.detail && 'active ') +
        (props.label === 'Amount' && 'amount')
      }
    >
      {props.label}
    </span>
  </div>
);

const AccountPage = (props: { user: User | null | undefined }) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<User | null>();
  const [users, setUsers] = useState<Array<User>>([]);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [transactionDetails, setTransactionDetails] = useState<TransactionType>(
    {
      amount: '',
      description: '',
    }
  );
  const [openTransactionBox, setOpenTransactionBox] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [activeDeactivateBox, setActiveDeactivateBox] = useState(false);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setLoggedInUser(retrievedUser);
    }
    usersService.getAll().then((users) => setUsers(users));
    accountsService.getAll().then((accounts) => setAccounts(accounts));
    notificationsService
      .getAll()
      .then((retrievedNotifications) =>
        setNotifications(retrievedNotifications)
      );
  }, []);

  const userAccounts = accounts.filter(
    (account) => account.owner === props.user?.id
  );

  const accountToDeactivateOrActivate = userAccounts.find(
    (account) => account.accountNumber === Number(accountNumber)
  );

  const loggedInStaffNotificationBox = notifications.find(
    (notification) => notification.owner === loggedInUser?.id
  );

  const userNotificationBox = notifications.find(
    (notification) => notification.owner === props.user?.id
  );

  const handleDelete = (id: string | undefined) => {
    if (
      window.confirm(`Delete ${props.user?.firstName} ${props.user?.lastName}`)
    ) {
      userAccounts.forEach((account) =>
        accountsService
          .deleteAccount(account?.id)
          .then((response) => console.log(response))
      );

      usersService.deleteUser(id as string).then((response) => {
        if (loggedInStaffNotificationBox) {
          const newDeleteNotification: Notification = {
            ...loggedInStaffNotificationBox,
            newNotifications:
              loggedInStaffNotificationBox?.newNotifications.concat({
                message: `You deleted an account owned by ${response.firstName} ${response.lastName}`,
              }),
          };

          notificationsService
            .updateNotification(
              loggedInStaffNotificationBox?.id,
              newDeleteNotification
            )
            .then((response) => console.log(response));
        }
      });
    }
    navigate('/dashboard-staff/search/users');
  };

  const handleTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (transactionType === 'debit') {
      console.log(transactionDetails, 'debit');

      const accountToUpdateForDebit = userAccounts.find(
        (account) => account.accountNumber === Number(accountNumber)
      );

      if (accountToUpdateForDebit) {
        if (
          accountToUpdateForDebit.balance >= Number(transactionDetails.amount)
        ) {
          const debitedAccount = {
            ...accountToUpdateForDebit,
            balance:
              accountToUpdateForDebit &&
              accountToUpdateForDebit?.balance -
                Number(transactionDetails.amount),
          };

          // create transaction for client after their account is debited

          const newDebitTransaction: NewTransaction = {
            accountNumber: accountToUpdateForDebit?.accountNumber,
            createdOn: new Date(),
            type: 'debit',
            cashier: loggedInUser?.id,
            amount: Number(transactionDetails.amount),
            oldBalance: accountToUpdateForDebit?.balance,
            newBalance: debitedAccount.balance,
            description: `Over counter debit transaction at Explore Bank branch by cashier: ${loggedInUser?.firstName} ${loggedInUser?.lastName}; ${transactionDetails.description}`,
          };

          accountsService
            .debit(
              accountToUpdateForDebit?.id as string,
              debitedAccount as Account
            )
            .then((response) => console.log(response));

          transactionsService
            .newDebitTransaction(newDebitTransaction)
            .then((debitTransaction) => {
              // create notification for staff after debiting client account

              if (loggedInStaffNotificationBox) {
                const debitNotification: Notification = {
                  ...loggedInStaffNotificationBox,
                  newNotifications:
                    loggedInStaffNotificationBox.newNotifications.concat({
                      message: debitTransaction.description,
                      // accountId: sendingAccount.id,
                      accountNumber: debitTransaction.accountNumber,
                      transactionId: debitTransaction.id,
                    }),
                };

                notificationsService
                  .updateNotification(
                    loggedInStaffNotificationBox.id,
                    debitNotification
                  )
                  .then((response) => console.log(response));
              }

              // create notification for client after their account is debited

              if (userNotificationBox) {
                const userDebitNotification: Notification = {
                  ...userNotificationBox,
                  newNotifications: userNotificationBox.newNotifications.concat(
                    {
                      message: debitTransaction.description,
                      accountId: accountToUpdateForDebit.id,
                      accountNumber: debitTransaction.accountNumber,
                      transactionId: debitTransaction.id,
                    }
                  ),
                };

                notificationsService
                  .updateNotification(
                    userNotificationBox.id,
                    userDebitNotification
                  )
                  .then((response) => console.log(response));
              }
            });
          navigate('/dashboard-staff/search/users/');
        } else {
          toast.error('Insufficient balance', {
            position: 'top-center',
          });
          setTransactionDetails({
            ...transactionDetails,
            amount: '',
            description: '',
          });
        }
      } else {
        toast.error('Account not found', {
          position: 'top-center',
        });
        setTransactionDetails({
          ...transactionDetails,
          amount: '',
          description: '',
        });
      }
    }

    if (transactionType === 'credit') {
      console.log(transactionDetails, 'credit');

      const accountToUpdateForCredit = userAccounts.find(
        (account) => account.accountNumber === Number(accountNumber)
      );

      if (accountToUpdateForCredit) {
        const creditedAccount = {
          ...accountToUpdateForCredit,
          balance:
            accountToUpdateForCredit &&
            accountToUpdateForCredit?.balance +
              Number(transactionDetails.amount),
        };

        // create transaction for client after their account is credited

        const newCreditTransaction: NewTransaction = {
          accountNumber: accountToUpdateForCredit?.accountNumber,
          createdOn: new Date(),
          type: 'credit',
          cashier: loggedInUser?.id,
          amount: Number(transactionDetails.amount),
          oldBalance: accountToUpdateForCredit?.balance,
          newBalance: creditedAccount.balance,
          description: `Over counter credit transaction at Explore Bank branch by cashier: ${loggedInUser?.firstName} ${loggedInUser?.lastName}; ${transactionDetails.description}`,
        };

        accountsService
          .credit(
            accountToUpdateForCredit?.id as string,
            creditedAccount as Account
          )
          .then((response) => console.log(response));

        transactionsService
          .newCreditTransaction(newCreditTransaction)
          .then((creditTransaction) => {
            // create notification for staff after credting client account

            if (loggedInStaffNotificationBox) {
              const creditNotification: Notification = {
                ...loggedInStaffNotificationBox,
                newNotifications:
                  loggedInStaffNotificationBox.newNotifications.concat({
                    message: creditTransaction.description,
                    // accountId: sendingAccount.id,
                    accountNumber: creditTransaction.accountNumber,
                    transactionId: creditTransaction.id,
                  }),
              };

              notificationsService
                .updateNotification(
                  loggedInStaffNotificationBox.id,
                  creditNotification
                )
                .then((response) => console.log(response));
            }

            // create notification for client after their account is credited

            if (userNotificationBox) {
              const userCreditNotification: Notification = {
                ...userNotificationBox,
                newNotifications: userNotificationBox.newNotifications.concat({
                  message: creditTransaction.description,
                  accountId: accountToUpdateForCredit.id,
                  accountNumber: creditTransaction.accountNumber,
                  transactionId: creditTransaction.id,
                }),
              };

              notificationsService
                .updateNotification(
                  userNotificationBox.id,
                  userCreditNotification
                )
                .then((response) => console.log(response));
            }
          });

        navigate('/dashboard-staff/search/users/');
      } else {
        toast.error('Account not found', {
          position: 'top-center',
        });
        setTransactionDetails({
          ...transactionDetails,
          amount: '',
          description: '',
        });
      }
    }

    setOpenTransactionBox(false);

    setAccountNumber('');
    setTransactionDetails({
      ...transactionDetails,
      amount: '',
      description: '',
    });
  };

  const handleActivateDeactivate = () => {
    const messageVariable =
      accountToDeactivateOrActivate?.status === 'active'
        ? 'Deactivate'
        : 'Activate';
    if (window.confirm(`${messageVariable} ${accountNumber}`)) {
      const userAccount = accounts.find(
        (account) => account.accountNumber === Number(accountNumber)
      );
      const deactivatedActivatedAccount = {
        ...userAccount,
        status: userAccount?.status === 'active' ? 'dormant' : 'active',
      };
      accountsService
        .deactivateActivate(
          userAccount?.id,
          deactivatedActivatedAccount as Account
        )
        .then((updatedAccount) => {
          // create notification for staff after activating or deactivating client account
          if (loggedInStaffNotificationBox) {
            const accountOwner = users.find(
              (user) => user.id === updatedAccount.owner
            );
            const newStaffActivateDeactivateNotification: Notification = {
              ...loggedInStaffNotificationBox,
              newNotifications:
                loggedInStaffNotificationBox?.newNotifications.concat({
                  message: `You ${
                    updatedAccount.status === 'active'
                      ? 'Activated'
                      : 'Deactivated'
                  } an account, ${updatedAccount.accountNumber}, owned by ${
                    accountOwner?.firstName
                  } ${accountOwner?.lastName}`,
                }),
            };

            notificationsService
              .updateNotification(
                loggedInStaffNotificationBox?.id,
                newStaffActivateDeactivateNotification
              )
              .then((response) => console.log(response));
          }

          // create notification for client after their account is activated or deactivated

          if (userNotificationBox) {
            const newUserActivateDeactivateNotification: Notification = {
              ...userNotificationBox,
              newNotifications: userNotificationBox.newNotifications.concat({
                message: `Your account ${updatedAccount.accountNumber} was ${
                  updatedAccount.status === 'active'
                    ? 'Activated'
                    : 'Deactivated'
                } by cashier ${loggedInUser?.firstName} ${
                  loggedInUser?.lastName
                }`,
              }),
            };

            notificationsService
              .updateNotification(
                userNotificationBox.id,
                newUserActivateDeactivateNotification
              )
              .then((response) => console.log(response));
          }
        });
    }
    setAccountNumber('');
    navigate('/dashboard-staff/search/users');
  };

  const formInputs = [
    {
      id: 1,
      label: 'Amount',
      detail: transactionDetails.amount,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTransactionDetails({
          ...transactionDetails,
          amount: e.target.value,
        }),
      value: transactionDetails.amount,
    },
    {
      id: 2,
      label: 'Description',
      detail: transactionDetails.description,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTransactionDetails({
          ...transactionDetails,
          description: e.target.value,
        }),
      value: transactionDetails.description,
    },
  ];

  // console.log(accountNumber);
  // console.log(accountToDeactivateOrActivate);
  // console.log(typeof accountNumber);

  return (
    <div className='account-page'>
      <div className='container'>
        <div className={'transaction-box ' + (openTransactionBox && 'open')}>
          <CloseIcon
            className='close'
            onClick={() => {
              setTransactionDetails({
                ...transactionDetails,
                amount: '',
                description: '',
              });
              setOpenTransactionBox(false);
            }}
          />
          <div className='form-container'>
            <form onSubmit={handleTransaction}>
              {formInputs.map((input) => (
                <RenderFormInput
                  label={input.label}
                  onChange={input.onChange}
                  detail={input.detail}
                  key={input.id}
                  value={input.value}
                />
              ))}
              <select
                name='accountNumber'
                id='accountNumber'
                value={accountNumber}
                className='form-select'
                onChange={(e) => {
                  console.log(e.target.value);
                  setAccountNumber(e.target.value);
                }}
              >
                <option value=''>Select Account Number</option>
                {userAccounts.map((account) => (
                  <option key={account.id} value={`${account.accountNumber}`}>
                    {account.accountNumber}
                  </option>
                ))}
              </select>
              <button className='btn'>
                {transactionType === 'credit' ? 'Credit' : 'Debit'}
              </button>
            </form>
          </div>
        </div>
        <div
          className={
            'activate-deactivate-box ' + (activeDeactivateBox && 'open')
          }
        >
          <CloseIcon
            className='close'
            onClick={() => setActiveDeactivateBox(false)}
          />
          <div className={'activate-deactivate'}>
            <h3>Deactivate Account</h3>
            <form onSubmit={handleActivateDeactivate}>
              <select
                name='accountNumber'
                id='accountNumber'
                value={accountNumber}
                className='form-select'
                onChange={(e) => {
                  console.log(e.target.value);
                  setAccountNumber(e.target.value);
                }}
              >
                <option value=''>Select Account Number</option>
                {userAccounts.map((account) => (
                  <option key={account.id} value={`${account.accountNumber}`}>
                    {account.accountNumber}
                  </option>
                ))}
              </select>
              <button type='submit' className='btn'>
                {accountToDeactivateOrActivate?.status === 'active' ||
                !accountToDeactivateOrActivate
                  ? 'Deactivate'
                  : 'Activate'}
              </button>
            </form>
          </div>
        </div>
        <div className='details-container'>
          <div className='name-container'>
            <span>Account Name</span>
            {props.user?.firstName} {props.user?.lastName}
          </div>
          <div className='account-number-container'>
            <span>Account Number(s)</span>
            {userAccounts.map((account) => (
              <div key={account.id}>{account.accountNumber}</div>
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
          {!loggedInUser?.isAdmin && (
            <button
              className='debit'
              onClick={() => {
                setOpenTransactionBox(true);
                setTransactionType('debit');
              }}
            >
              Debit Account
            </button>
          )}
          {!loggedInUser?.isAdmin && (
            <button
              className='credit'
              onClick={() => {
                setOpenTransactionBox(true);
                setTransactionType('credit');
              }}
            >
              Credit Account
            </button>
          )}
          <button onClick={() => setActiveDeactivateBox(true)}>
            Activate/Deactivate Account
          </button>
          <button
            className='delete'
            onClick={() => handleDelete(props.user?.id)}
          >
            Delete Account
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AccountPage;
