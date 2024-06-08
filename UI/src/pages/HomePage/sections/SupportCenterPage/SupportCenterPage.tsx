import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import './SupportCenterPage.scss';
import { useEffect, useState } from 'react';
import { Notification } from '../../../../types';
import notificationsService from '../../../../services/notifications';
import usersService from '../../../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SupportCenterPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [adminNotificationBox, setAdminNotificationBox] =
    useState<Notification>();

  useEffect(() => {
    usersService
      .findMainAdmin({ email: 'malachyN3@gmail.com' })
      .then((mainAdmin) => {
        notificationsService
          .findUserNotificationBox({ owner: mainAdmin.id })
          .then((userNotificationBox) => {
            return setAdminNotificationBox(userNotificationBox);
          });
      });
  }, []);

  useEffect(() => {
    if (message) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [message]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (adminNotificationBox) {
      const newMessageNotification: Notification = {
        ...adminNotificationBox,
        newNotifications: adminNotificationBox?.newNotifications.concat({
          message: `${message}; from support center form.`,
        }),
      };

      notificationsService
        .updateNotification(adminNotificationBox?.id, newMessageNotification)
        .then((response) => console.log(response));

      toast.success(`Thanks for the feedback!`, {
        position: 'top-center',
      });
    } else {
      toast.error(`Message not sent, please try again!`, {
        position: 'top-center',
      });
    }

    setMessage('');
  };

  return (
    <div className='support-center'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Support Center</h2>
      </div>
      <div className='body'>
        <div className='brief-intro'>
          Connect for support on any information or assistance you need
        </div>
        <div className='container'>
          <div className='container-top'>Contact Us</div>
          <div className='container-body'>
            <span className='mail-us' onClick={() => navigate('/contact/mail')}>
              Email Us
            </span>
            <span>Tel: +2347080000000</span>
            <form onSubmit={handleSubmit}>
              <div className='input-box textarea-box'>
                <textarea
                  name='message'
                  className='textarea'
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  id=''
                ></textarea>
                <span className={'placeholder ' + (message && 'active')}>
                  Message
                </span>
              </div>
              <button
                className={'btn ' + (disableButton && 'disabled')}
                type='submit'
                disabled={disableButton}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SupportCenterPage;
