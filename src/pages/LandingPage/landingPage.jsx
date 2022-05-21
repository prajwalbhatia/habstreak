import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { ClipLoader } from "react-spinners";

//Component 
import { PrimaryButton } from "components/button/button";
import LandingHeader from 'components/landing-header/landingHeader';
import { TextInputElement, InputElement } from "components/form-elements/form-elements";

//CSS
import "../../index.css";
import './landingPage.css';

//Redux
import { useHistory } from 'react-router-dom';

//UTILITIES
import { jumpToAccount } from "utilities/index";

//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';
import { ReactComponent as Hero } from './img/hero.svg';
import { ReactComponent as Video } from './img/video.svg';
import { ReactComponent as Intro } from './img/Intro.svg';
import { ReactComponent as Prime } from './img/Prime.svg';
import { height } from '@mui/system';
import screenfull from 'screenfull';

function LandingPage() {
  const history = useHistory();

  //REF
  const playerContainerRef = useRef();

  //STATES
  const [selectedNav, setSelectedNav] = useState('home');
  const [playIcon, setPlayIcon] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [url, setUrl] = useState(null)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    //If we have a user in local storage
    //and it is not verified then we have to clear
    //local storage
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
      const isVerified = user?.result?.verified;
      if (!isVerified) {
        localStorage.clear();
        window.location.reload();
      }
    }

  }, [])

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
    else {
      document.getElementById(e.target.getAttribute('data-value')).scrollIntoView({ behavior: 'smooth' });
      setSelectedNav(e.target.getAttribute('data-value'));
    }
  }

  //FUNCTIONS


  return (
    <div>
      <div className='landing-page'>
        {/* Header */}
        <div className='global-background hero-background'>
          <LandingHeader
            navListing={true}
          />

          {/* <main> */}
          <section id="hero" className='hero-section padding-global d-flex justify-space-between'>
            <div className='hero-container'>
              <h1 className='h1-50'>Get things done and reward yourself</h1>
              <p className='p-18'>Are you tired of starting the things and dropping in between??? Not anymore, try habstreak, record your task and reward yourself on reaching milestones</p>
              <div className='buttons d-flex'>
                <PrimaryButton
                  name={'Get Started'}
                  click={() => { jumpToAccount('signup', history) }}
                  btnContainerClass="fit-content"
                  btnClass='header-btn landing-get-started'
                />

                <PrimaryButton
                  name={'Login'}
                  click={() => { jumpToAccount('login', history) }}
                  btnContainerClass="ml-30 fit-content"
                  btnClass='header-btn landing-login-btn'
                />
              </div>
            </div>

            <div className='hero-image d-flex justify-end'>
              <Hero />
            </div>

          </section>
        </div>

        <section id="feature" className='global-background features-section feature-background padding-global'>
          <header className='feature-heading'>Features</header>

          <div className='section-container'>
            <div className="left-section">
              <div className='top-row'>
                <div className='feature-card'>
                  <h1>Streak</h1>
                  <p>Create a streak of your task and keep ourself aware of your progress</p>
                </div>

                <div className='feature-card'>
                  <h1>Rewards</h1>
                  <p>Reward yourself on reaching certain milestones on every streak</p>
                </div>
              </div>
              <div className='bottom-row'>
                <div className='feature-card'>
                  <h1>Progress</h1>
                  <p>Everyday progress is necessary to keep you going and accomplish more.</p>
                </div>

                <div className='feature-card'>
                  <h1>Details</h1>
                  <p>Keep record of all task you are completing on a particular day and on particular streak</p>
                </div>
              </div>
            </div>

            <div className="right-section">
              <h1 className='h1-40'>Reward yourself and make the road of success exciting</h1>
              <p className='p-18'>Most good things take time and alot of effort, so why only wait for the end result?? Reward youself on small success and make your journey more exciting</p>

              <div className='buttons d-flex mt-50'>
                <PrimaryButton
                  name={'Get Started'}
                  click={() => { jumpToAccount('signup', history) }}
                  btnContainerClass=""
                  btnClass='header-btn landing-get-started'
                />
              </div>
            </div>
          </div>

        </section>

        <section id="guide" className='global-background guide-section guide-background padding-global'>
          <header className='guide-heading'>Guide</header>

          <div className='d-flex mt-40 guide-container' >
            <div className="left-section">
              <h1 className='h1-40'>Enjoying the process is important</h1>
              <p className='p-18'>Take baby steps daily to complete the impossible looking tasks and make impossible task says I M POSSIBLE.</p>
            </div>


            <div className="right-section" style={{ position: 'relative' }}>
              <div className='player-container' >
                <div
                  ref={playerContainerRef}
                  style={{ position: 'relative' }}
                >
                  <ReactPlayer
                    url={process.env.REACT_APP_ENV === 'development' ? "http://localhost:5000/habstreak_guide.mp4" : 'https://habstreak.herokuapp.com/habstreak_guide.mp4'}
                    width="100%"
                    height="100%"
                    playing={playIcon}
                    className={playerReady ? 'react-player' : 'react-player player-shimmer'}
                    onReady={() => {
                      setPlayerReady(true);
                    }}
                    onStart={() => {
                      // setPlayerReady(false);
                    }}
                  />
                    


                  {
                    playerReady
                    &&
                    <>
                      <div className='fullscreen-icon'
                        onClick={() => {
                          screenfull.toggle(playerContainerRef.current)
                          console.log('TOGGLE', screenfull.isFullscreen)

                          setIsFullScreen(!isFullScreen);

                          // }
                        }}>
                        {
                          isFullScreen
                            ?
                            <i className="demo-icon icon-fullscreen-exit full-screen-icon" />
                            :
                            <i className="demo-icon icon-fullscreen full-screen-icon" />
                        }
                      </div>


                      <div className='play-pause-icon'
                        onClick={() => {
                          setPlayIcon(!playIcon)
                        }}>
                        {
                          !playIcon
                            ?
                            <i className="demo-icon icon-play play-icon" />
                            :
                            <i className="demo-icon icon-pause play-icon" />
                        }
                      </div>
                    </>
                    
                  }
                </div>


              </div>

            </div>
          </div>
        </section>

        <section id="pricing" className='global-background pricing-section price-background padding-global'>
          <header className='price-heading'>Pricing</header>

          <div className='d-flex pack-container'>
            <div className='flex-dir-col price-box free-pricing-container'>
              <div className='d-flex price-heading-box free-box'>
                <div className='icon-container'>
                  <Intro />
                </div>
                <div className='price-info-container ml-10'>
                  <div className='title-container'>
                    <h2 className='font-jos'>INTRO</h2>
                  </div>
                  <div className='price-container'>
                    {/* <span className='rob-bold-12-black'>$</span><span className='foont-jos size-36'>19</span><span className='rob-reg-14-black'>.99 / PER MONTH</span> */}
                    <span className='foont-jos size-36'>FREE</span>
                  </div>

                </div>
              </div>

              <div className='flex-auto'>
                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>No of streaks</span>
                  <span className='rob-reg-14-black'>2</span>
                </div>

                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>No of rewards</span>
                  <span className='rob-reg-14-black'>2</span>
                </div>

                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>Dashboard Summary</span>
                  <span className='rob-reg-14-black'>Yes</span>
                </div>

                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>Recent Activities</span>
                  <span className='rob-reg-14-black'>No</span>
                </div>
              </div>

              <div className='center-items mb-10'>
                <div className='d-flex plan-btn-container center-items mt-20'>
                  <h3 className='font-18 font-jos font-bold'>Default Plan</h3>
                </div>
              </div>
            </div>

            <div className='flex-dir-col price-box prime-pricing-container'>
              <div className='d-flex price-heading-box prime-box'>
                <div className='icon-container'>
                  <Prime />
                </div>
                <div className='price-info-container ml-10'>
                  <div className='title-container'>
                    <h2 className='font-jos'>PRIME</h2>
                  </div>
                  <div className='price-container'>
                    <span className='rob-bold-12-black'>Rs</span><span className='foont-jos size-36 ml-5'>45</span><span className='rob-reg-14-black'>.00 / PER MONTH</span>
                  </div>

                </div>
              </div>

              <div className='flex-auto'>
                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>No of streaks</span>
                  <span className='rob-reg-14-black'>Unlimited</span>
                </div>

                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>No of rewards</span>
                  <span className='rob-reg-14-black'>Unlimited</span>
                </div>

                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>Dashboard Summary</span>
                  <span className='rob-reg-14-black'>Yes</span>
                </div>

                <div className='mt-20 plan-info d-flex '>
                  <span className='rob-reg-14-black'>Recent Activities</span>
                  <span className='rob-reg-14-black'>Yes</span>
                </div>
              </div>

              <div className='center-items mb-10'>
                <div onClick={() => { jumpToAccount('signup', history) }} className='d-flex plan-btn-container center-items mt-20 prime-btn c-pointer'>
                  <h3 className='font-18 font-jos font-bold'>Choose Plan</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className='contact-section contact-background padding-global'>
          {/* <hr></hr>
            <div className='h-1'></div> */}
          <div className='container'>
            <div className='left-section'>
              <Logo />
              <p className='mt-20'>When you will rewards yourself on small small milestones than you will feel exciting and motivated to complete that task and you will not break the streak.</p>

              <div className='socials mt-30'>
                <i className="demo-icon icon-facebook mr-20 contact-icon" />
                <i className="demo-icon icon-instagram mr-20 contact-icon" />
                <i className="demo-icon icon-twitter contact-icon" />

                <i className="demo-icon icon-fullscreen contact-icon" />

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

        <div className='d-flex justify-center policies'>
          <span onClick={() => {
            history.push('/privacy-policy')
          }}>Privacy Policy</span><span onClick={() => {
            history.push('/terms-and-condition')
          }}>|| Terms and Policies ||</span><span onClick={() => {
            history.push('/refund-policy')
          }}>Refund Policy</span>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
