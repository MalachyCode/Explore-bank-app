import { useEffect, useState } from 'react';
import './ChangePersonalData.scss';
import { UpdateUser, User } from '../../types';
import RenderFormInput from './components/RenderFormInput';
import usersService from '../../services/users';
import { useNavigate } from 'react-router-dom';

const ChangePersonalData = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [firstNameDisabled, setFirstNameDisabled] = useState(true);
  const [lastNameDisabled, setLastNameDisabled] = useState(true);
  const [numberDisabled, setNumberDisabled] = useState(true);
  const [dobDisabled, setDobDisabled] = useState(true);
  const [userDetails, setUserDetails] = useState<UpdateUser>({
    email: '',
    firstName: '',
    lastName: '',
    number: '',
    dob: '',
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setUser(retrievedUser);
      setUserDetails({
        ...userDetails,
        email: retrievedUser.email,
        firstName: retrievedUser.firstName,
        lastName: retrievedUser.lastName,
        number: retrievedUser.number,
        dob: retrievedUser.dob,
      });
    }
  }, []);

  const formInputs = [
    {
      id: 1,
      disabled: emailDisabled,
      setDisabled: setEmailDisabled,
      placeholder: 'Email',
      value: userDetails.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUserDetails({
          ...userDetails,
          email: e.target.value,
        }),
      inputType: 'email',
    },
    {
      id: 2,
      disabled: firstNameDisabled,
      setDisabled: setFirstNameDisabled,
      placeholder: 'First Name',
      value: userDetails.firstName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUserDetails({
          ...userDetails,
          firstName: e.target.value,
        }),
      inputType: 'text',
    },
    {
      id: 3,
      disabled: lastNameDisabled,
      setDisabled: setLastNameDisabled,
      placeholder: 'Last Name',
      value: userDetails.lastName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUserDetails({
          ...userDetails,
          lastName: e.target.value,
        }),
      inputType: 'text',
    },
    {
      id: 4,
      disabled: numberDisabled,
      setDisabled: setNumberDisabled,
      placeholder: 'Number',
      value: userDetails.number,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUserDetails({
          ...userDetails,
          number: e.target.value,
        }),
      inputType: 'text',
    },
    {
      id: 5,
      disabled: dobDisabled,
      setDisabled: setDobDisabled,
      placeholder: 'D.O.B',
      value: userDetails.dob,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setUserDetails({
          ...userDetails,
          dob: e.target.value,
        }),
      inputType: 'date',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      number: userDetails.number,
      dob: userDetails.dob,
    };

    usersService
      .updateUser(user?.id, updatedUser as User)
      .then((response) => console.log(response));

    navigate(`/dashboard-client/${user?.id}/profile`);
  };

  return (
    <div className='change-personal-data'>
      <div className='form-container'>
        <h3 className='header'>Update Personal Data</h3>
        <form onSubmit={handleSubmit}>
          {formInputs.map((input) => (
            <RenderFormInput
              disabled={input.disabled}
              placeholder={input.placeholder}
              setDisabled={input.setDisabled}
              value={input.value}
              onChange={input.onChange}
              inputType={input.inputType}
            />
          ))}
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePersonalData;
