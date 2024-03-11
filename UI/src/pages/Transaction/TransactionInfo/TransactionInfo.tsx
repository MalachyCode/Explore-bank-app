import { TransactionType } from '../../../types';
import './TransactionInfo.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaymentsIcon from '@mui/icons-material/Payments';

const TransactionInfo = (props: {
  transaction: TransactionType | null | undefined;
}) => (
  <div className='transaction-info'>
    <div className='report-container'></div>
    <div className='container'>
      <div className='top'>
        <PaymentsIcon className='payment-icon' />
        <div>&#8358;{props.transaction?.amount}</div>
      </div>
      <div className='middle'>
        <div className='left'>
          <div>Type</div>
          <div>Narration</div>
          <div>Reference</div>
        </div>
        <div className='right'>
          <div>{props.transaction?.type}</div>
          <div>{props.transaction?.description}</div>
          <div>{props.transaction?.id}</div>
        </div>
      </div>
      <div className='bottom'>
        <div>Report an issue</div>
        <ArrowForwardIosIcon />
      </div>
    </div>
  </div>
);

export default TransactionInfo;
