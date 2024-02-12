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
            <div>
              <a href='#intro'>Home</a>
              <span className='line'></span>
            </div>
            <div>
              <a href='#about'>About</a>
              <span className='line'></span>
            </div>
            <div>
              <a href='#resources'>Resources</a>
              <span className='line'></span>
            </div>
            <div>
              <a href='#services'>Services</a>
              <span className='line'></span>
            </div>
            <div>
              <a href='#contact'>Contact</a>
              <span className='line'></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
