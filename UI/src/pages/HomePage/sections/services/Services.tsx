import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './Services.scss';
import { useState } from 'react';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleClick = (way: string) => {
    way === 'left'
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 4)
      : setCurrentSlide(currentSlide < 4 ? currentSlide + 1 : 0);
  };

  // console.log(currentSlide);

  return (
    // service page houses the various services identified by clickable headers (divs with service-header class)
    <div className='services' id='services'>
      <h3>Our Services Include</h3>

      <div
        className='services-slider'
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <div className='container'>
          <div className='service-card'>
            <div className='left'>
              <strong>Personal Banking </strong>

              <div className='left-container'>
                <div className='img-container'></div>
              </div>
            </div>
            <div className='right'>
              <ul>
                <li>Comprehensive checking and savings accounts</li>
                <li>Competitive interest rates on deposits</li>
                <li>Online and mobile banking services</li>
                <li>Personal loans and credit cards</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='service-card'>
            <div className='left'>
              <strong>Business Banking </strong>

              <div className='left-container'>
                <div className='img-container'></div>
              </div>
            </div>
            <div className='right'>
              <ul>
                <li>Business accounts and commercial loans</li>
                <li>Merchant services and payment processing</li>
                <li>Payroll services Business credit cards</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='service-card'>
            <div className='left'>
              <strong>Wealth Management </strong>

              <div className='left-container'>
                <div className='img-container'></div>
              </div>
            </div>
            <div className='right'>
              <ul>
                <li>Investment advisory services</li>
                <li>Retirement planning</li>
                <li>Estate planning</li>
                <li>Trust services</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='service-card'>
            <div className='left'>
              <strong>Digital Services </strong>

              <div className='left-container'>
                <div className='img-container'></div>
              </div>
            </div>
            <div className='right'>
              <ul>
                <li>24/7 online and mobile banking</li>
                <li>Mobile check deposit</li>
                <li>Bill pay and money transfer services</li>
                <li>Real-time account alerts</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='service-card'>
            <div className='left'>
              <strong>Customer Service </strong>

              <div className='left-container'>
                <div className='img-container'></div>
              </div>
            </div>
            <div className='right'>
              <ul>
                <li>Dedicated customer service available 24/7</li>
                <li>In-branch services</li>
                <li>Financial education resources</li>
                <li>Community outreach programs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ArrowForwardIosIcon
        className='arrow left'
        fontSize='large'
        onClick={() => handleClick('left')}
      />
      <ArrowForwardIosIcon
        className='arrow right'
        fontSize='large'
        onClick={() => handleClick('right')}
      />
    </div>
  );
};

export default Services;
