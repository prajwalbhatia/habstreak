import React, { useState } from 'react';

//Component 
import { PrimaryButton } from "components/button/button";
import { TextInputElement, InputElement } from "components/form-elements/form-elements";

//CSS
import "../../index.css";
import './landingPage.css';

//Redux
import { useHistory } from 'react-router-dom';


//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';
import { useEffect } from 'react';

function LandingPage() {
  const history = useHistory();
  //STATES
  const [selectedNav, setSelectedNav] = useState('home');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = (e) => {
    let scroll = window.scrollY;
    if (scroll && scroll < 400)
      setSelectedNav('home');
  }

  //FUNCTIONS
  const handleLinkClick = (e) => {
    if (!e.target.getAttribute('data-value'))
      setSelectedNav('home');
    else {
      document.getElementById(e.target.getAttribute('data-value')).scrollIntoView({ behavior: 'smooth' });
      setSelectedNav(e.target.getAttribute('data-value'));
    }
  }

  /**
   * 
   * @param {String} jumpTo - to where to jump (signup or login) 
   */
  const jumpToAccount = (jumpTo) => {
    history.push({
      pathname: `/account`,
      state: { jumpTo },
    });
  }

  //FUNCTIONS


  return (
    <div>
      <div className='landing-page'>
        {/* Header */}
        <div className='hero-background'>
          <header className="landing-page-header d-flex padding-global">
            {/* LOGO */}
            <div className='logo-container'>
              <Logo />
            </div>

            {/* Navigation */}
            <div className='main-navigation'>
              <nav className='landing-navigation'>
                <ol
                  className='d-flex'
                  onClick={handleLinkClick}
                >
                  <li className={selectedNav === 'home' ? 'list-active' : ''} data-value='home'>Home</li>
                  <li className={selectedNav === 'feature' ? 'list-active' : ''} data-value='feature'>Feature</li>
                  <li className={selectedNav === 'guide' ? 'list-active' : ''} data-value='guide'>Guide</li>
                  <li className={selectedNav === 'pricing' ? 'list-active' : ''} data-value='pricing'>Pricing</li>
                </ol>
              </nav>
            </div>

            {/* BUTTONS CONTAINER */}
            <div className='buttons-container'>
              <PrimaryButton
                name={'Login'}
                click={() => {jumpToAccount('login')}}
                btnContainerClass="ml-10"
                btnClass='header-btn landing-login-btn'
              />

              <PrimaryButton
                name={'Get Started'}
                click={() => { jumpToAccount('signup') }}
                btnContainerClass="ml-10"
                btnClass='header-btn landing-get-started'
              />
            </div>
          </header>

          {/* <main> */}
          <section id="hero" className='hero-section padding-global'>
            <div className='hero-container'>
              <h1 className='h1-50'>Malesuada consectetur posuere proin proin enim</h1>
              <p className='p-18'>Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat. Sed nec posuere turpis.</p>
              <div className='buttons d-flex'>
                <PrimaryButton
                  name={'Get Started'}
                  click={() => { jumpToAccount('signup') }}
                  btnContainerClass=""
                  btnClass='header-btn landing-get-started'
                />

                <PrimaryButton
                  name={'Login'}
                  click={() => { jumpToAccount('login') }}
                  btnContainerClass="ml-30"
                  btnClass='header-btn landing-login-btn'
                />
              </div>
            </div>
          </section>
        </div>

        <section id="feature" className='features-section feature-background padding-global'>
          <header className='feature-heading'>Features</header>

          <div className='section-container'>
            <div className="left-section">
              <div className='top-row'>
                <div className='feature-card'>
                  <h1>Features</h1>
                  <p>Cras eu elit congue, placerat dui ut, tincidunt nisl.</p>
                </div>

                <div className='feature-card'>
                  <h1>Features</h1>
                  <p>Cras eu elit congue, placerat dui ut, tincidunt nisl.</p>
                </div>
              </div>
              <div className='bottom-row'>
                <div className='feature-card'>
                  <h1>Features</h1>
                  <p>Cras eu elit congue, placerat dui ut, tincidunt nisl.</p>
                </div>

                <div className='feature-card'>
                  <h1>Features</h1>
                  <p>Cras eu elit congue, placerat dui ut, tincidunt nisl.</p>
                </div>
              </div>
            </div>

            <div className="right-section">
              <h1 className='h1-40'>Malesuada consectetur posuere proin proin enim</h1>
              <p className='p-18'>Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat. Sed nec posuere turpis.</p>

              <div className='buttons d-flex mt-50'>
                <PrimaryButton
                  name={'Get Started'}
                  click={() => { jumpToAccount('signup') }}
                  btnContainerClass=""
                  btnClass='header-btn landing-get-started'
                />
              </div>
            </div>
          </div>

        </section>

        <section id="guide" className='guide-section guide-background padding-global'>
          <header className='guide-heading mt-30'>Guide</header>

          <div className='d-flex mt-40' style={{ height: 'inherit' }}>
            <div className="left-section">
              <h1 className='h1-40'>Malesuada consectetur posuere proin proin enim</h1>
              <p className='p-18'>Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat. Sed nec posuere turpis.</p>
            </div>

            {/* <div className="right-section">
                <VideoImage />
              </div> */}
          </div>
        </section>

        <section className='pricing-section'>
          <header></header>
        </section>

        <section id="pricing" className='contact-section contact-background padding-global'>
          {/* <hr></hr>
            <div className='h-1'></div> */}
          <div className='container'>
            <div className='left-section'>
              <Logo />
              <p className='mt-20'>Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat.pharetra bibendum justo quis, cursus consectetur erat.</p>

              <div className='socials mt-30'>
                <i className="demo-icon icon-facebook mr-20 contact-icon" />
                <i className="demo-icon icon-instagram mr-20 contact-icon" />
                <i className="demo-icon icon-twitter contact-icon" />
              </div>
            </div>
            <div className='middle-section'>
              {/* <Footer /> */}
            </div>
            <div className='right-section'>
              <h4 className='write-ur-text'>Write us</h4>

              <TextInputElement
                placeholder={'Write message'}
                onChange={(e) => {
                  // setDesc({ ...desc, [detail._id]: e.target.value })
                }}
                value={''}
                type={'text'}
                containerClass={'mt-20'}
              />


              <InputElement
                placeholder={'Email id'}
                type="text"
                containerClass={'mt-20'}
              // value={formData?.[data.uid]}
              // onChange={}
              />

              <PrimaryButton
                name={'Send'}
                click={() => { }}
                btnContainerClass="d-flex justify-end"
                btnClass='header-btn landing-login-btn send-btn mt-30'
              />
            </div>
          </div>
        </section>
        {/* </main> */}

        {/* Footer */}
        <div className='d-flex justify-center mt-50'>
          <footer className="footer">
            <div className='d-flex'>
              <div className='footer-navigation'>
                <ol
                  className='d-flex'
                  onClick={handleLinkClick}
                >
                  <li className='home color-fff' data-value='home'>Home</li>
                  <li className='feature color-fff' data-value='feature'>Feature</li>
                  <li className='guide color-fff' data-value='guide'>Guide</li>
                  <li className='pricing color-fff' data-value='pricing'>Pricing</li>
                </ol>
              </div>

              <div className='d-flex flex-1 justify-end'>
                <p className='color-fff'>Copyright © by Habstreak 2022</p>
              </div>

            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
