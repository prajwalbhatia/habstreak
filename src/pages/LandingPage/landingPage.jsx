import React, { useState } from 'react';

//Component 
import { PrimaryButton } from "components/button/button";
import { TextInputElement, InputElement } from "components/form-elements/form-elements";


//CSS
import "../../index.css";
import './landingPage.css';

//Redux
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';


//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';
import { ReactComponent as HeroImage } from './img/hero.svg';
import { ReactComponent as VideoImage } from './img/video.svg';
import { ReactComponent as Footer } from './img/footer.svg';

function LandingPage() {
  //STATES
  const [selectedNav, setSelectedNav] = useState('home');

  //FUNCTIONS
  const handleLinkClick = (e) => {
    if (!e.target.getAttribute('data-value'))
      setSelectedNav('home');
    else
      setSelectedNav(e.target.getAttribute('data-value'));
  }

  return (
    <div>
      <div className='landing-page'>
        {/* Header */}
        <header className="landing-page-header d-flex">
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
              click={() => { }}
              btnContainerClass="ml-10"
              btnClass='header-btn landing-login-btn'
            />

            <PrimaryButton
              name={'Get Started'}
              click={() => { }}
              btnContainerClass="ml-10"
              btnClass='header-btn landing-get-started'
            />
          </div>
        </header>

        <main>
          <section className='hero-section'>
            <div className='hero-background'></div>
            <div className="left-section">
              <h1 className='h1-50'>Malesuada consectetur posuere proin proin enim</h1>
              <p className='p-18'>Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat. Sed nec posuere turpis.</p>

              <div className='buttons d-flex'>
                <PrimaryButton
                  name={'Get Started'}
                  click={() => { }}
                  btnContainerClass=""
                  btnClass='header-btn landing-get-started'
                />

                <PrimaryButton
                  name={'Login'}
                  click={() => { }}
                  btnContainerClass="ml-30"
                  btnClass='header-btn landing-login-btn'
                />
              </div>
            </div>

            <div className="right-section">
              {/* <HeroImage /> */}
            </div>

          </section>

          <section className='features-section feature-background'>
            {/* <div className='feature-background'></div> */}
            <header className='feature-heading'>Features</header>

            <div className='section-container'>
              <div className="left-section">
                {/* <div className='top-row'>
                <div className='feature-card'>
                  <h1>Features</h1>
                  <p>Cras eu elit congue, placerat dui ut, tincidunt nisl.</p>
                </div>
              </div>
              <div className='bottom-row'></div> */}
              </div>

              <div className="right-section">
                <h1 className='h1-40'>Malesuada consectetur posuere proin proin enim</h1>
                <p className='p-18'>Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat. Sed nec posuere turpis.</p>

                <div className='buttons d-flex mt-50'>
                  <PrimaryButton
                    name={'Get Started'}
                    click={() => { }}
                    btnContainerClass=""
                    btnClass='header-btn landing-get-started'
                  />
                </div>
              </div>
            </div>

          </section>

          <section className='guide-section guide-background'>
            <header className='guide-heading mt-30'>Guide</header>

            <div className='d-flex mt-40' style={{height : 'inherit'}}>
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

          <section className='contact-section contact-background'>
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
        </main>

        {/* Footer */}
        <div className='d-flex justify-center mt-50'>
          <footer className="footer">
            <div className='d-flex'>
              <div className='footer-navigation'>
                <ol
                  className='d-flex'
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
