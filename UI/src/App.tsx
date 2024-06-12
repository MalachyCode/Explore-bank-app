import 'react-multi-carousel/lib/styles.css';

import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPassword';
import ClientDashboard from './pages/ClientDashboard/ClientDashboard';
import Transfer from './pages/ClientDashboard/sections/TransferPage/Transfer';
import StaffDashboard from './pages/StaffDashboard/StaffDashboard';
import Search from './pages/StaffDashboard/sections/Search';
import CreateStaffAccount from './pages/CreateStaffAccount/CreateStaffAccount';
import { useEffect, useState } from 'react';
import userService from './services/users';
import accountsService from './services/accounts';
import { Account, TransactionType, User } from './types';
import AccountPage from './pages/AccountPage/AccountPage';
import OpenAccount from './pages/ClientDashboard/sections/OpenAccount/OpenAccount';
import AccountInfo from './pages/ClientDashboard/sections/AccountInfo/AccountInfo';
import SetTransferPinPage from './pages/ClientDashboard/sections/SetTransferPinPage/SetTransferPinPage';
import Transactions from './pages/Transaction/Transactions';
import transactionsService from './services/transactions';
import TransactionInfo from './pages/Transaction/TransactionInfo/TransactionInfo';
import SelectAccount from './pages/Transaction/SelectAccount/SelectAccount';
import MobileTopUp from './pages/ClientDashboard/sections/MobileTopUp/MobileTopUp';
import BillPayments from './pages/ClientDashboard/sections/BillPayments/BillPayments';
import SportWalletFunding from './pages/ClientDashboard/sections/SportWalletFunding/SportWalletFunding';
import UserProfile from './pages/UserProfile/UserProfile';
import ResetPin from './pages/ResetPin/ResetPin';
import ChangePersonalData from './pages/ChangePersonalData/ChangePersonalData';
import Loans from './pages/ClientDashboard/sections/Loans/Loans';
import ReferalRewards from './pages/ClientDashboard/sections/ReferalRewars/ReferalRewars';
import GenerateStatement from './pages/ClientDashboard/sections/GenerateStatement/GenerateStatement';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ChangeProfilePicture from './pages/ClientDashboard/sections/ChangeProfilePicture/ChangeProfilePicture';
import MailContactPage from './pages/MailContactPage/MailContactPage';
import OurHistoryPage from './pages/OurHistoryPage/OurHistoryPage';
import CurrencyConverterPage from './pages/HomePage/sections/currencyConverter/CurrencyConverterPage';
import FinancialHealthCheckPage from './pages/HomePage/sections/FinancialHealthCheck/FinancialHealthCheckPage';
import BranchLocatorPage from './pages/HomePage/sections/BranchLocatorPage/BranchLocatorPage';
import CorporateProfilePage from './pages/HomePage/sections/CorporateProfile/CorporateProfilePage';
import ReportScamPage from './pages/HomePage/sections/ReportScamPage/ReportScamPage';
import OurPhilosophyPage from './pages/HomePage/sections/OurPhilosophyPage/OurPhilosophyPage';
import SupportCenterPage from './pages/HomePage/sections/SupportCenterPage/SupportCenterPage';
import OnlineSecurityTipsPage from './pages/HomePage/sections/OnlineSecurityTipsPage/OnlineSecurityTipsPage';
import BudgetPlannerPage from './pages/HomePage/sections/BudgetPlannerPage/BudgetPlannerPage';
import RetirementPlannerPage from './pages/HomePage/sections/RetirementPlannerPage/RetirementPlannerPage';

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);
  const match = useMatch('/dashboard-staff/search/users/:id');
  const user = match
    ? users.find((user) => user.id === match.params.id)
    : // ? users.find((user) => user.id === Number(match.params.id))
      null;

  const matchAccount = useMatch('/dashboard-client/account-info/:id');
  const account = matchAccount
    ? accounts.find((account) => account.id === matchAccount.params.id)
    : null;

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
    accountsService.getAll().then((accounts) => setAccounts(accounts));
    transactionsService
      .getAll()
      .then((transactions) => setTransactions(transactions));
  }, []);

  const matchAccountNumber = useMatch(
    '/dashboard-client/account-info/:id/transactions/:accountNumber'
  );

  const matchTransaction = useMatch(
    '/dashboard-client/account-info/:id/transactions/:accountNumber/:transactionId'
  );

  const matchTransactionStaff = useMatch(
    '/dashboard-staff/account-info/:id/transactions/:accountNumber/:transactionId'
  );

  const userTransactions = transactions.filter(
    (transaction) =>
      transaction.accountNumber ===
      Number(matchAccountNumber?.params.accountNumber)
  );

  const singleTransaction = matchTransaction
    ? transactions.find(
        (transaction) =>
          transaction.id === matchTransaction?.params.transactionId
      )
    : null;

  const singleTransactionStaff = matchTransactionStaff
    ? transactions.find(
        (transaction) =>
          transaction.id === matchTransactionStaff?.params.transactionId
      )
    : null;

  const accountForTransactions = matchAccountNumber
    ? accounts.find((account) => account.id === matchAccountNumber.params.id)
    : null;

  const navigate = useNavigate();

  const handleLogout = () => {
    // window.localStorage.removeItem('loggedAppUser');
    window.localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='app'>
      <div className='container'>
        <Routes>
          <Route
            path='/dashboard-staff/create-staff'
            element={<CreateStaffAccount />}
          />
          <Route path='/welcome/:id' element={<WelcomePage />} />
          <Route path='/contact/mail' element={<MailContactPage />} />
          <Route path='/our-history' element={<OurHistoryPage />} />
          <Route path='/branch-locator' element={<BranchLocatorPage />} />
          <Route path='/corporate-profile' element={<CorporateProfilePage />} />
          <Route path='/our-philosophy' element={<OurPhilosophyPage />} />
          <Route path='/report-scam' element={<ReportScamPage />} />
          <Route path='/support-center' element={<SupportCenterPage />} />
          <Route path='/budget-planner' element={<BudgetPlannerPage />} />
          <Route
            path='/retirement-planner'
            element={<RetirementPlannerPage />}
          />
          <Route
            path='/online-security-tips'
            element={<OnlineSecurityTipsPage />}
          />
          <Route
            path='/currency-converter'
            element={<CurrencyConverterPage />}
          />
          <Route
            path='/financial-health-check'
            element={<FinancialHealthCheckPage />}
          />
          <Route
            path='/dashboard-staff/search/users/:id'
            element={<AccountPage user={user} />}
          />
          <Route
            path='/dashboard-staff/:id/profile'
            element={<UserProfile handleLogout={handleLogout} />}
          />
          <Route path='/dashboard-staff/search/users' element={<Search />} />
          <Route path='/dashboard-client/:id/transfer' element={<Transfer />} />
          <Route
            path='/dashboard-client/:id/profile'
            element={<UserProfile handleLogout={handleLogout} />}
          />
          <Route path='/dashboard-client/:id/loans' element={<Loans />} />
          <Route
            path='/dashboard-client/:id/referal-rewards'
            element={<ReferalRewards />}
          />
          <Route
            path='/dashboard-client/:id/change-personal-data'
            element={<ChangePersonalData />}
          />
          <Route
            path='/dashboard-client/:id/change-profile-picture'
            element={<ChangeProfilePicture />}
          />
          <Route
            path='/dashboard-client/:id/reset-pin'
            element={<ResetPin />}
          />
          <Route
            path='/dashboard-client/:id/sport-wallet-funding'
            element={<SportWalletFunding />}
          />
          <Route
            path='/dashboard-client/:id/bill-payments'
            element={<BillPayments />}
          />
          <Route
            path='/dashboard-client/:id/mobile-topup'
            element={<MobileTopUp />}
          />
          <Route
            path='/dashboard-client/account-info/:id/generate-statement/:accountNumber'
            element={<GenerateStatement />}
          />
          <Route
            path='/dashboard-staff'
            element={<StaffDashboard handleLogout={handleLogout} />}
          />
          <Route path='/open-account' element={<OpenAccount />} />
          <Route
            path='/dashboard-client/:id/set-transfer-pin'
            element={<SetTransferPinPage />}
          />
          <Route
            path='/dashboard-client'
            element={<ClientDashboard handleLogout={handleLogout} />}
          />
          <Route
            path='/dashboard-client/account-info/:id'
            element={<AccountInfo account={account} />}
          />
          <Route
            path='/dashboard-client/account-info/:id/transactions/:accountNumber/:id'
            element={<TransactionInfo transaction={singleTransaction} />}
          />
          <Route
            path='/dashboard-staff/account-info/:id/transactions/:accountNumber/:id'
            element={<TransactionInfo transaction={singleTransactionStaff} />}
          />
          <Route
            path='/dashboard-client/:id/transactions/select-account'
            element={<SelectAccount />}
          />
          <Route
            path='/dashboard-client/account-info/:id/transactions/:accountNumber'
            element={
              <Transactions
                transactions={userTransactions}
                account={accountForTransactions}
              />
            }
          />
          <Route path='/password-reset' element={<ForgotPasswordPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
