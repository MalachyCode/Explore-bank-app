import About from './sections/about/About';
import Contact from './sections/contact/Contact';
import Intro from './sections/intro/Intro';
import Resources from './sections/resources/Resources';
import Services from './sections/services/Services';
import './HomePage.scss';
import { useState } from 'react';
import TopBar from './sections/topbar/TopBar';
import Menu from './sections/menu/Menu';

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className='home'>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className='home-container'>
        <Intro />
        <About />
        <Services />
        <Resources />
        <Contact />
      </div>
    </div>
  );
};

export default HomePage;
