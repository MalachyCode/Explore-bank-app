import { useNavigate } from 'react-router-dom';
import { Icons } from '../types';

export const RenderIcons = (props: Icons) => (
  <div className='item' onClick={props.onClick}>
    <img src={props.icon} alt='' className={props.iconClassName} />
    <span className={props.spanClassName}>{props.label}</span>
  </div>
);

export const RenderTotals = (props: {
  className: string;
  status: string;
  balance: number;
  accountNum: number;
  id: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={props.className}
      onClick={() => navigate(`/dashboard-client/account-info/${props.id}`)}
    >
      <div className='total-info'>
        <h3>{`Account: ${props.accountNum}`}</h3>
        <strong>
          <h2 className='amount'>&#8358; {props.balance}</h2>
        </strong>
        <p className='savings-percentage'>{`Status: ${props.status}`}</p>
      </div>
    </div>
  );
};
