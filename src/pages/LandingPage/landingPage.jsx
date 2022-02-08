import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';

//Component 
import { PrimaryButton } from "components/button/button";

//CSS
import "../../index.css";
import './landingPage.css';

//Redux
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';


//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';

function LandingPage() {
  //STATES
  const [selectedNav, setSelectedNav] = useState('home');

  //FUNCTIONS
  const handleLinkClick = (e) => {
    console.log('🚀 ~ file: landingPage.jsx ~ line 27 ~ handleLinkClick ~ e', e.target.getAttribute('data-value'));
    if (e.target.getAttribute('data-value'))
      setSelectedNav('home');
    else
      setSelectedNav(e.target.getAttribute('data-value'));
  }

  return (
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

        </section>

        <section className='features-section'>
          <header></header>
        </section>

        <section className='guide-section'>
          <header></header>
        </section>

        <section className='pricing-section'>
          <header></header>
        </section>

        <section className='contact-section'>
          <header></header>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt1 pb3 align--center-on-mobile">

      </footer>
    </div>
  )
}

export default LandingPage
