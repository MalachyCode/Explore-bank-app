import { Account } from '../../types';

const AccountInfo = (props: { account: Account | null | undefined }) => (
  <div>Account Info Page for {props.account?.accountNumber}</div>
);
export default AccountInfo;
