import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';


function Footer() {
  const history = useHistory();

  //STATES
  const [selectedNav, setSelectedNav] = useState('home');

  //FUNCTIONS
  const handleLinkClick = (e) => {
    if (!e.target.getAttribute('data-value'))
      setSelectedNav('home');
    else if (e.target.getAttribute('data-value') === 'aboutUs') {
      history.push('/about-us')
    }
    else {
      document.getElementById(e.target.getAttribute('data-value')).scrollIntoView({ behavior: 'smooth' });
      setSelectedNav(e.target.getAttribute('data-value'));
    }
  }

  const handleScroll = (e) => {
    let scroll = window.scrollY;
    if (scroll && scroll < 400)
      setSelectedNav('home');
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);



  return (
    <div className='d-flex justify-center mt-50 footer-container'>
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
              <li className='contact color-fff' data-value='contact'>Contact</li>
            </ol>
          </div>

          <div className='d-flex flex-1 justify-end'>
            <p className='color-fff'>Copyright © by Habstreak 2022</p>
          </div>

        </div>
      </footer>

      <div className='d-flex flex-1 justify-center small-screen-footer-text'>
        <p className='rob-reg-10-grey'>Copyright © by Habstreak 2022</p>
      </div>
    </div>
  )
}

export default Footer