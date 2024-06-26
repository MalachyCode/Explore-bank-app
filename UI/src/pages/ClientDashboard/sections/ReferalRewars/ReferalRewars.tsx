import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account, User } from '../../../../types';
import accountsService from '../../../../services/accounts';
import './ReferalRewards.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatMoney } from '../../../../functions/formatMoney';

const ReferalRewards = () => {
  const navigate = useNavigate();
  const [openAccountSelectBox, setOpenAccountSelectBox] = useState(false);
  const [accountToShow, setAccountToShow] = useState<Account>();
  const [user, setUser] = useState<User>();
  const [userAccounts, setUserAccounts] = useState<Array<Account>>();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setUser(retrievedUser);

      accountsService
        .findUserAccounts({ owner: retrievedUser.id })
        .then((retrievedUserAccounts) => {
          setAccountToShow(retrievedUserAccounts[0]);

          setUserAccounts(retrievedUserAccounts);
        });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success(
      `Application Successful for ${accountToShow?.accountNumber}. Kindly wait for feedback`,
      {
        position: 'top-center',
      }
    );
  };

  return (
    <div className='referal-rewards'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          // goes back to previous page
          onClick={() => navigate(-1)}
        />
        <h2>Referal Rewards</h2>
      </div>
      <div className='body'>
        {/* box to show selected account */}
        <div
          className='total'
          onClick={() =>
            setOpenAccountSelectBox(!openAccountSelectBox ? true : false)
          }
        >
          <div className='total-info'>
            <h3>{`Account: ${accountToShow?.accountNumber}`}</h3>
            <strong>
              <h2 className='amount'>
                &#8358;{' '}
                {accountToShow && formatMoney(+accountToShow?.balance, 0)}
              </h2>
            </strong>
            <p className='savings-percentage'>{`Status: ${accountToShow?.status}`}</p>
          </div>
          <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
        </div>

        {/* box (shows all accounts) to select account */}
        <div
          className={
            'account-select-box-container ' + (openAccountSelectBox && 'active')
          }
          onClick={() => setOpenAccountSelectBox(false)}
        >
          <div className='account-select-box'>
            <div>Account</div>
            {userAccounts?.map((account) => (
              <div
                className='account-to-select'
                onClick={() => {
                  setAccountToShow(account);
                  setOpenAccountSelectBox(false);
                }}
                key={account.id}
              >
                <div>
                  {user?.firstName} {user?.lastName}
                </div>
                <div>
                  {account.accountNumber} . &#8358; {account.balance} . REGULAR
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <button type='submit' className='btn'>
            Apply for rewards program
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReferalRewards;
