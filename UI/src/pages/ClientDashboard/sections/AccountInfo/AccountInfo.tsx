import { Account, TransactionType, User } from '../../../../types';
import './AccountInfo.scss';
import transactionsService from '../../../../services/transactions';
import { useEffect, useState } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HistoryIcon from '@mui/icons-material/History';
// import { RenderIcons } from '../../components/RenderIconsandTotals';
import { useNavigate } from 'react-router-dom';

const AccountInfo = (props: { account: Account | null | undefined }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setUser(retrievedUser);
    }

    transactionsService
      .getAll()
      .then((transactions) => setTransactions(transactions));
  }, []);

  // const userTransactions = transactions.filter(
  //   (transaction) => transaction.accountNumber === props.account?.accountNumber
  // );

  const userTransactionsTwo = transactions
    .filter(
      (transaction) =>
        transaction.accountNumber === props.account?.accountNumber
    )
    .slice(0, 3);

  console.log(user);
  // console.log(userTransactions);
  // console.log(userTransactionsTwo);

  return (
    <div className='account-info'>
      <div className='container'>
        <div className='top'>
          <div>
            Number <span>{props.account?.accountNumber}</span>
          </div>
          <span className='seperator'></span>
          <div>
            Balance <span>{props.account?.balance}</span>
          </div>
          <span className='seperator'></span>
          <div>
            Status <span>{props.account?.status}</span>
          </div>
        </div>
        <div className='body'>
          <div className='buttons-container'>
            <div
              onClick={() => navigate(`/dashboard-client/${user?.id}/transfer`)}
            >
              <div className='item'>
                <img src='../../assets/icons8-money-transfer-48.png' alt='' />
              </div>
              <div className='content'>Transfer</div>
            </div>
            <div
              onClick={() =>
                navigate(
                  `/dashboard-client/account-info/${props.account?.id}/generate-statement/${props.account?.accountNumber}`
                )
              }
            >
              {<TextSnippetIcon fontSize='large' />}
              <div className='content'>Generate Statement</div>
            </div>
            <div
              onClick={() =>
                navigate(
                  `/dashboard-client/account-info/${props.account?.id}/transactions/${props.account?.accountNumber}`
                )
              }
            >
              {<HistoryIcon fontSize='large' />}
              <div className='content'>Transactions</div>
            </div>
          </div>
          <h3 className='header'>Transactions</h3>
          {userTransactionsTwo.map((transaction) => (
            <div
              className='transaction'
              onClick={() =>
                navigate(
                  `/dashboard-client/account-info/${props.account?.id}/transactions/${props.account?.accountNumber}/${transaction.id}`
                )
              }
            >
              <div className='left'>{<HistoryIcon fontSize='large' />}</div>
              <div className='center'>
                <div>{transaction.description}</div>
              </div>
              <div className='right'>
                {transaction.type === 'credit' ? (
                  <div className='credit'>{`+ ${transaction.amount}`}</div>
                ) : (
                  <div className='debit'>{`- ${transaction.amount}`}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
