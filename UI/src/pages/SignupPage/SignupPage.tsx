import { useState } from 'react';
import './Signup.scss';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { SignUpType } from '../../types';

const SignupPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignUpType>({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
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
    navigate('/');
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
          Login
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
