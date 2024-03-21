import { useEffect, useState } from 'react';
import './ResetPin.scss';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { ResetPinType, User } from '../../types';
import usersService from '../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPin = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<ResetPinType>({
    oldPin: '',
    newPin: '',
    confirmPin: '',
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const formInputs = [
    {
      id: 'oldPin',
      name: 'oldPin',
      type: 'text',
      placeholder: 'Old Pin',
      errorMessage: 'Pin should be 4 numbers',
      label: 'Old Pin',
      pattern: `^[0-9]{4}$`,
      required: true,
    },
    {
      id: 'newPin',
      name: 'newPin',
      type: 'text',
      placeholder: 'New Pin',
      errorMessage: 'Pin should be 4 numbers',
      label: 'New Pin',
      pattern: `^[0-9]{4}$`,
      required: true,
    },
    {
      id: 'confirmNewPin',
      name: 'confirNewPin',
      type: 'text',
      placeholder: 'Confirm New Pin',
      errorMessage: `Pins don't match`,
      label: 'Confirm New Pin',
      pattern: details.newPin,
      required: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (details.oldPin === user?.transferPin) {
      const userPinReset = {
        ...user,
        transferPin: details.newPin,
      };

      usersService
        .resetPin(user?.id, userPinReset as User)
        .then((response) => console.log(response));

      setDetails({
        ...details,
        newPin: '',
        confirmPin: '',
      });
      navigate('/dashboard-client');
    } else {
      toast.error('Old pin is incorrect', {
        position: 'top-center',
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className='reset-pin'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Reset Pin</strong>
        <div className='form-header-seperator'></div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={details[input.name as keyof ResetPinType]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Reset
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPin;
