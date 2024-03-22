import { useEffect, useState } from 'react';
import './ChangePersonalData.scss';
import { UpdateUser, User } from '../../types';
import RenderFormInput from './components/RenderFormInput';

const ChangePersonalData = () => {
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
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    setUserDetails({
      ...userDetails,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      number: user?.number,
      dob: user?.dob,
    });
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
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(userDetails);
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
            />
          ))}
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePersonalData;
