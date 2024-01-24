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
          <XIcon fontSize='large' />
          <FacebookIcon fontSize='large' />
          <InstagramIcon fontSize='large' />
          <LinkedInIcon fontSize='large' />
        </div>
      </div>
      <div className='footer'>
        <div className='footer-container'>
          <div className='footer-column-1'>
            <span className='line'></span>
            <h4>Our Location</h4>
            <span className='line'></span>
          </div>
          <div className='footer-column-2'>
            <span className='line'></span>
            <h4>Our Location</h4>
            <span className='line'></span>
          </div>
          <div className='footer-column-3'>
            <span className='line'></span>
            <h4>Our Location</h4>
            <span className='line'></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
