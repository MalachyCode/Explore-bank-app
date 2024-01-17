import About from './sections/about/About';
import Contact from './sections/contact/Contact';
import Intro from './sections/intro/Intro';
import Resources from './sections/resources/Resources';
import Services from './sections/services/Services';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className='home-container'>
      <Intro />
      <About />
      <Services />
      <Resources />
      <Contact />
    </div>
  );
};

export default HomePage;
