import './Menu.scss';

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
    </div>
  );
};

export default Menu;
