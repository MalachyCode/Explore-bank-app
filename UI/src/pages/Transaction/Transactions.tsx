import { useNavigate } from 'react-router-dom';
import { Account, TransactionType } from '../../types';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Transactions.scss';

const Transactions = (props: {
  transactions: TransactionType[] | null | undefined;
  account: Account | null | undefined;
}) => {
  const navigate = useNavigate();
  return (
    <div className='transactions'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() =>
            navigate(
              `/dashboard-client/${props.account?.id}/transactions/select-account`
            )
          }
        />
        <h2>Transactions</h2>
      </div>
      <div className='container'>
        <div className='body'>
          {/* <h3 className='header'>Transactions</h3> */}
          {props.transactions?.map((transaction) => (
            <div
              className='transaction'
              key={transaction.id}
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

export default Transactions;
