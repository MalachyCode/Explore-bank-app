import { useEffect, useState } from 'react';
import './ReportScamPage.scss';
import { Notification, ReportScamType } from '../../../../types';
import FormInput from '../../../../components/FormInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import usersService from '../../../../services/users';
import notificationsService from '../../../../services/notifications';

const ReportScamPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<ReportScamType>({
    email: '',
    name: '',
    report: '',
  });
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
    if (values.name && values.email && values.report) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [values.email, values.report, values.name]);

  const formInputs = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      errorMessage: `Name should be between 3 to 40 characters and shouldn't include any special character`,
      label: 'Name',
      regex: `^[A-Z][a-zA-Z ,.'-]{0,19}$`,
      required: true,
    },
    {
      id: 'mail',
      name: 'email',
      type: 'email',
      errorMessage: 'Enter a valid email address',
      label: 'Email',
      regex: `^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,})$`,
      required: true,
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(adminNotificationBox);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (adminNotificationBox) {
      const newDeleteNotification: Notification = {
        ...adminNotificationBox,
        newNotifications: adminNotificationBox?.newNotifications.concat({
          message: `${values.report} by ${values.name} with mail ${values.email}`,
        }),
      };

      notificationsService
        .updateNotification(adminNotificationBox?.id, newDeleteNotification)
        .then((response) => console.log(response));

      toast.success(`Thanks for the feedback!`, {
        position: 'top-center',
      });
    } else {
      toast.error(`Message not sent, please try again!`, {
        position: 'top-center',
      });
    }

    console.log(values);

    setValues({ ...values, email: '', name: '', report: '' });
  };

  return (
    <div className='report-scam'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Report Scam</h2>
      </div>

      <div className='container'>
        <div className='form'>
          <div className='form-header'>Report Scam or Fraud</div>
          <span className='line'></span>
          <form onSubmit={handleSubmit}>
            {formInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name as keyof ReportScamType]}
                onChange={onChange}
              />
            ))}
            <div className='input-box textarea-box'>
              <textarea
                name='report'
                className='textarea'
                onChange={(e) =>
                  setValues({ ...values, report: e.target.value })
                }
                value={values.report}
                id=''
              ></textarea>
              <span className={'placeholder ' + (values.report && 'active')}>
                Report
              </span>
            </div>

            <button
              type='submit'
              className={'btn ' + (disableButton && 'disabled')}
              disabled={disableButton}
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReportScamPage;
