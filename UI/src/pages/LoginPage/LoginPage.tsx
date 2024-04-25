import { useState } from 'react';
import './LoginPage.scss';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { LoginType } from '../../types';
import loginService from '../../services/login';
import accountsService from '../../services/accounts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginType>({
    email: '',
    password: '',
  });

  const formInputs = [
    {
      id: 'mail',
      name: 'email',
      type: 'email',
      // placeholder: 'Email',
      errorMessage: 'Enter a valid email address',
      regex: `^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,})$`,
      label: 'Email',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      // placeholder: 'Password',
      errorMessage: 'Enter valid password',
      label: 'Password',
      regex: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await loginService.login(credentials);
      accountsService.setToken(user.token);

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
      if (user.type === 'client') {
        navigate('/dashboard-client');
      }
      if (user.type === 'staff') {
        navigate('/dashboard-staff');
      }
      setCredentials({ ...credentials, email: '', password: '' });
    } catch (exception) {
      toast.error('Wrong email or password', {
        position: 'top-center',
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='login'>
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
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
