import { Service } from '../../../../types';

const RenderServices = (props: { service: Service }) => (
  <div className='item'>
    <div className='header'>
      <strong>{props.service.title}</strong>
    </div>
    <div className='body'>
      <ul>
        {props.service.contents.map((content) => (
          <li>{content}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default RenderServices;
