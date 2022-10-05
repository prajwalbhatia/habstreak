import React from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Intro } from './img/Intro.svg';
import { ReactComponent as Prime } from './img/Prime.svg';

//UTILITIES
import { jumpToAccount } from "utilities/index";

function Pricing() {
  const history = useHistory();

  return (
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
              <span className='rob-reg-14-black'>100</span>
            </div>

            <div className='mt-20 plan-info d-flex '>
              <span className='rob-reg-14-black'>No of rewards</span>
              <span className='rob-reg-14-black'>100</span>
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
  )
}

export default Pricing;