import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


//IMAGES
import { ReactComponent as Logo } from 'assests/images/Logo.svg';


//Component 
import { PrimaryButton } from "components/button/button";

//Redux
import { useHistory } from 'react-router-dom';

//UTILITIES
import { goToHome, jumpToAccount } from "utilities/index";

//CSS 
import './landingHeader.css';

function LandingHeader({ navListing, sectionListing }) {
  const history = useHistory();
  //STATES
  const [selectedNav, setSelectedNav] = useState('home');
  const [showListing, setShowListing] = useState(false);

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
    else if (e.target.getAttribute('data-value') === 'aboutUs') {
      history.push('/about-us')
    }
    else if (e.target.getAttribute('data-value') === 'login') {
      jumpToAccount('login', history);
    }
    else if (e.target.getAttribute('data-value') === 'getStarted') {
      jumpToAccount('signup', history);
    }
    else {
      document.getElementById(e.target.getAttribute('data-value')).scrollIntoView({ behavior: 'smooth' });
      setSelectedNav(e.target.getAttribute('data-value'));
    }

    setShowListing(false);
  }


  return (
    <>
      <header className="landing-page-header d-flex padding-global">
        {/* LOGO */}
        <div
          onClick={() => goToHome(history)}
          className='logo-container'>
          <Logo />
        </div>

        {/* Navigation */}
        {navListing && <div id="home" className='main-navigation'>
          <nav className='landing-navigation'>
            <ol
              className='d-flex'
              onClick={handleLinkClick}
            >
              <li className={selectedNav === 'home' ? 'list-active' : ''} data-value='home'>Home</li>
              <li className={selectedNav === 'feature' ? 'list-active' : ''} data-value='feature'>Feature</li>
              <li className={selectedNav === 'guide' ? 'list-active' : ''} data-value='guide'>Guide</li>
              <li className={selectedNav === 'contact' ? 'list-active' : ''} data-value='contact'>Contact</li>
              <li className={selectedNav === 'aboutUs' ? 'list-active' : ''} data-value='aboutUs'>About us</li>
            </ol>
          </nav>
        </div>}

        {/* BUTTONS CONTAINER */}
        <div className='buttons-container'>
          <PrimaryButton
            name={'Login'}
            click={() => { jumpToAccount('login', history) }}
            btnContainerClass="ml-10"
            btnClass='header-btn landing-login-btn'
          />

          <PrimaryButton
            name={'Get Started'}
            click={() => { jumpToAccount('signup', history) }}
            btnContainerClass="ml-10"
            btnClass='header-btn landing-get-started'
          />
        </div>

        <div className='d-flex center-items btn-list-container'>
          {
            showListing
              ?
              <i
                onClick={() => setShowListing(false)}
                className="demo-icon size-30-primary  icon-close" />
              :
              <i
                onClick={() => setShowListing(true)}
                className="demo-icon  size-30-primary icon-menu" />
          }
          {showListing && <div className='listing'>
            {
              sectionListing
                ?
                <ol
                  className='d-flex flex-dir-col'
                  onClick={handleLinkClick}
                >

                  <li data-value='home'>Home</li>
                  <li data-value='feature'>Feature</li>
                  <li data-value='guide'>Guide</li>
                  <li data-value='contact'>Contact</li>
                  <li data-value='aboutUs'>About Us</li>
                </ol>
                :
                <ol
                  className='d-flex flex-dir-col'
                  onClick={handleLinkClick}
                >
                  <li data-value='login'>Login</li>
                  <li data-value='getStarted'>Get Started</li>
                </ol>
            }

            <span>Made with<i className="demo-icon icon-heart color-red" />
              by PRAJWAL BHATIA</span>
          </div>}
        </div>
      </header>
    </>
  )
}

export default LandingHeader;

LandingHeader.propTypes =
{
  sectionListing: PropTypes.bool,
  navListing: PropTypes.bool,
}

LandingHeader.defaultProps = {
  sectionListing: true,
  navListing: true,
}