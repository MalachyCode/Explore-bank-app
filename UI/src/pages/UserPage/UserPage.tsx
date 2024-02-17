import { User } from '../../types';

const UserPage = (props: { user: User | null | undefined }) => (
  <div>{props.user?.firstName}</div>
);

export default UserPage;
