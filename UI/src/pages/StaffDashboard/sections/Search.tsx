import './Search.scss';
import userService from '../../../services/users';
import accountsService from '../../../services/accounts';
import { useEffect, useState } from 'react';
import { Account, User } from '../../../types';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const Search = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<Array<User>>([]);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    accountsService.getAll().then((accounts) => setAccounts(accounts));

    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrivedUser = JSON.parse(loggedUserJSON);
      setUser(retrivedUser);
      userService
        .getAll()
        .then((users) =>
          setUsers(
            retrivedUser.isAdmin
              ? users
              : users.filter((user: User) => user.type !== 'staff')
          )
        );
    }
  }, []);

  console.log(user);

  const usersToShow = showAll
    ? users
    : users.filter(
        (user) =>
          user.lastName.includes(search) || user.firstName.includes(search)
      );

  return (
    <div className='search'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() => navigate('/dashboard-staff')}
        />
        <h2>Find Account</h2>
      </div>
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
              <th>Account Type</th>
              <th className='account-number'>Account Number</th>
              <th className='phone'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {usersToShow.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/dashboard-staff/search/users/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.type}
                  {user.type === 'staff' && user.isAdmin
                    ? ' / Admin'
                    : user.type === 'staff' && !user.isAdmin
                    ? ' / Cashier'
                    : ''}
                </td>
                <td className='account-number'>
                  {accounts.map((account) =>
                    account.owner === user.id
                      ? `${account.accountNumber}, `
                      : null
                  )}
                </td>
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
