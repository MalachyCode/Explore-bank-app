import { useEffect, useState } from 'react';
import './LoginPage.scss';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { LoginType, User } from '../../types';
import userService from '../../services/users';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginType>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Enter password',
      label: 'Password',
      required: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (users.find((user) => user.email === credentials.email)) {
      const user = users.find((user) => user.email === credentials.email);
      console.log(user);
      if (user?.password === credentials.password) {
        window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
        if (user.type === 'client') {
          navigate('/dashboard-client');
        }
        if (user.type === 'staff') {
          navigate('/dashboard-staff');
        }
        console.log(
          `${credentials.email} with password ${credentials.password} logged in`
        );
        setCredentials({ ...credentials, email: '', password: '' });
      } else {
        setErrorMessage('Wrong username or password');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        console.log('wrong username or password');
      }
    } else {
      setErrorMessage('User not found');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log('User not found');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='login'>
      <div style={{ color: 'red' }}>{errorMessage}</div>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Welcome Back</strong>
        <div className='form-header-seperator'></div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={credentials[input.name as keyof LoginType]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Login
        </button>
        <div className='form-footer'>
          <p className='for-signup'>
            Don't have an account?{' '}
            <span className='to-signup' onClick={() => navigate('/signup')}>
              Signup
            </span>
          </p>
          <p className='reset' onClick={() => navigate('/password-reset')}>
            Forgot Password
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
