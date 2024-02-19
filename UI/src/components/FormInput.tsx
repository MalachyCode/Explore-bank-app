import './formInput.scss';
import { FormInputType } from '../types';
import { useState } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    focused?: string;
  }
}

const FormInput = (props: FormInputType) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className='form-input-container'>
      <label htmlFor={id} className='.form-label'>
        <p>{label}</p>
      </label>
      <input
        {...inputProps}
        className='form-input'
        id={id}
        onChange={onChange}
        onBlur={handleFocus} //onBlur===click and leave input
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        } //onFocus===click on input
        focused={focused.toString()}
      />
      <span className='error-message'>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
