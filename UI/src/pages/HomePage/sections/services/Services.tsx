import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import './Services.scss';
import { useState } from 'react';

const Services = () => {
  const [personalBankingOpen, setPersonalBankingOpen] =
    useState<boolean>(false);
  const [businessBankingOpen, setBusinessBankingOpen] =
    useState<boolean>(false);
  const [wealthManagementOpen, setWealthManagementOpen] =
    useState<boolean>(false);
  const [digitalServiceOpen, setDigitalServiceOpen] = useState<boolean>(false);
  const [customerServiceOpen, setCustomerServiceOpen] =
    useState<boolean>(false);

  return (
    // service page houses the various services identified by clickable headers (divs with service-header class)
    <div className='services' id='services'>
      <h3>Our Services Include</h3>
      <div className='services-list'>
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
              <li>Investment advisory services Retirement planning</li>
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
      </div>
    </div>
  );
};

export default Services;
