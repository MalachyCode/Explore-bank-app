import { useEffect, useState } from 'react';
import './OpenAccount.scss';
import FormInput from '../../../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import {
  Account,
  NewAccount,
  Notification,
  OpenAccountType,
  User,
} from '../../../../types';
import accountService from '../../../../services/accounts';
import userService from '../../../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notificationsService from '../../../../services/notifications';

const OpenAccount = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('savings');
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [user, setUser] = useState<User>();
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
    accountService.getAll().then((accounts) => setAccounts(accounts));
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setUser(retrievedUser);
    }

    notificationsService
      .getAll()
      .then((retrievedNotifications) =>
        setNotifications(retrievedNotifications)
      );
  }, []);

  const [details, setDetails] = useState<OpenAccountType>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const formInputs = [
    {
      id: 'first-name',
      name: 'firstName',
      type: 'text',
      placeholder: 'First name',
      errorMessage: `First name should be between 3 to 20 characters and shouldn't include any special character`,
      label: 'First name',
      pattern: '^[A-Za-z0-9]{3,20}$',
      required: true,
    },
    {
      id: 'last-name',
      name: 'lastName',
      type: 'text',
      placeholder: 'Last name',
      errorMessage: `Last name should be between 3 to 20 characters and shouldn't include any special character`,
      pattern: '^[A-Za-z0-9]{3,20}$',
      label: 'Last name',
      required: true,
    },
    {
      id: 'mail',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Enter a valid email address',
      label: 'Email',
      required: true,
    },
  ];

  const userAccountNotificationBox = notifications.find(
    (notification) => notification.owner === user?.id
  );

  console.log(accounts);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const accountOwner = users.find((user) => user.email === details.email);

    if (accountOwner) {
      const newAccount: NewAccount = {
        // id: accounts.length + 1,
        balance: 0,
        createdOn: new Date(),
        owner: accountOwner.id,
        // owner: accountOwner?.id as number,
        status: 'active',
        accountNumber: Math.floor(Math.random() * 10000000000 + 1),
        type: accountType === 'current' ? 'current' : 'savings',
      };

      accountService.create(newAccount).then((createdAccount) => {
        if (userAccountNotificationBox) {
          const creatAccountNotification: Notification = {
            ...userAccountNotificationBox,
            newNotifications:
              userAccountNotificationBox?.newNotifications.concat({
                message: `You created a new account with account number ${createdAccount.accountNumber}`,
                accountId: createdAccount.id,
              }),
          };

          notificationsService
            .updateNotification(
              userAccountNotificationBox?.id,
              creatAccountNotification
            )
            .then((response) => console.log(response));
        }
      });

      if (user?.type === 'staff') {
        navigate('/dashboard-staff');
      } else {
        navigate('/dashboard-client');
      }
    } else {
      toast.error('User not found. Please check your email', {
        position: 'top-center',
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className='open-account'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() =>
            navigate(
              user?.type === 'client' ? '/dashboard-client' : '/dashboard-staff'
            )
          }
        />
        <h2>Open Account</h2>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Open An Account</strong>
        <div className='form-header-seperator'></div>
        <label htmlFor='isAdmin'>Account Type</label>
        <select
          name='isAmin'
          id='isAmin'
          value={accountType}
          className='form-select'
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value='savings'>Savings</option>
          <option value='current'>Current</option>
        </select>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={details[input.name as keyof OpenAccountType]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Open Account
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OpenAccount;
