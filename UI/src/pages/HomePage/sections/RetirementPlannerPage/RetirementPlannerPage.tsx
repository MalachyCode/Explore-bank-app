import { useNavigate } from 'react-router-dom';
import './RetirementPlannerPage.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AreaChartComponent from '../../../../components/AreaChartComponenet';
// import SalarySliderComponent from '../../../../components/SalarySliderComponent';
import SliderComponent from '../../../../components/SliderComponent';
import retirementSavingsCalculator from '../../../../functions/savingsCalculator';
import RetirementBarChart from '../../../../components/RetirementPlannerBarChart';
import { RetirementBarChartType } from '../../../../types';
import { useEffect, useState } from 'react';
import InputComponent from '../../../../components/InputComponent';

const RetirementPlannerPage = () => {
  const navigate = useNavigate();
  const [salary, setSalary] = useState(30);
  const [salaryForCalculation, setSalaryForCalculation] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentAge, setCurrentAge] = useState(25);
  const [investmentReturnRate, setInvestmentReturnRate] = useState(4);
  const [salaryIncreaseRate, setSalaryIncreaseRate] = useState(5);
  const [savingsRate, setSavingsRate] = useState(20);
  const [salaryInput, setSalaryInput] = useState('');
  const [target, setTarget] = useState(0);
  const [targetInput, setTargetInput] = useState('');

  useEffect(() => {
    if (
      salaryInput &&
      !isNaN(Number(salaryInput)) &&
      salaryInput.length > 4 &&
      Number(salaryInput) / 10000 < 101 &&
      Number(salaryInput) / 10000 > 0
    ) {
      setSalary(Number(salaryInput) / 10000);
      setSalaryForCalculation(Number(salaryInput) / 10000);
      return;
    }
    if (
      salaryInput &&
      !isNaN(Number(salaryInput)) &&
      salaryInput.length > 4 &&
      Number(salaryInput) / 10000 > 100
    ) {
      setSalaryForCalculation(Number(salaryInput) / 10000);
    }
  }, [salaryInput]);

  useEffect(() => {
    if (targetInput && !isNaN(Number(targetInput))) {
      setTarget(Number(targetInput));
      return;
    }
  }, [targetInput]);

  const retirementData = retirementSavingsCalculator(
    currentAge,
    retirementAge,
    salaryForCalculation * 10000,
    salaryIncreaseRate,
    savingsRate,
    investmentReturnRate,
    'Retirement'
  );
  const endRetirementData = retirementData[retirementData.length - 1];
  const retirementBarChartData: RetirementBarChartType = [
    {
      endAmt: endRetirementData.savings,
      desiredAmt: target,
    },
  ];

  const handleSalarySliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSalary(newValue as number);
    setSalaryForCalculation(newValue as number);
  };

  const handleRetirementAgeSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setRetirementAge(newValue as number);
  };

  const handleCurrentAgeSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setCurrentAge(newValue as number);
  };

  const handleInvestmentReturnSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setInvestmentReturnRate(newValue as number);
  };

  const handleSalaryIncreaseSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSalaryIncreaseRate(newValue as number);
  };

  const handleSavingsRateSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSavingsRate(newValue as number);
  };

  const handleSalaryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSalaryInput(e.target.value);
  };

  const handleTargetInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTargetInput(e.target.value);
  };

  return (
    <div
      className={
        'retirement-planner ' +
        (typeof targetInput !== 'number' && 'charts-hidden')
      }
    >
      <div className='top'>
        <ArrowBackIcon className='back-icon' onClick={() => navigate(-1)} />
        <h2>Retirement Planner</h2>
      </div>
      <div className='body'>
        {target && (
          <div className='charts-container'>
            <div className='area-chart-container'>
              <AreaChartComponent data={retirementData} />
            </div>
            {retirementBarChartData && (
              <div className='bar-chart-container'>
                <RetirementBarChart data={retirementBarChartData} />
              </div>
            )}
          </div>
        )}
        <div className='sliders'>
          <div className='inputs'>
            <InputComponent
              label='Salary'
              handleChange={handleSalaryInputChange}
              value={salaryInput}
            />
            <InputComponent
              label='Target'
              handleChange={handleTargetInputChange}
              value={targetInput}
            />
          </div>
          <div className='slider-container'>
            <div className='salary-slider'>
              {/* <SalarySliderComponent /> */}
              <SliderComponent
                title='Salary'
                handleChange={handleSalarySliderChange}
                value={salary}
              />
              <SliderComponent
                title='Retirement Age'
                handleChange={handleRetirementAgeSliderChange}
                value={retirementAge}
              />
            </div>
            <div className='other-sliders-one'>
              <SliderComponent
                title='Age'
                handleChange={handleCurrentAgeSliderChange}
                value={currentAge}
              />
              <SliderComponent
                title='Investment Return'
                handleChange={handleInvestmentReturnSliderChange}
                value={investmentReturnRate}
              />
            </div>
          </div>
          <div className='other-sliders-two'>
            <SliderComponent
              title='Salary Increase/Year'
              handleChange={handleSalaryIncreaseSliderChange}
              value={salaryIncreaseRate}
            />
            <SliderComponent
              title='Savings Rate'
              handleChange={handleSavingsRateSliderChange}
              value={savingsRate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementPlannerPage;
