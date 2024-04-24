import './formInput.scss';
import { FormInputType } from '../types';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    focused?: string;
  }
}

const FormInput = (props: FormInputType) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, type, ...inputProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFocused(false);
  }, [props.value]);

  const handleFocus = () => {
    setFocused(props.value ? false : true);
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
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className='form-input'
          id={id}
          onChange={onChange}
          onBlur={handleFocus} //onBlur===click and leave input
          onFocus={() =>
            inputProps.name === 'confirmPassword' && setFocused(true)
          } //onFocus===click on input
          focused={focused.toString()}
        />
        <span className={'placeholder ' + (props.value && 'active')}>
          {label}
        </span>
        {props.type === 'password' && (
          <VisibilityIcon
            className='show-password-icon'
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      {focused && <span className='error-message'>{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
