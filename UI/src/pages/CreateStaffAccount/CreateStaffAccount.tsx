import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateStaffAccount.scss';
import FormInput from '../../components/FormInput';
import { CreateStaff, NewNotification, NewUser } from '../../types';
import userService from '../../services/users';
import notificationsService from '../../services/notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateStaffAccount = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<CreateStaff>({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [accountType, setAccountType] = useState('cashier');

  const formInputs = [
    {
      id: 'mail',
      name: 'email',
      type: 'email',
      // placeholder: 'Email',
      errorMessage: 'Enter a valid email address',
      label: 'Email',
      regex: `^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,})$`,
      required: true,
    },
    {
      id: 'first-name',
      name: 'firstName',
      type: 'text',
      // placeholder: 'First name',
      errorMessage: `First name should be between 3 to 20 characters and shouldn't include any special character`,
      label: 'First name',
      regex: `^[A-Z][a-zA-Z ,.'-]{0,19}$`,
      // pattern: '^[A-Za-z0-9]{3,20}$',
      required: true,
    },
    {
      id: 'last-name',
      name: 'lastName',
      type: 'text',
      // placeholder: 'Last name',
      errorMessage: `Last name should be between 3 to 20 characters and shouldn't include any special character`,
      label: 'Last name',
      regex: `^[A-Z][a-zA-Z ,.'-]{0,19}$`,
      // pattern: '^[A-Za-z0-9]{3,20}$',
      required: true,
    },
    {
      id: 'DOB',
      name: 'dateOfBirth',
      type: 'date',
      // placeholder: 'Date of Birth',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 'phone-number',
      name: 'phoneNumber',
      type: 'text',
      // placeholder: 'Phone Number',
      errorMessage: `Phone number should be 11 numbers and shouldn't include any letters`,
      label: 'Phone Number',
      regex: '^[0-9]{11}$',
      // pattern: '^[0-9]{11}$',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      // placeholder: 'Password',
      errorMessage:
        'Password should be between 8 - 20 characters and include 1 letter, 1 number and 1 special character',
      label: 'Password',
      regex: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 'confirm-password',
      name: 'confirmPassword',
      type: 'password',
      // placeholder: 'Confirm Password',
      errorMessage: `Passwords don't match`,
      label: 'Confirm Password',
      regex: values.password,
      // pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStaff: NewUser = {
      // id: users.length + 1,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      type: 'staff',
      isAdmin: accountType === 'cashier' ? false : true,
      number: values.phoneNumber,
    };

    userService
      .create(newStaff)
      .then((staffCreated) => {
        const newNotificationBox: NewNotification = {
          owner: staffCreated.id,
          newNotifications: [
            {
              message: `Dear ${staffCreated.firstName} ${staffCreated.lastName}, Welcome to Explore Bank!`,
            },
          ],
          oldNotifications: [],
        };

        notificationsService
          .create(newNotificationBox)
          .then((createdNotification) => console.log(createdNotification));

        setValues({
          ...values,
          email: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });

        navigate('/dashboard-staff');
      })
      .catch((e) => {
        toast.error(e.response.data.error, {
          position: 'top-center',
        });
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='create-staff'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Create Staff Account</strong>
        <div className='form-header-seperator'></div>
        <label htmlFor='isAdmin' className='select-label'>
          Account Type
        </label>
        <select
          name='isAmin'
          id='isAmin'
          value={accountType}
          className='form-select'
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value='admin'>Admin</option>
          <option value='cashier'>Cashier</option>
        </select>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof CreateStaff]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Create Staff
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateStaffAccount;
