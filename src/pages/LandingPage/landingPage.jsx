import React, { useState, useEffect, lazy } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

//Component 
import { PrimaryButton } from "components/button/button";
import LandingHeader from 'components/landing-header/landingHeader';
import { TextInputElement, InputElement } from "components/form-elements/form-elements";

//CSS
import "../../index.css";
import './landingPage.css';

import { useHistory } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import {
  emptyError
} from "redux/actions/support"

//UTILITIES
import { jumpToAccount, dialogForError } from "utilities/index";

//IMAGES
import { ReactComponent as Hero } from './img/hero.svg';

import { Suspense } from 'react';

const Guide = lazy(() => import('components/landing-page/Guide'));
const Pricing = lazy(() => import('components/landing-page/Pricing'));
const Contact = lazy(() => import('components/landing-page/Contact'));
const Footer = lazy(() => import('components/landing-page/Footer'));

function LandingPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  let error = useSelector((state) => state.user.error);

  //STATES
  useEffect(() => {
    if (error.length > 0) {
      dialogForError(error);
      dispatch(emptyError());
    }
  }, [dispatch, error])

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
        <Suspense fallback={<div className="loader-container">
          <ClipLoader loading size={40} color="var(--primaryColor)" />
        </div>}>
          <Guide />
        </Suspense>

        <Suspense fallback={<div className="loader-container">
          <ClipLoader loading size={40} color="var(--primaryColor)" />
        </div>}>
          <Pricing/>
        </Suspense>

        <Suspense fallback={<div className="loader-container">
          <ClipLoader loading size={40} color="var(--primaryColor)" />
        </div>}>
          <Contact  />
        </Suspense>
        {/* </main> */}

        {/* Footer */}
        <Suspense fallback={<div className="loader-container">
          <ClipLoader loading size={40} color="var(--primaryColor)" />
        </div>}>
          <Footer/>
        </Suspense>

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
