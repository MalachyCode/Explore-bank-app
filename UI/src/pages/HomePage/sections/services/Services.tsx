import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { servicesData } from './servicesData';
import RenderServices from '../../../../components/RenderService';

import './Services.scss';

const Services = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    // service page houses the various services identified by clickable headers (divs with service-header class)
    <div className='services' id='services'>
      <div className='services-message'>
        <h3>Our Services</h3>
        <p>
          From 247 online and customer services to savings accounts and
          business/ personal loans, we offer a range of services at Explore to
          enable you financial security and ease of access to round the clock
          assistance.
        </p>
      </div>
      <Carousel
        // showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={this.props.deviceType !== 'mobile' ? true : false}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        transitionDuration={2000}
        containerClass='carousel-container'
        removeArrowOnDeviceType={['tablet', 'mobile']}
        // deviceType={this.props.deviceType}
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
      >
        {servicesData.map((service) => (
          <RenderServices service={service} key={service.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default Services;
