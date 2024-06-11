import { useNavigate } from 'react-router-dom';
import './BudgetPlannerPage.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormInput from '../../../../components/FormInput';
import { BarChartInfo, LoginType } from '../../../../types';
import { useState } from 'react';
import loginService from '../../../../services/login';
import accountsService from '../../../../services/accounts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarChartComponent from '../../../../components/BarChartComponent';
import incomeExpenseService from '../../../../services/incomeExpense';

const BudgetPlannerPage = () => {
  const navigate = useNavigate();
  const [userBarChartInfo, setUserBarChartInfo] = useState<BarChartInfo>();

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

      incomeExpenseService
        .findUserBarChartInfo({ owner: user.id })
        .then((returnedData) => setUserBarChartInfo(returnedData));

      setCredentials({ ...credentials, email: '', password: '' });
    } catch (exception) {
      toast.error('Wrong email or password', {
        position: 'top-center',
      });
    }
  };

  console.log(userBarChartInfo);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='budget-planner'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Budget Planner</h2>
      </div>
      {!userBarChartInfo && (
        <div className='login'>
          <form className='form' onSubmit={handleSubmit}>
            <strong className='form-header'>Login To See Planner</strong>
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
              <p className='reset' onClick={() => navigate('/password-reset')}>
                Forgot Password
              </p>
            </div>
          </form>
        </div>
      )}
      <div className='chart-container'>
        {userBarChartInfo && (
          <BarChartComponent data={userBarChartInfo?.barData} />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BudgetPlannerPage;
