import { useState } from 'react';
import './Signup.scss';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { NewUser, SignUpType } from '../../types';
import userService from '../../services/users';

const SignupPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignUpType>({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

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
      id: 'middle-name',
      name: 'middleName',
      type: 'text',
      placeholder: 'Middle name',
      errorMessage: `Middle name should be between 3 to 20 characters and shouldn't include any special character`,
      pattern: '^[A-Za-z0-9]{3,20}$',
      label: 'Middle name',
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
    const newClient: NewUser = {
      // id: users.length + 1,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      password: values.password,
      type: 'client',
      isAdmin: false,
      number: values.phoneNumber,
      transferPin: '',
    };

    userService
      .create(newClient)
      .then((clientCreated) => console.log(clientCreated));
    navigate('/login');
    console.log(
      `user with firstname: ${values.firstName}, middlename: ${values.middleName}, lastname: ${values.lastName}, dob: ${values.dateOfBirth} and password ${values.password} created an account`
    );
    setValues({
      ...values,
      email: '',
      firstName: '',
      middleName: '',
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
    <div className='signup'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Welcome</strong>
        <div className='form-header-seperator'></div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof SignUpType]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Signup
        </button>
        <p className='for-login'>
          Have an account?{' '}
          <span className='to-login' onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
