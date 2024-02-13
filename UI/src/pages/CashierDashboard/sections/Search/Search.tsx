import './Search.scss';
import userService from '../../../../services/users';
import { useEffect, useState } from 'react';
import { User } from '../../../../types';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const Search = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);
  return (
    <div className='search'>
      <form onSubmit={handleSubmit}>
        <input type='text' className='input' placeholder='Search for Client' />
      </form>
      <div className='users'>
        <ul>
          {users.map((user) => (
            <div>
              <li key={user.id}>
                {user.firstName} {user.lastName} {user.email}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
