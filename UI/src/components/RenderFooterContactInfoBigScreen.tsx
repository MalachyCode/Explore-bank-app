import { useNavigate } from 'react-router-dom';
import { Info } from '../types';

const RenderFooterContactInfoBigScreen = (props: { info: Info }) => {
  const navigate = useNavigate();
  return (
    <div className='footer-column one'>
      <div className='line'></div>
      <h4>{props.info.title}</h4>
      <div className='line'></div>
      <ul>
        {props.info.infoContents.map((content) => (
          <li
            onClick={() =>
              navigate(content.onClickValue ? content.onClickValue : '')
            }
            key={content.id}
          >
            {content.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderFooterContactInfoBigScreen;
