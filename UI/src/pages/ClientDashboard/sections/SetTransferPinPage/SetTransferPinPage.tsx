import { useEffect, useState } from 'react';
import FormInput from '../../../../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { Notification, User } from '../../../../types';
import userService from '../../../../services/users';
import notificationsService from '../../../../services/notifications';

interface SetPin {
  pin: string;
  confirmPin: string;
}

const SetTransferPinPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [values, setValues] = useState<SetPin>({
    pin: '',
    confirmPin: '',
  });
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }

    notificationsService
      .getAll()
      .then((retrievedNotifications) =>
        setNotifications(retrievedNotifications)
      );
  }, []);

  const formInputs = [
    {
      id: 'pin',
      name: 'pin',
      type: 'text',
      placeholder: 'Pin',
      errorMessage: 'Pin should be 4 numbers',
      label: 'Pin',
      pattern: `^(?=.*[0-9])[0-9!]{4}$`,
      required: true,
    },
    {
      id: 'confirm-pin',
      name: 'confirmPin',
      type: 'text',
      placeholder: 'Confirm Pin',
      errorMessage: `Pins don't match`,
      label: 'Confirm Pin',
      pattern: values.pin,
      required: true,
    },
  ];

  const userAccountNotificationBox = notifications.find(
    (notification) => notification.owner === user?.id
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const setUserPin = {
        ...user,
        transferPin: values.pin,
      };
      userService.setTransferPin(user?.id, setUserPin).then((response) => {
        console.log(response);
        if (userAccountNotificationBox) {
          const setPinNotification: Notification = {
            ...userAccountNotificationBox,
            newNotifications:
              userAccountNotificationBox?.newNotifications.concat({
                message: `New transfer pin set`,
              }),
          };

          notificationsService
            .updateNotification(
              userAccountNotificationBox.id,
              setPinNotification
            )
            .then((response) => console.log(response));
        }
      });

      // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
      const modifiedObjectForStorage = JSON.stringify(setUserPin);
      localStorage.setItem('loggedAppUser', modifiedObjectForStorage);

      navigate('/dashboard-client');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Set Transfer Pin</strong>
        <div className='form-header-seperator'></div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof SetPin]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Set Pin
        </button>
      </form>
    </div>
  );
};

export default SetTransferPinPage;
