import { useEffect, useState } from 'react';
import FormInput from '../../../../components/FormInput';
import './Transfer.scss';
import {
  Account,
  NewTransaction,
  Notification,
  TransferType,
  User,
} from '../../../../types';
import { useNavigate } from 'react-router-dom';
import accountService from '../../../../services/accounts';
import userService from '../../../../services/users';
import transactionsService from '../../../../services/transactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notificationsService from '../../../../services/notifications';

const Transfer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<Array<User>>();
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [accountForTransfer, setAccountForTransfer] = useState<number>();
  const [transferPin, setTransferPin] = useState<string>('');
  const [selected, setSelected] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [accountErrorMessage, setAccountErrorMessage] = useState<string | null>(
    null
  );
  const dailyLimit = 1000000;

  const [transferDetials, setTransferDetials] = useState<TransferType>({
    bankName: '',
    accountNumber: '',
    amount: '',
    from: '',
    description: '',
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    userService.getAll().then((users) => setUsers(users));
    accountService.getAll().then((accounts) => setAccounts(accounts));
    notificationsService
      .getAll()
      .then((retrievedNotifications) =>
        setNotifications(retrievedNotifications)
      );
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

  const receivingAccountNotificationBox = notifications.find(
    (notification) => notification.owner === receivingAccount?.owner
  );

  const sendingAccountNotificationBox = notifications.find(
    (notification) => notification.owner === sendingAccount?.owner
  );

  // console.log(receivingAccountNotificationBox);
  // console.log(sendingAccountNotificationBox);
  // console.log(notifications);

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
    {
      id: 'description',
      name: 'description',
      type: 'text',
      placeholder: 'Ddescription',
      errorMessage: 'Enter transfer description',
      label: 'Description',
      required: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let creditMessage: string;
    let creditId: string;

    if (accountForTransfer) {
      if (user?.transferPin === transferPin) {
        if (sendingAccount?.status === 'active') {
          if (sendingAccount.balance >= Number(transferDetials.amount)) {
            if (receivingAccount) {
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
                .debit(sendingAccount?.id, updatedSendingAccount)
                .then((response) => console.log(response));

              accountService
                .credit(receivingAccount?.id, updatedRecievingAccount)
                .then((response) => console.log(response));

              const newCreditTransaction: NewTransaction = {
                accountNumber: receivingAccount?.accountNumber,
                createdOn: new Date(),
                type: 'credit',
                amount: Number(transferDetials.amount),
                oldBalance: receivingAccount?.balance,
                newBalance: updatedRecievingAccount.balance,
                description: `Frm:${user.firstName} ${user.lastName}, ${transferDetials.bankName}Mobile; ${transferDetials.description}`,
              };

              const newDebitTransaction: NewTransaction = {
                accountNumber: sendingAccount?.accountNumber,
                createdOn: new Date(),
                type: 'debit',
                amount: Number(transferDetials.amount),
                oldBalance: sendingAccount?.balance,
                newBalance: updatedSendingAccount.balance,
                description: `To:${receivingAccountOwner?.firstName} ${receivingAccountOwner?.lastName}, ${transferDetials.bankName}Mobile; ${transferDetials.description}`,
              };

              transactionsService
                .newCreditTransaction(newCreditTransaction)
                .then((creditTransaction) => {
                  // console.log(creditTransaction);
                  if (
                    receivingAccountNotificationBox ===
                    sendingAccountNotificationBox
                  ) {
                    creditMessage = creditTransaction.description;
                    creditId = creditTransaction.id;
                  } else {
                    if (receivingAccountNotificationBox) {
                      const creditNotification: Notification = {
                        ...receivingAccountNotificationBox,
                        newNotifications:
                          receivingAccountNotificationBox?.newNotifications.concat(
                            {
                              message: creditTransaction.description,
                              accountId: receivingAccount.id,
                              accountNumber: receivingAccount.accountNumber,
                              transactionId: creditTransaction.id,
                            }
                          ),
                      };

                      notificationsService
                        .updateNotification(
                          receivingAccountNotificationBox?.id,
                          creditNotification
                        )
                        .then((response) => console.log(response));
                    }
                  }
                });

              transactionsService
                .newDebitTransaction(newDebitTransaction)
                .then((debitTransaction) => {
                  // console.log(debitTransaction);
                  if (
                    receivingAccountNotificationBox ===
                    sendingAccountNotificationBox
                  ) {
                    if (sendingAccountNotificationBox) {
                      const debitNotification: Notification = {
                        ...sendingAccountNotificationBox,
                        newNotifications:
                          sendingAccountNotificationBox?.newNotifications.concat(
                            {
                              message: debitTransaction.description,
                              accountId: sendingAccount.id,
                              accountNumber: sendingAccount.accountNumber,
                              transactionId: debitTransaction.id,
                            }
                          ),
                      };
                      const creditNotification: Notification = {
                        ...debitNotification,
                        newNotifications:
                          debitNotification.newNotifications.concat({
                            message: creditMessage,
                            accountId: receivingAccount.id,
                            accountNumber: receivingAccount.accountNumber,
                            transactionId: creditId,
                          }),
                      };

                      notificationsService
                        .updateNotification(
                          receivingAccountNotificationBox?.id,
                          creditNotification
                        )
                        .then((response) => console.log(response));
                    }
                  } else {
                    if (sendingAccountNotificationBox) {
                      const debitNotification: Notification = {
                        ...sendingAccountNotificationBox,
                        newNotifications:
                          sendingAccountNotificationBox?.newNotifications.concat(
                            {
                              message: debitTransaction.description,
                              accountId: sendingAccount.id,
                              accountNumber: sendingAccount.accountNumber,
                              transactionId: debitTransaction.id,
                            }
                          ),
                      };

                      notificationsService
                        .updateNotification(
                          sendingAccountNotificationBox?.id,
                          debitNotification
                        )
                        .then((response) => console.log(response));
                    }
                  }
                });

              navigate('/dashboard-client');

              setTransferDetials({
                ...transferDetials,
                bankName: '',
                amount: '',
                accountNumber: '',
              });
            } else {
              setAccountErrorMessage(
                `Can't find account with account number ${transferDetials.accountNumber}`
              );
            }
          } else {
            toast.error('Insufficient balance', {
              position: 'top-center',
            });
            setOpenConfirm(false);
          }
        } else {
          toast.error(
            'Your account is not active for transfers. Please visit our branch near you',
            {
              position: 'top-center',
            }
          );
          setOpenConfirm(false);
        }
      } else {
        toast.error('Wrong transfer pin', {
          position: 'top-center',
        });
        setOpenConfirm(false);
      }
    } else {
      toast.error('Select an account to transfer from first!', {
        position: 'top-center',
      });
      setOpenConfirm(false);
    }
  };

  // console.log(receivingAccount);

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
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() => navigate('/dashboard-client')}
        />
        <h2>Transfer</h2>
      </div>
      <div className={'confirm-container ' + (openConfirm && 'active')}>
        <div className='confirm'>
          <h3>Tranfer Confirmation</h3>
          <div className='seperator'></div>
          <p>
            Transfer &#8358;{transferDetials.amount} to{' '}
            {receivingAccountOwner?.firstName} {receivingAccountOwner?.lastName}{' '}
            with account number {receivingAccount?.accountNumber} of{' '}
            {transferDetials.bankName}
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
              Transfer
            </button>
          </form>
          <div className='cancel' onClick={() => setOpenConfirm(false)}>
            Cancel
          </div>
        </div>
      </div>

      <div className='transfer-form-container'>
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
            <div className='daily-limit-box-total'>
              <span>daily limit</span>
              {dailyLimit}
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
      <ToastContainer />
    </div>
  );
};

export default Transfer;
