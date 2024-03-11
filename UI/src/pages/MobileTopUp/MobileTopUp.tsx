import { useState } from 'react';
import './MobileTopUp.scss';
import { MobileTopUpType } from '../../types';
import FormInput from '../../components/FormInput';

const MobileTopUp = () => {
  const [topupDetails, setTopupDetails] = useState<MobileTopUpType>({
    phoneNumber: '',
    amount: '',
  });
  const formInputs = [
    {
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'phoneNumber',
      placeholder: 'Enter Phone Number',
      label: 'Phone Number',
      errorMessage: `Phone number should be 11 numbers and shouldn't include any letters`,
      pattern: '^[0-9]{11}$',
      required: true,
    },
    {
      id: 'amount',
      name: 'amount',
      type: 'text',
      placeholder: 'Enter Amount',
      errorMessage: 'Enter topup amount',
      label: 'Amount',
      required: true,
    },
  ];
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //   }
  // }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopupDetails({ ...topupDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className='mobile-topup'>
      <form className='form' onSubmit={handleSubmit}>
        <strong className='form-header'>Mobile Top-Up</strong>
        <div className='form-header-seperator'></div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={topupDetails[input.name as keyof MobileTopUpType]}
            onChange={onChange}
          />
        ))}
        <button type='submit' className='btn'>
          Top-Up
        </button>
      </form>
    </div>
  );
};

export default MobileTopUp;
