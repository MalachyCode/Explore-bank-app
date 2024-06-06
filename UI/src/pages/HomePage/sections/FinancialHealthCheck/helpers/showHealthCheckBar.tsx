import {
  CriticalBar,
  ExcellentBar,
  GoodBar,
  GreatBar,
  OkayBar,
} from './Components';

const showHealthCheckBar = (financialStatus: string) => {
  if (financialStatus === 'Critical') {
    return (
      <div className='color-bar-container'>
        <CriticalBar />
      </div>
    );
  }
  if (financialStatus === 'Okay') {
    return (
      <div className='color-bar-container'>
        <CriticalBar />
        <OkayBar />
      </div>
    );
  }
  if (financialStatus === 'Good') {
    return (
      <div className='color-bar-container'>
        <CriticalBar />
        <OkayBar />
        <GoodBar />
      </div>
    );
  }
  if (financialStatus === 'Great') {
    return (
      <div className='color-bar-container'>
        <CriticalBar />
        <OkayBar />
        <GoodBar />
        <GreatBar />
      </div>
    );
  }
  if (financialStatus === 'Excellent') {
    return (
      <div className='color-bar-container'>
        <CriticalBar />
        <OkayBar />
        <GoodBar />
        <GreatBar />
        <ExcellentBar />
      </div>
    );
  }
};

export default showHealthCheckBar;
