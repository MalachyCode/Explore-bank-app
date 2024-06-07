import { useEffect, useState } from 'react';
import FormInput from '../../components/FormInput';
import './MailContactPage.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MailContactType } from '../../types';
import emailjs from '@emailjs/browser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const MailContactPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<MailContactType>({
    email: '',
    name: '',
    message: '',
  });
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (values.name && values.email && values.message) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [values.email, values.message, values.name]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_serviceId;
    const templateId = process.env.REACT_APP_templateId;
    const publicKey = process.env.REACT_APP_publicKey;

    const templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    if (serviceId && templateId && publicKey) {
      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log(response);

          setValues({
            ...values,
            email: '',
            name: '',
            message: '',
          });

          toast.success(`Thanks for the feedback!`, {
            position: 'top-center',
          });
        })
        .catch((err) => {
          return console.error('Error sending mail', err);
        });
    }
  };

  return (
    <div className='mail-contact-page'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Contact Us</h2>
      </div>
      <div className='container'>
        <div className='form'>
          <div className='form-header'>Contact Us</div>
          <span className='line'></span>
          <form onSubmit={handleSubmit}>
            {formInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name as keyof MailContactType]}
                onChange={onChange}
              />
            ))}
            <div className='input-box textarea-box'>
              <textarea
                name='message'
                className='textarea'
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                value={values.message}
                id=''
              ></textarea>
              <span className={'placeholder ' + (values.message && 'active')}>
                Message
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

export default MailContactPage;
