import './Resources.scss';

const Resources = () => {
  return (
    <div className='resources' id='resources'>
      {/* Resources page */}
      <div className='container'>
        <div>
          <h4>Financial Tools</h4>
          <div className='tools'>
            We provide a suite of financial tools to help you manage your
            finances effectively:
            <p className='tool-1'>
              Budget Planner: Track your income and expenses.
            </p>
            <p className='tool-2'>
              Savings Calculator: See how your savings can grow.
            </p>
            <p className='tool-3'>
              Retirement Planner: Plan your retirement savings.
            </p>
            <p className='tool-4'>
              Financial Health Check: Get a snapshot of your financial health.
            </p>
            <p className='tool-5'>
              Currency Converter: Check live exchange rates.
            </p>
          </div>
        </div>
        <div>Blog</div>
        <div>FAQs</div>
      </div>
    </div>
  );
};

export default Resources;
