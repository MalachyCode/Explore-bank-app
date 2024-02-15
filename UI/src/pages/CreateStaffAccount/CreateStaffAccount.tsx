import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateStaffAccount.scss';
import FormInput from '../../components/FormInput';
import { CreateStaff, User } from '../../types';
import userService from '../../services/users';

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
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const formInputs = [
    {
      id: 'mail',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Enter a valid email address',
      label: 'Email',
      required: true,
    },
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
      id: 'DOB',
      name: 'dateOfBirth',
      type: 'date',
      placeholder: 'Date of Birth',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 'phone-number',
      name: 'phoneNumber',
      type: 'text',
      placeholder: 'Phone Number',
      errorMessage: `Phone number should be 11 numbers and shouldn't include any letters`,
      pattern: '^[0-9]{11}$',
      label: 'Phone Number',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be between 8 - 20 characters and include 1 letter, 1 number and 1 special character',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 'confirm-password',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: `Passwords don't match`,
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStaff: User = {
      id: users.length + 1,
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
      .then((staffCreated) => console.log(staffCreated));

    // console.log(
    //   `user with firstname: ${values.firstName}, lastname: ${values.lastName}, dob: ${values.dateOfBirth} and password ${values.password} created an account`
    // );

    navigate('/dashboard-staff');

    // console.log(newStaff);

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
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='create-staff'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Create Staff Account</strong>
        <div className='form-header-seperator'></div>
        <label htmlFor='isAdmin'>Account Type</label>
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
    </div>
  );
};

export default CreateStaffAccount;
