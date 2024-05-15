import { useState } from 'react';
import FormInput from '../../components/FormInput';
import './MailContactPage.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MailContactType } from '../../types';

const MailContactPage = () => {
  const [values, setValues] = useState<MailContactType>({
    email: '',
    name: '',
    message: '',
  });

  const formInputs = [
    {
      id: 'mail',
      name: 'email',
      type: 'email',
      errorMessage: 'Enter a valid email address',
      label: 'Email',
      regex: `^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,})$`,
      required: true,
    },
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
      id: 'subject',
      name: 'subject',
      type: 'text',
      errorMessage: `Subject should be between 3 to 40 characters and shouldn't include any special character`,
      label: 'Subject',
      regex: `^[A-Z][a-zA-Z ,.'-]{0,19}$`,
      required: true,
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(`${values.name} ${values.message} ${values.email}`, {
      position: 'top-center',
    });
  };

  return (
    <div className='mail-contact-page'>
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

            <button type='submit' className='btn'>
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
