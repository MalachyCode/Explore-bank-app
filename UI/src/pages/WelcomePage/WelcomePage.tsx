import { useMatch } from 'react-router-dom';
import './WelcomePage.scss';
import { User } from '../../types';
import usersService from '../../services/users';
import { useEffect, useState } from 'react';

const WelcomePage = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  const match = useMatch('/welcome/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
  }, []);
  return (
    <div className='welcome'>
      <div className='welcome-message'>
        <h3>{`Dear ${user?.firstName} ${user?.lastName},`}</h3>
        <h2>Welcome to Explore Bank!</h2>
        <div className='body'>
          {user?.type === 'client' ? (
            <div className='client-welcome-message-body'>
              We're excited to have you on board. We're committed to your
              financial success and offer personalized service, innovative
              products, digital banking, and top-notch security. Feel free to
              reach out to our team for any assistance. Looking forward to
              serving you.
            </div>
          ) : (
            <div className='staff-welcome-message-body'>
              We are thrilled to have you as part of our team. Your skills and
              talents will be instrumental in the continued success of our
              company. As you embark on your new journey with us, remember that
              our doors are always open to you. We believe in open communication
              and every member of our team plays a vital role in our shared
              success. We look forward to the fresh perspective you bring to our
              company. Welcome aboard!
            </div>
          )}
          Best regards,
          <div className='welcomer-details'>
            <span>Malachy Nwafor</span>
            <span>CEO</span>
            <span>Explore Bank</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
