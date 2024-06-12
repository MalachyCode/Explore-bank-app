import { useNavigate } from 'react-router-dom';
import './About.scss';
const About = () => {
  const navigate = useNavigate();
  return (
    <div className='about' id='about'>
      <div className='about-message'>
        <h3>About Us</h3>
        <p>
          At Explore bank, we believe in providing our customers with the best
          possible banking experience. We are committed to offering a wide range
          of financial products and services that cater to the needs of our
          customers. Our team of experienced professionals is dedicated to
          providing personalized service to each and every customer. We
          understand that every customer has unique financial needs, and we
          strive to provide customized solutions that meet those needs. We are
          proud to be a part of the community and are committed to giving back.
          We support local charities and organizations that make a positive
          impact on the lives of people in our community. Thank you for choosing
          our bank. We look forward to serving you.
        </p>
      </div>
      <div className='financial-tools-writeup'>
        <h4>Financial Tools</h4>
        <p>
          We offer a range of financial tools to keep you in the know of your
          finances and various currency trends
        </p>
      </div>
      <div className='boxes'>
        <div className='div-slide'>
          <div className='tool one' onClick={() => navigate('/budget-planner')}>
            <p>Budget Planner: Track your income and expenses.</p>
          </div>
          <div className='tool two'>
            <p>Savings Calculator: See how your savings can grow.</p>
          </div>
          <div
            className='tool three'
            onClick={() => navigate('/retirement-planner')}
          >
            <p>Retirement Planner: Plan your retirement savings.</p>
          </div>
          <div
            className='tool four'
            onClick={() => navigate('/financial-health-check')}
          >
            <p>
              Financial Health Check: Get a snapshot of your financial health.
            </p>
          </div>
          <div
            className='tool five'
            onClick={() => navigate('/currency-converter')}
          >
            <p>Currency Converter: Check live exchange rates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
