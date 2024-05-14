import './Contact.scss';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { useState } from 'react';
import { contactsData } from './contactsData';
import RenderFooterContactInfoBigScreen from '../../../../components/RenderFooterContactInfoBigScreen';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [ourHoursOpen, setOurHoursOpen] = useState<boolean>(false);
  const [contactUsOpen, setContactUsOpen] = useState<boolean>(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState<boolean>(false);
  const [aboutUsOpen, setAboutUsOpen] = useState<boolean>(false);

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
          {contactsData.map((info) => (
            <RenderFooterContactInfoBigScreen info={info} key={info.id} />
          ))}
        </div>
        <div className='footer-container-small-screen'>
          <div className='service'>
            <div
              className='service-header'
              onClick={() => {
                setOurHoursOpen(!ourHoursOpen);
                setContactUsOpen(false);
                setQuickLinksOpen(false);
                setAboutUsOpen(false);
              }}
            >
              <strong>OUR HOURS </strong>
              <div className='service-arrow'>
                <ArrowDropDownCircleIcon
                  className={'arrow ' + (ourHoursOpen && 'active')}
                />
              </div>
            </div>
            <div className={'service-list-box ' + (ourHoursOpen && 'active')}>
              <ul>
                <li>247 Online Banking</li>
                <li>9am to 6pm Mon to Fri at Our Branches</li>
                <li>247 Mobile Banking</li>
              </ul>
            </div>
          </div>
          <div className='service'>
            <div
              className='service-header '
              onClick={() => {
                setOurHoursOpen(false);
                setContactUsOpen(!contactUsOpen);
                setQuickLinksOpen(false);
                setAboutUsOpen(false);
              }}
            >
              <strong>CONTACT US </strong>
              <div className='service-arrow'>
                <ArrowDropDownCircleIcon
                  className={'arrow ' + (contactUsOpen && 'active')}
                />
              </div>
            </div>
            <div className={'service-list-box ' + (contactUsOpen && 'active')}>
              <ul>
                <li>We Care +2347080000000</li>
                <li onClick={() => navigate('/contact/mail')}>
                  explorebank@mail.com
                </li>
                <li>Branch Locator</li>
              </ul>
            </div>
          </div>
          <div className='service'>
            <div
              className='service-header'
              onClick={() => {
                setOurHoursOpen(false);
                setContactUsOpen(false);
                setQuickLinksOpen(!quickLinksOpen);
                setAboutUsOpen(false);
              }}
            >
              <strong>QUICK LINKS </strong>
              <div className='service-arrow'>
                <ArrowDropDownCircleIcon
                  className={'arrow ' + (quickLinksOpen && 'active')}
                />
              </div>
            </div>
            <div className={'service-list-box ' + (quickLinksOpen && 'active')}>
              <ul>
                <li>Online Banking</li>
                <li>Support Center</li>
                <li>Report Scam and Fraud Attempts</li>
              </ul>
            </div>
          </div>
          <div className='service'>
            <div
              className='service-header'
              onClick={() => {
                setOurHoursOpen(false);
                setContactUsOpen(false);
                setQuickLinksOpen(false);
                setAboutUsOpen(!aboutUsOpen);
              }}
            >
              <strong>ABOUT US </strong>
              <div className='service-arrow'>
                <ArrowDropDownCircleIcon
                  className={'arrow ' + (aboutUsOpen && 'active')}
                />
              </div>
            </div>
            <div className={'service-list-box ' + (aboutUsOpen && 'active')}>
              <ul>
                <li>Our History</li>
                <li>Corporate profile</li>
                <li>Board and Management Team</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer-divider'></div>
        <span>&copy; explorebankplc.com</span>
      </div>
    </div>
  );
};

export default Contact;
