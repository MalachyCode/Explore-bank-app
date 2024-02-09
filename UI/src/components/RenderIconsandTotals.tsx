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
  amount: string;
  percentage: string;
}) => (
  <div className={props.className}>
    <div className='total-info'>
      <h3>{props.label}</h3>
      <strong>
        <h2 className='amount'>{props.amount}</h2>
      </strong>
      <p className='savings-percentage'>{props.percentage}</p>
    </div>
  </div>
);
