import { Account } from '../../types';
import './AccountInfo.scss';

const AccountInfo = (props: { account: Account | null | undefined }) => {
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
          Account Info Page for {props.account?.accountNumber}
          <p>Status: {props.account?.status}</p>
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
