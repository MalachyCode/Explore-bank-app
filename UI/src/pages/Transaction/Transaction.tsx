import { TransactionType } from '../../types';
import HistoryIcon from '@mui/icons-material/History';

const Transaction = (props: {
  transactions: TransactionType[] | null | undefined;
}) => {
  return (
    <div className='account-info'>
      <div className='container'>
        <div className='body'>
          <h3 className='header'>Transactions</h3>
          {props.transactions?.map((transaction) => (
            <div className='transaction' key={transaction.id}>
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

export default Transaction;
