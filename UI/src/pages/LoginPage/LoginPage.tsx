import { useState } from 'react';
import './LoginPage.scss';
import FormInput from '../SignupPage/FormInput';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const credentials = {
    email: email,
    password: password,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `${credentials.email} with password ${credentials.password} logged in`
    );
    setEmail('');
    setPassword('');
  };

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Welcome Back</strong>
        <div className='form-header-seperator'></div>
        <FormInput
          id='name'
          label='Email'
          type='text'
          value={email}
          setValueFunction={setEmail}
        />
        <FormInput
          type='password'
          id='password'
          value={password}
          label='Password'
          setValueFunction={setPassword}
        />
        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
