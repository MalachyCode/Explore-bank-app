import { useState } from 'react';
import './intro.scss';

const Intro = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [timer, setTimer] = useState<number>(5000);

  // setTimeout(() => {
  //   setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1);
  // }, timer);
  console.log(currentSlide);
  console.log(timer);

  return (
    <div className='intro' id='intro'>
      <div className='intro-section-one'>
        <div
          className='intro-opacity-cover'
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        >
          <div className='welcome-note'>
            <h1 className='header'>Explore bank</h1>
            <h3>Explore endless opportunities</h3>
            <div className='buttons-container'>
              <button className='button-1'>Get Started</button>
              <button className='button-2'>Continue</button>
            </div>
          </div>
        </div>
        <div
          className='brief-about'
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        >
          <p>
            At Explore bank, your financial success is our priority. We're
            committed to providing you with secure, easy-to-use banking
            solutions that fit your lifestyle. Let's make your dreams a reality,
            together!
          </p>
        </div>
        <div
          className='services-highlight'
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        >
          <div className='highlight-container'>
            <div className='highlight-1'>
              <p>Send Money</p>
            </div>
            <div>
              <p>Recieve Money</p>
            </div>
            <div>
              <p>Personal and Commercial Loans</p>
            </div>
            <div>
              <p>Investment Advisory Service</p>
            </div>
            <div>
              <p>Mobile Banking</p>
            </div>
            <div>
              <p>247 Customer Service</p>
            </div>
          </div>
        </div>
      </div>
      <div className='slider-btn-container'>
        <span
          className='line-1'
          onClick={() => {
            setCurrentSlide(0);
            setTimer(5000);
          }}
        ></span>
        <span
          className='line-2'
          onClick={() => {
            setCurrentSlide(1);
            setTimer(5000);
          }}
        ></span>
        <span
          className='line-3'
          onClick={() => {
            setCurrentSlide(2);
            setTimer(5000);
          }}
        ></span>
      </div>
      <div className='intro-footer' onClick={() => setCurrentSlide(0)}>
        <div className='intro-footnote-sidebar'></div>
        <div className='intro-footnote'>
          <p>
            Join us today and experience banking like never before. Welcome to a
            world of endless possibilities. Welcome to Explore bank!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
