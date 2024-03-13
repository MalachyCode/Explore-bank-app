import { useState } from 'react';
import './MobileTopUp.scss';
import { MobileTopUpType } from '../../types';
import FormInput from '../../components/FormInput';
import { RenderIcons } from '../../components/RenderIconsandTotals';

const MobileTopUp = () => {
  const [topupDetails, setTopupDetails] = useState<MobileTopUpType>({
    phoneNumber: '',
    amount: '',
  });
  const [networkProvider, setNetworkProvider] = useState('');
  const [selected, setSelected] = useState(false);

  console.log(topupDetails.amount.split('.')[0]);
  console.log(networkProvider);

  const formInputs = [
    {
      id: 'phoneNumber',
      name: 'phoneNumber',
      type: 'phoneNumber',
      placeholder: 'Mobile Number',
      label: 'Mobile Number',
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopupDetails({ ...topupDetails, [e.target.name]: e.target.value });
  };

  const logoInputs = [
    {
      id: 'mtnLogo',
      name: 'mtn',
      icon: '../../assets/mtn.256x256.png',
    },
    {
      id: 'gloLogo',
      name: 'glo',
      icon: '../../assets/globacom-limited.256x256.png',
    },
    {
      id: 'airtelLogo',
      name: 'airtel',
      icon: '../../assets/airtel-nigeria.220x256.png',
    },
    {
      id: 'nineMobileLogo',
      name: 'nineMobile',
      icon: '../../assets/9mobile.147x256.png',
    },
  ];

  const amountOptions = [
    { id: 1, value: '100.00' },
    { id: 2, value: '500.00' },
    { id: 3, value: '1000.00' },
    { id: 4, value: '2000.00' },
  ];

  return (
    <div className='mobile-topup'>
      <form className='form' onSubmit={handleSubmit}>
        {/* <strong className='form-header'>Mobile Top-Up</strong>
        <div className='form-header-seperator'></div> */}
        <div className='logos-container'>
          {logoInputs.map((logoInput) => (
            <RenderIcons
              icon={logoInput.icon}
              // label={logoInput.label}
              key={logoInput.id}
              onClick={() => {
                setSelected(true);
                setNetworkProvider(logoInput.name);
              }}
              className={
                'item ' +
                (selected && logoInput.name === networkProvider ? 'active' : '')
              }
            />
          ))}
        </div>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={topupDetails[input.name as keyof MobileTopUpType]}
            onChange={onChange}
          />
        ))}
        <div className='amount-option-box'>
          {amountOptions.map((option) => (
            <div
              onClick={() =>
                setTopupDetails({
                  ...topupDetails,
                  amount: option.value,
                })
              }
              key={option.id}
            >
              &#8358;{option.value}
            </div>
          ))}
        </div>
        <button type='submit' className='btn'>
          Top-Up
        </button>
      </form>
    </div>
  );
};

export default MobileTopUp;
