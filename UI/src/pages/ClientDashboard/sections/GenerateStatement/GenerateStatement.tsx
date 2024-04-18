import { useMatch } from 'react-router-dom';
import transactionsService from '../../../../services/transactions';
import { useEffect, useState } from 'react';
import { TransactionType, User } from '../../../../types';
import './GenerateStatement.scss';
import CloseIcon from '@mui/icons-material/Close';

const GenerateStatement = () => {
  const match = useMatch(
    '/dashboard-client/account-info/:id/generate-statement/:accountNumber'
  );
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User>();
  const [openEmailBox, setOpenEmailBox] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setUser(retrievedUser);
    }

    transactionsService
      .getAll()
      .then((allTransactions) => setTransactions(allTransactions));
  }, []);

  const userTransactions = transactions.filter(
    (transaction) =>
      transaction.accountNumber === Number(match?.params.accountNumber)
  );

  console.log(email);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
    setOpenEmailBox(false);
  };

  return (
    <div className='generate-statement'>
      {/* Container for the Box for inputing mail to send statement */}
      <div className={'email-container ' + (openEmailBox && 'active')}>
        <CloseIcon
          className='close-icon'
          onClick={() => setOpenEmailBox(false)}
        />

        {/* Box for inputing mail to send statement */}
        <div className='email-box'>
          <h4>Enter an Email</h4>
          <div className='form-container'>
            <form onSubmit={handleFormSubmit}>
              <div className='input-box'>
                <input
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <span className={'placeholder amount ' + (email && 'active')}>
                  Input Email
                </span>
              </div>
              <button>Generate</button>
              <span
                onClick={() => setEmail(user ? user?.email : 'No mail set')}
                className='set-saved-mail-btn'
              >
                Use your saved Email
              </span>
            </form>
          </div>
        </div>
      </div>

      {/* Table for statement */}

      <h3>Account Statement For {Number(match?.params.accountNumber)}</h3>
      <div className='transactions'>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th className='old-balance'>Old Balance</th>
              <th>New Balance</th>
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td className='old-balance'>{transaction.oldBalance}</td>
                <td>{transaction.newBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='btn' onClick={() => setOpenEmailBox(true)}>
        Send to Email
      </button>
    </div>
  );
};

export default GenerateStatement;
