import './About.scss';
const About = () => {
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
      <h4>Financial Tools</h4>
      <div className='boxes'>
        <div className='div-slide'>
          <div className='tool 1'>
            Budget Planner: Track your income and expenses.
          </div>
          <div className='tool 2'>
            Savings Calculator: See how your savings can grow.
          </div>
          <div className='tool 3'>
            Retirement Planner: Plan your retirement savings.
          </div>
          <div className='tool 4'>
            Financial Health Check: Get a snapshot of your financial health.
          </div>
          <div className='tool 5'>
            Currency Converter: Check live exchange rates.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
