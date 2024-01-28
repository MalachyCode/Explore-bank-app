// import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './Services.scss';
// import { useState } from 'react';
// import { useState } from 'react';

const Services = () => {
  // const [currentSlide, setCurrentSlide] = useState<number>(0);
  // const [personalBankingOpen, setPersonalBankingOpen] =
  //   useState<boolean>(false);
  // const [businessBankingOpen, setBusinessBankingOpen] =
  //   useState<boolean>(false);
  // const [wealthManagementOpen, setWealthManagementOpen] =
  //   useState<boolean>(false);
  // const [digitalServiceOpen, setDigitalServiceOpen] = useState<boolean>(false);
  // const [customerServiceOpen, setCustomerServiceOpen] =
  //   useState<boolean>(false);

  // const handleClick = (way: string) => {
  //   way === 'left'
  //     ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 1)
  //     : setCurrentSlide(currentSlide < 1 ? currentSlide + 1 : 0);
  // };

  // console.log(currentSlide);

  return (
    // service page houses the various services identified by clickable headers (divs with service-header class)
    <div className='services' id='services'>
      <h3>Our Services Include</h3>
      <div className='logos'>
        <div className='logos-slide'>
          <img src='/assets/logos/3m.svg' alt='1' />
          <img src='/assets/logos/barstool-store.svg' alt='2' />
          <img src='/assets/logos/budweiser.svg' alt='3' />
          <img src='/assets/logos/buzzfeed.svg' alt='4' />
          <img src='/assets/logos/forbes.svg' alt='5' />
          <img src='/assets/logos/macys.svg' alt='6' />
          <img src='/assets/logos/menshealth.svg' alt='7' />
          <img src='/assets/logos/mrbeast.svg' alt='8' />
        </div>

        <div className='logos-slide'>
          <img src='/assets/logos/3m.svg' alt='1' />
          <img src='/assets/logos/barstool-store.svg' alt='2' />
          <img src='/assets/logos/budweiser.svg' alt='3' />
          <img src='/assets/logos/buzzfeed.svg' alt='4' />
          <img src='/assets/logos/forbes.svg' alt='5' />
          <img src='/assets/logos/macys.svg' alt='6' />
          <img src='/assets/logos/menshealth.svg' alt='7' />
          <img src='/assets/logos/mrbeast.svg' alt='8' />
        </div>
      </div>
      {/* <div
        className='services-slider'
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <div className='container'>
          <div className='service-card'>
            <div className='left'>
              ONE
              <div className='left-container'>
                <div className='img-container'></div>
              </div>
            </div>
            <div className='right'></div>
          </div>
        </div>
        <div className='container'>
          <div className='service-card'>
            <div className='left'>
              TWO
              <div className='left-container'>
                <div className='img-container'></div>
              </div>
            </div>
            <div className='right'></div>
          </div>
        </div>
      </div> */}
      {/* <ArrowForwardIosIcon
        className='arrow left'
        fontSize='large'
        onClick={() => handleClick('left')}
      />
      <ArrowForwardIosIcon
        className='arrow right'
        fontSize='large'
        onClick={() => handleClick('right')}
      /> */}
      {/* <div className='services-list'>
        <div className='service'>
          <div
            className='service-header'
            onClick={() => {
              setPersonalBankingOpen(!personalBankingOpen);
              setBusinessBankingOpen(false);
              setWealthManagementOpen(false);
              setDigitalServiceOpen(false);
              setCustomerServiceOpen(false);
            }}
          >
            <strong>Personal Banking </strong>
            <div className='service-arrow'>
              <ArrowDropDownCircleIcon
                className={'arrow ' + (personalBankingOpen && 'active')}
              />
            </div>
          </div>
          <div
            className={'service-list-box ' + (personalBankingOpen && 'active')}
          >
            <ul>
              <li>Comprehensive checking and savings accounts</li>
              <li>Competitive interest rates on deposits</li>
              <li>Online and mobile banking services</li>
              <li>Personal loans and credit cards</li>
            </ul>
          </div>
        </div>
        <div className='service'>
          <div
            className={'service-header ' + (businessBankingOpen && 'active')}
            onClick={() => {
              setBusinessBankingOpen(!businessBankingOpen);
              setPersonalBankingOpen(false);
              setWealthManagementOpen(false);
              setDigitalServiceOpen(false);
              setCustomerServiceOpen(false);
            }}
          >
            <strong>Business Banking </strong>
            <div className='service-arrow'>
              <ArrowDropDownCircleIcon
                className={'arrow ' + (businessBankingOpen && 'active')}
              />
            </div>
          </div>
          <div
            className={'service-list-box ' + (businessBankingOpen && 'active')}
          >
            <ul>
              <li>Business accounts and commercial loans</li>
              <li>Merchant services and payment processing</li>
              <li>Payroll services Business credit cards</li>
            </ul>
          </div>
        </div>
        <div className='service'>
          <div
            className='service-header'
            onClick={() => {
              setWealthManagementOpen(!wealthManagementOpen);
              setBusinessBankingOpen(false);
              setPersonalBankingOpen(false);
              setDigitalServiceOpen(false);
              setCustomerServiceOpen(false);
            }}
          >
            <strong>Wealth Management </strong>
            <div className='service-arrow'>
              <ArrowDropDownCircleIcon
                className={'arrow ' + (wealthManagementOpen && 'active')}
              />
            </div>
          </div>
          <div
            className={'service-list-box ' + (wealthManagementOpen && 'active')}
          >
            <ul>
              <li>Investment advisory services</li>
              <li>Retirement planning</li>
              <li>Estate planning</li>
              <li>Trust services</li>
            </ul>
          </div>
        </div>
        <div className='service'>
          <div
            className='service-header'
            onClick={() => {
              setDigitalServiceOpen(!digitalServiceOpen);
              setWealthManagementOpen(false);
              setBusinessBankingOpen(false);
              setPersonalBankingOpen(false);
              setCustomerServiceOpen(false);
            }}
          >
            <strong>Digital Services </strong>
            <div className='service-arrow'>
              <ArrowDropDownCircleIcon
                className={'arrow ' + (digitalServiceOpen && 'active')}
              />
            </div>
          </div>
          <div
            className={'service-list-box ' + (digitalServiceOpen && 'active')}
          >
            <ul>
              <li>24/7 online and mobile banking</li>
              <li>Mobile check deposit</li>
              <li>Bill pay and money transfer services</li>
              <li>Real-time account alerts</li>
            </ul>
          </div>
        </div>
        <div className='service'>
          <div
            className='service-header'
            onClick={() => {
              setCustomerServiceOpen(!customerServiceOpen);
              setDigitalServiceOpen(false);
              setWealthManagementOpen(false);
              setBusinessBankingOpen(false);
              setPersonalBankingOpen(false);
            }}
          >
            <strong>Customer Service </strong>
            <div className='service-arrow'>
              <ArrowDropDownCircleIcon
                className={'arrow ' + (customerServiceOpen && 'active')}
              />
            </div>
          </div>
          <div
            className={'service-list-box ' + (customerServiceOpen && 'active')}
          >
            <ul>
              <li>Dedicated customer service available 24/7</li>
              <li>In-branch services</li>
              <li>Financial education resources</li>
              <li>Community outreach programs</li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Services;
