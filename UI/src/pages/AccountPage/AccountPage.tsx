import { User } from '../../types';

const AccountPage = (props: { user: User | null | undefined }) => (
  <div>{props.user?.firstName}</div>
);

export default AccountPage;
