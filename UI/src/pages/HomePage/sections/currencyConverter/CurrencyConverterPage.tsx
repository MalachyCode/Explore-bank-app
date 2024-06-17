import { useEffect, useState } from 'react';
import Axios from 'axios';
import { HiSwitchHorizontal } from 'react-icons/hi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './CurrencyConverterPage.scss';
import { useNavigate } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CurrencyConverterPage = () => {
  // useNavigate Function
  const navigate = useNavigate();
  // Initializing all the state variables
  const [info, setInfo] = useState<string[]>([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('ngn');
  const [options, setOptions] = useState<string[]>([]);
  const [output, setOutput] = useState(0);

  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
      // `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    ).then((res) => {
      console.log(res.data);
      setInfo(res.data[from]);
    });
  }, [from]);

  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  // Function to convert the currency
  const convert = () => {
    const rate = info[to];
    setOutput(input * rate);
  };

  // Function to switch between two currency
  const flip = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className='currency-converter'>
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Currency converter</h2>
      </div>
      <div className='body'>
        {/* <div className='heading'>
        <h1>Currency converter</h1>
      </div> */}
        <div className='container'>
          <div className='left'>
            <h3>Amount</h3>
            {/* <input
              type='text'
              placeholder='Enter the amount'
              onChange={(e) => setInput(Number(e.target.value))}
            /> */}
            <CurrencyInput
              className='currency-input'
              value={input ? input : 0}
              onValueChange={(amount) => setInput(Number(amount ? amount : 0))}
              intlConfig={{ locale: 'en-US', currency: from }}
              allowDecimals={true}
              allowNegativeValue={false}
            />
          </div>
          <div className='right-container'>
            <div className='middle'>
              <h3>From</h3>
              <div className='select-container'>
                <select
                  className='select-dropdown'
                  name='from-currency'
                  id=''
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                >
                  {options.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
                <div className='icon-container'>
                  <ArrowDropDownIcon className='icon' />
                </div>
              </div>
            </div>
            <div className='switch'>
              <HiSwitchHorizontal
                size='30px'
                onClick={() => {
                  flip();
                }}
              />
            </div>
            <div className='right'>
              <h3>To</h3>
              <div className='select-container'>
                <select
                  className='select-dropdown'
                  name='to-currency'
                  id=''
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                >
                  {options.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
                <div className='icon-container'>
                  <ArrowDropDownIcon className='icon' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='result'>
          <button
            onClick={() => {
              convert();
            }}
          >
            Convert
          </button>
          <h2>Converted Amount:</h2>
          <p>{input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;
