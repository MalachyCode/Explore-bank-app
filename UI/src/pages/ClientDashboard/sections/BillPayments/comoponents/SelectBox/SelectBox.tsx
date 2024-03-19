import CloseIcon from '@mui/icons-material/Close';
import { BillPaymentSelectResourceToShow } from '../../../../../../types';
import './SelectBox.scss';

const SelectBox = (props: {
  header: string;
  openSelectBox: boolean;
  services: Array<BillPaymentSelectResourceToShow> | undefined;
  setOptions: React.Dispatch<React.SetStateAction<string>>;
  setOpenSelectBox: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className={'select-box ' + (props.openSelectBox && 'active')}>
    <div className='select-box-top'>
      <CloseIcon
        fontSize='large'
        className='close-icon'
        onClick={() => props.setOpenSelectBox(false)}
      />
      <h3>{props.header}</h3>
    </div>
    {props.services?.map((service) => (
      <div
        key={service.id}
        className='bill-pay-service'
        onClick={() => {
          props.setOptions(service.name);
          props.setOpenSelectBox(false);
        }}
      >
        {service.name}
        {service.name === 'Direct Entry Pin' && <div>{'-'} &#8358; 6200</div>}
      </div>
    ))}
  </div>
);

export default SelectBox;
