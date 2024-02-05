import { Info } from '../types';

const RenderFooterContactInfoBigScreen = (props: { info: Info }) => {
  return (
    <div className='footer-column one'>
      <div className='line'></div>
      <h4>{props.info.title}</h4>
      <div className='line'></div>
      <ul>
        {props.info.infoContents.map((content) => (
          <li key={content.id}>{content.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default RenderFooterContactInfoBigScreen;
