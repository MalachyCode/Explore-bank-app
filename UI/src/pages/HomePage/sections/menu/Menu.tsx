import './Menu.scss';
import { useNavigate } from 'react-router-dom';

const ListItem = (props: {
  open: (arg0: boolean) => void | boolean;
  message: string;
  href: string;
}) => {
  return (
    <li onClick={() => props.open(false)}>
      <a href={props.href}>{props.message}</a>
    </li>
  );
};

const Menu = (props: {
  menuOpen: boolean;
  setMenuOpen: (arg0: boolean) => void | boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className={'menu ' + (props.menuOpen && 'active')}>
      <ul>
        <ListItem message='Home' open={props.setMenuOpen} href='#intro' />
        <ListItem message='About' open={props.setMenuOpen} href='#about' />
        <ListItem
          message='Resources'
          open={props.setMenuOpen}
          href='#resources'
        />
        <ListItem
          message='Services'
          open={props.setMenuOpen}
          href='#services'
        />
        {/* <li>
          <a href='#contact'>Contact</a>
        </li> */}
        <ListItem message='Contact' open={props.setMenuOpen} href='#contact' />
      </ul>
      <div className='buttons'>
        <a
          // href='/login'
          className='button type--B'
          onClick={() => {
            navigate('/login');
            props.setMenuOpen(false);
          }}
        >
          <div className='button__line'></div>
          <div className='button__line'></div>
          <span className='button__text'>Login</span>
          <div className='button__drow1'></div>
          {/* <div className='button__drow2'></div> */}
        </a>
        <a
          // href='/signup'
          className='button type--A'
          onClick={() => {
            navigate('/signup');
            props.setMenuOpen(false);
          }}
        >
          <div className='button__line'></div>
          <div className='button__line'></div>
          <span className='button__text'>Signup</span>
          <div className='button__drow1'></div>
          {/* <div className='button__drow2'></div> */}
        </a>
      </div>
    </div>
  );
};

export default Menu;
