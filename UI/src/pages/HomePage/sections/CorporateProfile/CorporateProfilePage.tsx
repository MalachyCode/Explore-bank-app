import { useNavigate } from 'react-router-dom';
import './CorporateProfilePage.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CorporateProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className='corporate-profile'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Corporate Profile</h2>
      </div>
      <div className='body'>
        <div className='container'>
          <p>
            <strong>Mission: </strong>To empower individuals and businesses by
            providing innovative financial services that foster growth and
            stability.
          </p>
          <p>
            <strong>Vision: </strong>
            To be the premier banking institution recognized for exceptional
            customer service, community engagement, and technological
            advancement.
          </p>
          <div className='line'></div>

          <h3>Core Values</h3>
          <p>
            <strong>Integrity: </strong>Commitment to ethical practices and
            transparency.
          </p>
          <p>
            <strong>Excellence: </strong>Striving for the highest standards in
            all we do.
          </p>
          <p>
            <strong>Innovation: </strong>Continuously improving and embracing
            new ideas.
          </p>
          <p>
            <strong>Community: </strong>Building strong relationships and
            supporting local development.
          </p>
          <div className='line'></div>

          <h3>Services</h3>
          <p>
            <strong>Retail Banking: </strong>Customized personal banking
            solutions.
          </p>
          <p>
            <strong>Corporate Banking: </strong>
            Financial services for businesses of all sizes. Digital Banking:
            State-of-the-art online and mobile banking experiences.
          </p>
          <p>
            <strong>Investment Services: </strong>
            Expert advice for wealth management and growth.
          </p>
          <div className='line'></div>

          <h3>Strategic Goals</h3>
          <p>
            Enhance digital infrastructure to improve customer accessibility.
          </p>
          <p>Launch financial literacy initiatives to educate the community.</p>
          <p>
            Implement sustainable practices to support environmental
            stewardship.
          </p>
          <p>Drive growth through customer-centric products and services.</p>
          <div className='line'></div>

          <h3>About Us</h3>
          <p>
            Explore Bank is a newly established bank with a focus on leveraging
            technology to create a seamless banking experience. Our dedicated
            team of professionals is committed to delivering quality service and
            innovative financial products that meet the evolving needs of our
            customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorporateProfilePage;
