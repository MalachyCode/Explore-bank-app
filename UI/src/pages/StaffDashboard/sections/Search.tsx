import './Search.scss';
import userService from '../../../services/users';
import { useEffect, useState } from 'react';
import { User } from '../../../types';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const Search = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState('');
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  const usersToShow = showAll
    ? users
    : users.filter(
        (user) =>
          user.lastName.includes(search) || user.firstName.includes(search)
      );

  return (
    <div className='search'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='input'
          placeholder='Search for Client'
          onChange={(e) => {
            setShowAll(false);
            setSearch(e.target.value);
          }}
        />
      </form>
      <div className='users'>
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Account Number</th>
              <th className='phone'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {usersToShow.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td className='phone'>{user.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
