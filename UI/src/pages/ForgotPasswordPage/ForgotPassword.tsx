import { useEffect, useState } from 'react';
import './ForgotPasswordPage.scss';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordType, User } from '../../types';
import usersService from '../../services/users';

const ForgotPasswordPage = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<ForgotPasswordType>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
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
      pattern: credentials.password,
      required: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userForPasswordReset = users.find(
      (user) => user.email === credentials.email
    );

    const userPasswordReset = {
      ...userForPasswordReset,
      password: credentials.password,
    };

    if (userPasswordReset) {
      usersService
        .resetPassword(userForPasswordReset?.id, userPasswordReset as User)
        .then((response) => console.log(response));
    }

    setCredentials({
      ...credentials,
      email: '',
      password: '',
      confirmPassword: '',
    });
    navigate('/login');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='forgot-password'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Reset Password</strong>
        <div className='form-header-seperator'></div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={credentials[input.name as keyof ForgotPasswordType]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
