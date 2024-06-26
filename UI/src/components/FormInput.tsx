import './formInput.scss';
import { FormInputType } from '../types';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import { formatMoney } from '../functions/formatMoney';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    focused?: string;
  }
}

const FormInput = (props: FormInputType) => {
  const [focused, setFocused] = useState(false);
  const [valueToShow, setValueToShow] = useState('');
  const { label, errorMessage, onChange, id, value, type, ...inputProps } =
    props;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFocused(false);
    if (label === 'Amount') {
      console.log('Amount');
      setValueToShow(value);
      // setAmountValue(e.target.value);
    }
    console.log('Not Amount');
  }, [props.value]);

  // new RegExp is used to create a regex expression with the regex varable specified when using this component. The .test function checks if the provided string passes the regex rule

  const handleFocus = () => {
    setFocused(
      new RegExp(`${props.regex}`).test(props.value) === true
        ? false
        : props.label === 'Date of Birth'
        ? false
        : true
    );
    label === 'Amount'
      ? setValueToShow(formatMoney(+value, 0))
      : setValueToShow('');
  };

  const showVisibilityIcon = () => {
    return showPassword ? (
      <VisibilityOffIcon
        className='show-password-icon'
        onClick={() => setShowPassword(!showPassword)}
      />
    ) : (
      <VisibilityIcon
        className='show-password-icon'
        onClick={() => setShowPassword(!showPassword)}
      />
    );
  };

  return (
    // <div className='form-input-container'>
    //   <label htmlFor={id} className='.form-label'>
    //     <p>{label}</p>
    //   </label>
    //   <input
    //     {...inputProps}
    //     className='form-input'
    //     id={id}
    //     onChange={onChange}
    //     onBlur={handleFocus} //onBlur===click and leave input
    //     onFocus={() =>
    //       inputProps.name === 'confirmPassword' && setFocused(true)
    //     } //onFocus===click on input
    //     focused={focused.toString()}
    //   />
    //   <span className='error-message'>{errorMessage}</span>
    // </div>

    <div className='form-input-container'>
      <div className={'input-box ' + (focused && 'error')}>
        <input
          {...inputProps}
          value={label === 'Amount' && valueToShow ? valueToShow : value}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className='form-input'
          id={id}
          // onChange={label === 'Amount' ? onChangeAmount : onChange}
          onChange={onChange}
          onBlur={handleFocus} //onBlur===click and leave input
          onFocus={() => {
            inputProps.name === 'confirmPassword' && setFocused(true);
            setValueToShow(value);
          }} //onFocus===click on input
          focused={focused.toString()}
        />
        <span
          className={
            'placeholder ' +
            (props.value && 'active ') +
            (props.label === 'Date of Birth' && 'dob')
          }
        >
          {label}
        </span>
        {props.type === 'password' ? (
          showVisibilityIcon()
        ) : (
          <PersonIcon style={{ color: 'white' }} />
        )}
      </div>
      {focused && <span className='error-message'>{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
