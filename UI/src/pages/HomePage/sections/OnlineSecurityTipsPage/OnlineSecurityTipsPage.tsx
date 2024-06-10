import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import './OnlineSecurityTipsPage.scss';

const OnlineSecurityTipsPage = () => {
  const navigate = useNavigate();

  return (
    <div className='online-security-tips'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Online Security Tips</h2>
      </div>
      <div className='body'>
        <p>
          Register for Verified by Visa if you use a Vpay or Visa card. Keep
          user names and passwords secret.
        </p>
        <p>
          Use the latest version of your browser's software and check to be sure
          your computer's operating system software is up to date.
        </p>
        <p>
          Use only secure Internet browsers that allow secure transmission of
          data. Identify security clues such as the 'closed lock' icon at the
          bottom of the browser or a URL that begins with https://. These signs
          indicate that only you and the merchant can view payment information.
        </p>
        <p>Only give card details when you initiate a purchase.</p>
        <p>
          Keep a record of transactions and review monthly statements
          thoroughly.
        </p>
        <p>
          Before making a purchase, check the site’s delivery and return
          policies to ensure that items can be returned if they are not in
          satisfactory condition.
        </p>
        <p>
          Never respond to an e-mail request for personal or account
          information, even if it appears to be from a trusted source.
        </p>
        <div className='contact-box'>
          <p>Always be careful when transacting online.</p>
          <h3>Connect With Us</h3>
          <p>
            Send us a mail{' '}
            <span className='mail-us' onClick={() => navigate('/contact/mail')}>
              here
            </span>
          </p>
          <p>You can also cal us on:</p>
          <p>+2347080000000</p>
        </div>
      </div>
    </div>
  );
};

export default OnlineSecurityTipsPage;
