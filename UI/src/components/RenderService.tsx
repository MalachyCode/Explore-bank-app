import { Service } from '../types';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const RenderServices = (props: { service: Service }) => (
  <div className='item'>
    <div className='header'>
      <strong>{props.service.title}</strong>
      <div className='arrows-container'>
        <ArrowDropDownCircleIcon className='arrow ' />
      </div>
    </div>
    <div className='body'>
      <ul>
        {props.service.contents.map((content) => (
          <li key={content.id}>{content.text}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default RenderServices;
