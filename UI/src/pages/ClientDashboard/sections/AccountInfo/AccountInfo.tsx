import { Account, TransactionType, User } from '../../../../types';
import './AccountInfo.scss';
import transactionsService from '../../../../services/transactions';
import accountsService from '../../../../services/accounts';
import { useEffect, useState } from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HistoryIcon from '@mui/icons-material/History';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { RenderIcons } from '../../components/RenderIconsandTotals';
import { useNavigate } from 'react-router-dom';

const AccountInfo = (props: { account: Account | null | undefined }) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const [user, setUser] = useState<User>();
  const [openDeleteAcctBox, setOpenDeleteAcctBox] = useState(false);

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

  const handleAcctDelete = () => {
    if (props.account) {
      accountsService
        .deleteAccount(props.account.id)
        .then((response) => console.log(response));
    }

    navigate(-1);
  };

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
            {/* <div
              onClick={() => navigate(`/dashboard-client/${user?.id}/transfer`)}
            >
              <div className='item'>
                <img src='../../assets/icons8-money-transfer-48.png' alt='' />
              </div>
              <div className='content'>Transfer</div>
            </div> */}
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
            <div
              className='close-acct-btn'
              onClick={() => setOpenDeleteAcctBox(true)}
            >
              <DeleteForeverIcon fontSize='large' className='close-acct-icon' />
              <div className='content'>Close Account</div>
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
        <div
          className={
            'delete-acct-confirm-box ' + (openDeleteAcctBox && ' active')
          }
          onClick={() => setOpenDeleteAcctBox(false)}
        >
          <div className='confirm-delete'>
            <div className='message'>
              <div className='message-head'>
                Close account {props.account?.accountNumber}{' '}
              </div>
              <p>
                <strong>
                  Closing and deleting your account is an irreversible action.
                  Are you sure you want to continue?
                </strong>
              </p>
            </div>
            <div className='confirm-btn' onClick={handleAcctDelete}>
              <p>Confirm Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
