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
          <h3>About Us</h3>
          <p>
            Explore Bank is a newly established bank with a focus on leveraging
            technology to create a seamless banking experience. Our dedicated
            team of professionals is committed to delivering quality service and
            innovative financial products that meet the evolving needs of our
            customers.
          </p>
          <div className='line'></div>

          <h3>Our Promise</h3>
          <p>
            At Explore Bank, we’re not just a bank; we’re your partner in
            progress, dedicated to helping you achieve your financial dreams.
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
          <p>
            <strong>Personal Banking: </strong>
            Tailored solutions for individuals.
          </p>
          <p>
            <strong>Business Banking: </strong>
            Strategic support for businesses.
          </p>
          <p>
            <strong>Digital Banking: </strong>
            24/7 access to your finances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorporateProfilePage;
