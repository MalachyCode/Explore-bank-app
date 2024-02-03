import './Resources.scss';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const Resources = () => {
  return (
    <div className='resources' id='resources'>
      <strong>FAQs</strong>
      <div className='container'>
        <div className='box-1'>
          <div className='question one'>
            <strong>Where can I find branch</strong>
            <div className='seperator-container'>
              <span></span>
              <PanoramaFishEyeIcon className='circle' />
              <span></span>
            </div>
            <div className='answer'>
              Go to the contact section of the website's home page and in the
              contact us section, click on branch locator or call our customer
              to find a branch near you.
            </div>
          </div>
          <div className='question two'>
            <strong>
              Do I need to go into a branch to open an account or pay in money?
            </strong>
            <div className='seperator-container'>
              <span></span>
              <PanoramaFishEyeIcon className='circle' />
              <span></span>
            </div>
            <div className='answer'>
              To open an account you can call our customer care service line but
              to pay into the account, you need to go into any of our branches
              near you to deposit above the counter
            </div>
          </div>
          <div className='question three'>
            <strong>
              Can I send and receive money from anywhere in the world?
            </strong>
            <div className='seperator-container'>
              <span></span>
              <PanoramaFishEyeIcon className='circle' />
              <span></span>
            </div>
            <div className='answer'>
              You can send and recieve money from anywhere in the world and in
              all currencies. To activate your account for this, contact our
              customer care service line or visit any of our branches near you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
