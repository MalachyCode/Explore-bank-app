import { useNavigate } from 'react-router-dom';
import './BranchLocatorPage.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BranchLocatorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='branch-locator'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Branch Locator</h2>
      </div>
      <div className='body'>
        <div className='message-container'>
          <h2>Notice</h2>
          <p>
            Because we are a relatively new institution, we currently do not
            have a lot of branches but because we understand the gravity of
            being a financial institution, we provide 100% trustworthy and round
            the clock online customer service.
          </p>
        </div>
        <div className='map-container'>
          <div className='map-box'></div>
          <div className='notice'>Coming Soon</div>
        </div>
      </div>
    </div>
  );
};

export default BranchLocatorPage;
