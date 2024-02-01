import { FormInputType } from '../../types';

const FormInput = (props: FormInputType) => (
  <div>
    <label htmlFor={props.id} className='.form-label'>
      <p>{props.label}</p>
    </label>
    <input
      type={props.type}
      className='form-input'
      id={props.id}
      placeholder={props.label}
      value={props.value}
      required
      onChange={(e) => props.setValueFunction(e.target.value)}
    />
  </div>
);

export default FormInput;
