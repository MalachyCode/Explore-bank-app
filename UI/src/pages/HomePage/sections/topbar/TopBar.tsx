import './TopBar.scss';

const TopBar = (props: {
  menuOpen: boolean;
  setMenuOpen: (arg0: boolean) => void | boolean;
}) => {
  return (
    <div className={'topbar ' + (props.menuOpen && 'active')}>
      <div className='wrapper'>
        <div className='left'>
          <a href='#intro' className='explore-logo'>
            Explore.
          </a>
        </div>
        <div className='right'>
          <div
            className='hamburger'
            onClick={() => props.setMenuOpen(!props.menuOpen)}
          >
            <span className='line1'></span>
            <span className='line2'></span>
            <span className='line3'></span>
          </div>
          <div className='menu-items'>
            <a href='#intro'>Home</a>
            <a href='#about'>About</a>
            <a href='#resources'>Resources</a>
            <a href='#services'>Services</a>
            <a href='#contact'>Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
