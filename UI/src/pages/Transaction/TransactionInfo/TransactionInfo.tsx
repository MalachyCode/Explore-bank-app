import { TransactionType } from '../../../types';

const TransactionInfo = (props: {
  transaction: TransactionType | null | undefined;
}) => (
  <div>
    Transaction Info for {props.transaction?.id} for account:{' '}
    {props.transaction?.accountNumber}
  </div>
);

export default TransactionInfo;
