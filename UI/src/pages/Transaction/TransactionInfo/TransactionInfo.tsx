import { useState } from 'react';
import { TransactionType } from '../../../types';
import './TransactionInfo.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaymentsIcon from '@mui/icons-material/Payments';
import CloseIcon from '@mui/icons-material/Close';

const TransactionInfo = (props: {
  transaction: TransactionType | null | undefined;
}) => {
  const [reportBoxOpen, setReportBoxOpen] = useState(false);
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(complaint);
    setComplaint('');
  };

  return (
    <div className='transaction-info'>
      <div className={'report-container ' + (reportBoxOpen && 'open')}>
        <CloseIcon
          className='close'
          fontSize='large'
          onClick={() => setReportBoxOpen(false)}
        />
        <form className='form' onSubmit={handleSubmit}>
          <h4 className='form-header'>Report an Issue</h4>
          <label htmlFor='complaint'>Complaint</label>
          <textarea
            name='complaint'
            id='complaint'
            cols={30}
            rows={10}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>
          <button className='btn'>Submit</button>
        </form>
      </div>
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
        <div className='bottom' onClick={() => setReportBoxOpen(true)}>
          <div>Report an issue</div>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default TransactionInfo;
