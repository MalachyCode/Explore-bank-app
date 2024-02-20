import { Icons } from '../types';

export const RenderIcons = (props: Icons) => (
  <div className='item' onClick={props.onClick}>
    <img src={props.icon} alt='' className={props.iconClassName} />
    <span className={props.spanClassName}>{props.label}</span>
  </div>
);

export const RenderTotals = (props: {
  className: string;
  label: string;
  balance: number;
  accountNum: number;
}) => (
  <div className={props.className}>
    <div className='total-info'>
      <h3>{props.label}</h3>
      <strong>
        <h2 className='amount'>&#8358; {props.balance}</h2>
      </strong>
      <p className='savings-percentage'>{`Account: ${props.accountNum}`}</p>
    </div>
  </div>
);
