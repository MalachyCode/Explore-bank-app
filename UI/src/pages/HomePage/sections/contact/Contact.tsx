import './Contact.scss';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
  return (
    <div className='contact' id='contact'>
      <div className='social-container'>
        <h2>Connect on Social Media</h2>
        <div className='icons-container'>
          <a href='https://www.x.com/explorebank' target='blank'>
            <XIcon fontSize='large' className='icon' />
          </a>
          <a href='https://www.facebook.com/explorebank' target='blank'>
            <FacebookIcon fontSize='large' className='icon' />
          </a>
          <a href='https://www.instagram.com/explorebank' target='blank'>
            <InstagramIcon fontSize='large' className='icon' />
          </a>
          <a href='https://www.linkedin.com/explorebank' target='blank'>
            <LinkedInIcon fontSize='large' className='icon' />
          </a>
        </div>
      </div>
      <div className='footer'>
        <div className='footer-container'>
          <div className='footer-column one'>
            <div className='line'></div>
            <h4>Our Location</h4>
            <div className='line'></div>
          </div>
          <div className='footer-column two'>
            <div className='line'></div>
            <h4>Our Location</h4>
            <div className='line'></div>
          </div>
          <div className='footer-column three'>
            <div className='line'></div>
            <h4>Our Location</h4>
            <div className='line'></div>
          </div>
          <div className='footer-column four'>
            <div className='line'></div>
            <h4>Our Location</h4>
            <div className='line'></div>
          </div>
        </div>
        <div className='footer-divider'></div>
        <span>&copy; explorebankplc.com</span>
      </div>
    </div>
  );
};

export default Contact;
