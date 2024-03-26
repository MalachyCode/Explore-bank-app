import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Loans.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SelectBox from '../BillPayments/comoponents/SelectBox/SelectBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loans = () => {
  const navigate = useNavigate();
  const [openSelectBox, setOpenSelectBox] = useState(false);
  const [openNotificationBox, setOpenNotificationBox] = useState(false);
  const [loanType, setLoanType] = useState('');

  const loanOptions = [
    {
      id: 1,
      name: 'PayDay Loan Product (1 month)',
    },
    {
      id: 2,
      name: 'PayDay Loan Product (3 months)',
    },
    {
      id: 3,
      name: 'Lending Against Turnover (3 months)',
    },
    {
      id: 4,
      name: 'Salary Advance (6 months)',
    },
    {
      id: 5,
      name: 'Small Ticket Personal Loan (12 months)',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loanType) {
      setTimeout(() => {
        setOpenNotificationBox(true);
        console.log(`You're not eligible for this loan`);
      }, 5000);
    } else {
      toast.error('Select a Loan Type first', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className='loans'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          // goes back to previous page
          onClick={() => navigate(-1)}
        />
        <h2>Loans</h2>
      </div>
      <div className='body'>
        <div
          className='select'
          onClick={() => {
            setOpenSelectBox(true);
          }}
        >
          <div className='text'>
            <p className={'text-head ' + (loanType && 'reduce-biller')}>
              Loan Type
            </p>
            {loanType}
          </div>
          <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
        </div>
        <form onSubmit={handleSubmit}>
          <button type='submit' className='btn'>
            Check Eligibility
          </button>
        </form>
        <SelectBox
          services={loanOptions}
          openSelectBox={openSelectBox}
          setOptions={setLoanType}
          setOpenSelectBox={setOpenSelectBox}
          header={'Loan Type'}
        />
        <div
          className={
            'notification-box-container ' + (openNotificationBox && 'active')
          }
          onClick={() => setOpenNotificationBox(false)}
        >
          <div className='notification-box'>
            <p>
              Sorry, you're not eligible for this loan. Please visit any of our
              branches near you to set up loans.
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Loans;
