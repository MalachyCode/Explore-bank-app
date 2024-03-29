import { useEffect, useState } from 'react';
import { Account, TransactionType } from '../../../types';
import './TransactionInfo.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaymentsIcon from '@mui/icons-material/Payments';
import CloseIcon from '@mui/icons-material/Close';
import { useMatch, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import accountsService from '../../../services/accounts';

const TransactionInfo = (props: {
  transaction: TransactionType | null | undefined;
}) => {
  const navigate = useNavigate();
  const [reportBoxOpen, setReportBoxOpen] = useState(false);
  const [complaint, setComplaint] = useState('');
  const [accounts, setAccounts] = useState<Array<Account>>();

  const matchAccount = useMatch(
    '/dashboard-client/account-info/:id/transactions/:accountNumber/:transactionId'
  );
  const accountToUse = matchAccount
    ? accounts?.find((account) => account.id === matchAccount.params.id)
    : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(complaint);
    setComplaint('');
  };

  console.log(accountToUse);

  useEffect(() => {
    accountsService.getAll().then((accounts) => setAccounts(accounts));
  }, []);

  return (
    <div className='transaction-info'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() =>
            // navigate(
            //   `/dashboard-client/account-info/${accountToUse?.id}/transactions/${accountToUse?.accountNumber}`
            // )
            navigate(-1)
          }
        />
        <h2>Transaction Information</h2>
      </div>
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
        <div className='info-box-top'>
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
