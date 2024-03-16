import { useNavigate } from 'react-router-dom';
import './BillPayments.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import { Account, User } from '../../../../types';
import accountsService from '../../../../services/accounts';
import SelectBox from './comoponents/SelectBox';
import {
  billPayCategories,
  billerOptionsCableTV,
  billerOptionsDataPurchase,
  billerOptionsEducation,
  billerProductsCableTVDSTV,
  billerProductsCableTVGOTV,
  billerProductsCableTVSHOWMAX,
  billerProductsCableTVSTARTIMES,
  billerProductsCableTVTSTV,
  billerProductsDataPurchase9mobile,
  billerProductsDataPurchaseAIRTEL,
  billerProductsDataPurchaseGLO,
  billerProductsDataPurchaseMTN,
  billerProductsEducation,
  billerProductsTest,
} from './comoponents/CategoriesAndOptions';

const BillPayments = () => {
  const navigate = useNavigate();
  const [openSelectBox, setOpenSelectBox] = useState(false);
  const [openAccountSelectBox, setOpenAccountSelectBox] = useState(false);
  const [user, setUser] = useState<User>();
  const [accounts, setAccounts] = useState<Array<Account>>([]);
  const [accountToShow, setAccountToShow] = useState<Account>();
  const [category, setCategory] = useState('');
  const [biller, setBiller] = useState('');
  const [product, setProduct] = useState('');
  const [servicesToShow, setServicesToShow] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    accountsService.getAll().then((accounts) => {
      setAccounts(accounts);
      setAccountToShow(accounts[0]);
    });
  }, []);

  console.log(biller);

  const userAccounts = accounts.filter((account) => account.owner === user?.id);

  return (
    <div className='bill-pay'>
      <div className='top'>
        <ArrowBackIcon
          className='back-icon'
          onClick={() => navigate('/dashboard-client')}
        />
        <h2>Payments</h2>
      </div>
      <div className='body'>
        {/* box to show selected account */}
        <div
          className='total'
          onClick={() =>
            setOpenAccountSelectBox(!openAccountSelectBox ? true : false)
          }
        >
          <div className='total-info'>
            <h3>{`Account: ${accountToShow?.accountNumber}`}</h3>
            <strong>
              <h2 className='amount'>&#8358; {accountToShow?.balance}</h2>
            </strong>
            <p className='savings-percentage'>{`Status: ${accountToShow?.status}`}</p>
          </div>
          <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
        </div>

        {/* box (shows all accounts) to select account */}
        <div
          className={
            'account-select-box-container ' + (openAccountSelectBox && 'active')
          }
          onClick={() => setOpenAccountSelectBox(false)}
        >
          <div className='account-select-box'>
            <div>Account</div>
            {userAccounts.map((account) => (
              <div
                className='account-to-select'
                onClick={() => {
                  setAccountToShow(account);
                  setOpenAccountSelectBox(false);
                }}
                key={account.id}
              >
                <div>
                  {user?.firstName} {user?.lastName}
                </div>
                <div>
                  {account.accountNumber} . &#8358; {account.balance} . REGULAR
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* select box for bill pay category */}

        <div
          className='select'
          onClick={() => {
            setServicesToShow('Category');
            setOpenSelectBox(true);
          }}
        >
          <div className='text'>
            <p className={'text-head ' + (category && 'reduce-category')}>
              Category
            </p>
            {category}
          </div>
          <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
        </div>

        {/* select box for bill pay biller */}

        {category && (
          <div
            className='select'
            onClick={() => {
              setServicesToShow('Biller');
              setOpenSelectBox(true);
            }}
          >
            <div className='text'>
              <p className={'text-head ' + (biller && 'reduce-biller')}>
                Biller
              </p>
              {biller}
            </div>
            <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
          </div>
        )}

        {category && biller && (
          <div className='product-and-form-container'>
            <div
              className='select'
              onClick={() => {
                setServicesToShow('Product');
                setOpenSelectBox(true);
              }}
            >
              <div
                className='text'
                style={{ paddingTop: 0, paddingBottom: 6, height: 47 }}
              >
                <p className={'text-head ' + (product && 'reduce-product')}>
                  Product
                </p>
                {product}
              </div>
              <ArrowDropDownIcon fontSize='large' className='dropdown-icon' />
            </div>
            <form>
              <input type='text' placeholder='Amount' />
              <input type='text' placeholder='Description' />
              <input type='text' placeholder='Pin' />
              <button>Pay</button>
            </form>
          </div>
        )}
        <SelectBox
          services={
            servicesToShow === 'Category'
              ? billPayCategories
              : servicesToShow === 'Biller' && category === 'CABLE TV'
              ? billerOptionsCableTV
              : servicesToShow === 'Biller' && category === 'DATA PURCHASE'
              ? billerOptionsDataPurchase
              : servicesToShow === 'Biller' && category === 'EDUCATION'
              ? billerOptionsEducation
              : biller === 'DSTV'
              ? billerProductsCableTVDSTV
              : biller === 'GOTV'
              ? billerProductsCableTVGOTV
              : biller === 'TSTV'
              ? billerProductsCableTVTSTV
              : biller === 'STARTIMES'
              ? billerProductsCableTVSTARTIMES
              : biller === 'SHOWMAX'
              ? billerProductsCableTVSHOWMAX
              : biller === 'MTN DATA'
              ? billerProductsDataPurchaseMTN
              : biller === 'AIRTEL DATA'
              ? billerProductsDataPurchaseAIRTEL
              : biller === 'GLO DATA'
              ? billerProductsDataPurchaseGLO
              : biller === '9MOBILE DATA'
              ? billerProductsDataPurchase9mobile
              : servicesToShow === 'Product' && category === 'EDUCATION'
              ? billerProductsEducation
              : billerProductsTest
          }
          openSelectBox={openSelectBox}
          setOptions={
            servicesToShow === 'Category'
              ? setCategory
              : servicesToShow === 'Biller'
              ? setBiller
              : setProduct
          }
          setOpenSelectBox={setOpenSelectBox}
          header={servicesToShow}
        />
      </div>
    </div>
  );
};

export default BillPayments;
