import React from 'react';

//CSS
import "../../index.css";
import './policies.css';

//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';

function CancellationPolicy() {
  return (
    <div className='policy-main-container padding-global'>
      <div>
        <header className="landing-page-header d-flex">
          {/* LOGO */}
          <div className='logo-container'>
            <Logo />
          </div>
        </header>
      </div>

      <div className='policy-container'>
        <h1 className='mt-10'>Cancellations and Refunds</h1>
        <p className='mt-10'>
          You may cancel your Habstreak Membership at any time for any or no reason. If you have cancelled your Habstreak Membership, you will lose access to all Premium features you enrolled into during your Habstreak Membership the moment you will recieve your refund.
          For cancellation please email at <strong>prajwal6bhatia@gmail.com</strong> with your email id.
        </p>
      </div>
    </div >
  )
}

export default CancellationPolicy