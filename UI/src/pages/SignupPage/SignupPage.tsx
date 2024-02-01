import { useState } from 'react';
import './Signup.scss';

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
        <label htmlFor='mail'>
          <p className='.form-label'>Email</p>
          <input
            type='email'
            className='form-input'
            id='mail'
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor='first-name'>
          <p className='.form-label'>First name</p>
          <input
            type='text'
            className='form-input'
            id='first-name'
            placeholder='First name'
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor='middle-name'>
          <p className='.form-label'>Middle name</p>
          <input
            type='text'
            className='form-input'
            id='middle-name'
            placeholder='Middle name'
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        <label htmlFor='last-name'>
          <p className='.form-label'>Last name</p>
          <input
            type='text'
            className='form-input'
            id='last-name'
            placeholder='Last name'
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor='DOB'>
          <p className='.form-label'>Date of Birth</p>
          <input
            type='date'
            className='form-input'
            id='DOB'
            placeholder='Date of Birth'
            value={dateOfBirth}
            required
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          <p className='.form-label'>Password</p>
          <input
            type='password'
            className='form-input'
            id='password'
            placeholder='Password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor='confirm-password'>
          <p className='.form-label'>Confirm password</p>
          <input
            type='password'
            className='form-input'
            id='confirm-password'
            placeholder='Confirm password'
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
