import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const RenderFormInput = (props: {
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  placeholder: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className='input-box'>
    {props.placeholder === 'Email' ? (
      <EmailIcon
        fontSize='small'
        className={'icon ' + (props.value && 'active')}
      />
    ) : props.placeholder === 'First Name' ? (
      <PersonIcon
        fontSize='small'
        className={'icon ' + (props.value && 'active')}
      />
    ) : props.placeholder === 'Last Name' ? (
      <PersonIcon
        fontSize='small'
        className={'icon ' + (props.value && 'active')}
      />
    ) : props.placeholder === 'Number' ? (
      <PhoneIcon
        fontSize='small'
        className={'icon ' + (props.value && 'active')}
      />
    ) : (
      <CalendarMonthIcon
        fontSize='small'
        className={'icon ' + (props.value && 'active')}
      />
    )}
    <input
      type='text'
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    />
    <span className={'placeholder ' + (props.value && 'active')}>
      {props.placeholder}
    </span>
    <div
      className='enable-disable-btn'
      onClick={() => props.setDisabled(!props.disabled)}
    >
      {props.disabled ? 'Edit' : 'Save'}
    </div>
  </div>
);

export default RenderFormInput;
