import { useState } from 'react';
import './Signup.scss';
import FormInput from './FormInput';

const SignupPage = () => {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const credentials = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    dateOfBirth: dateOfBirth,
    password: password,
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      `user with firstname: ${credentials.firstName}, middlename: ${credentials.middleName}, lastname: ${credentials.lastName}, dob: ${credentials.dateOfBirth} and password ${credentials.password} created an account`
    );
    setEmail('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setDateOfBirth('');
    setPassword('');
    setConfirmPassword('');
  };
  return (
    <div className='signup'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Welcome</strong>
        <div className='form-header-seperator'></div>
        <FormInput
          type='email'
          id='mail'
          value={email}
          label='Email'
          setValueFunction={setEmail}
        />
        <FormInput
          type='text'
          id='first-name'
          value={firstName}
          label='First name'
          setValueFunction={setFirstName}
        />
        <FormInput
          type='text'
          id='middle-name'
          value={middleName}
          label='Middle name'
          setValueFunction={setMiddleName}
        />
        <FormInput
          type='text'
          id='last-name'
          value={lastName}
          label='Last name'
          setValueFunction={setLastName}
        />
        <FormInput
          type='date'
          id='DOB'
          value={dateOfBirth}
          label='Date of Birth'
          setValueFunction={setDateOfBirth}
        />
        <FormInput
          type='password'
          id='password'
          value={password}
          label='Password'
          setValueFunction={setPassword}
        />
        <FormInput
          type='password'
          id='confirm-password'
          value={confirmPassword}
          label='Confirm password'
          setValueFunction={setConfirmPassword}
        />
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
