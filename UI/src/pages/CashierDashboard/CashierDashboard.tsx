import './CahsierDashboard.scss';

const CashierDashboard = () => (
  <div className='cashier-dashboard'>
    <div className='container'>
      <div className='left'>
        <div className='box'>Search for Client</div>
        <div className='box'>Open Client Account</div>
        <div className='box'>Credit Client Account</div>
        <div className='box'>Generate Statement</div>
      </div>
      <div className='right'>
        <div className='box'>All Clients</div>
        <div className='box'>Money Transfer</div>
        <div className='box'>Dedit Client Account</div>
        <div className='box'>Update Account Info</div>
      </div>
    </div>
  </div>
);

export default CashierDashboard;
