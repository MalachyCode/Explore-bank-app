import { useEffect, useState } from 'react';
import './ResetPin.scss';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { Notification, ResetPinType, User } from '../../types';
import usersService from '../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notificationsService from '../../services/notifications';

const ResetPin = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<ResetPinType>({
    oldPin: '',
    newPin: '',
    confirmPin: '',
  });
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);
      setUser(retrievedUser);
    }

    notificationsService
      .getAll()
      .then((retrievedNotifications) =>
        setNotifications(retrievedNotifications)
      );
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

  const userAccountNotificationBox = notifications.find(
    (notification) => notification.owner === user?.id
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (details.oldPin === user?.transferPin) {
      const userPinReset = {
        ...user,
        transferPin: details.newPin,
      };

      usersService.resetPin(user?.id, userPinReset).then((response) => {
        console.log(response);
        if (userAccountNotificationBox) {
          const pinResetNotification: Notification = {
            ...userAccountNotificationBox,
            newNotifications:
              userAccountNotificationBox?.newNotifications.concat({
                message: `You reset your transfer pin`,
              }),
          };

          notificationsService
            .updateNotification(
              userAccountNotificationBox?.id,
              pinResetNotification
            )
            .then((response) => console.log(response));
        }
      });

      // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
      const modifiedObjectForStorage = JSON.stringify(userPinReset);
      localStorage.setItem('loggedAppUser', modifiedObjectForStorage);

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
        {user?.transferPin === '' && (
          <p
            className='set-pin'
            onClick={() =>
              navigate(`/dashboard-client/${user?.id}/set-transfer-pin`)
            }
          >
            Set New Transfer Pin
          </p>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPin;
