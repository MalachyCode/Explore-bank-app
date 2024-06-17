import { useNavigate } from 'react-router-dom';
import { Icons } from '../types';
import { formatMoney } from '../functions/formatMoney';

export const RenderIcons = (props: Icons) => (
  <div className={props.className} onClick={props.onClick}>
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
  onClick: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={props.className}
      onClick={
        props.onClick === 'toAccountInfo'
          ? () => navigate(`/dashboard-client/account-info/${props.id}`)
          : () =>
              navigate(
                `/dashboard-client/account-info/${props?.id}/transactions/${props?.accountNum}`
              )
      }
    >
      <div className='total-info'>
        <h3>{`Account: ${props.accountNum}`}</h3>
        <strong>
          <h2 className='amount'>&#8358; {formatMoney(+props.balance, 0)}</h2>
          {/* <h2 className='amount'>&#8358; {props.balance}</h2> */}
        </strong>
        <p className='savings-percentage'>{`Status: ${props.status}`}</p>
      </div>
    </div>
  );
};
