import { useState } from 'react';
import './Signup.scss';

const SignupPage = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const credentials = {
    userName: userName,
    password: password,
  };
  return (
    <div className='signup'>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            `${credentials.userName} with password ${credentials.password} logged in`
          );
          setUserName('');
          setPassword('');
        }}
      >
        <strong className='form-header'>Welcome Back</strong>
        <div className='form-header-seperator'></div>
        <label htmlFor='name'>
          <p className='.form-label'>Email or Username</p>
          <input
            type='text'
            className='form-input'
            id='name'
            placeholder='Username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
