import React from 'react';
import { useHistory } from 'react-router-dom';


//CSS
import "../../index.css";
import './policies.css';

//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';
import { goToHome } from 'utilities';

function CancellationPolicy() {
  const history = useHistory();
  return (
    <div className='policy-main-container padding-global'>
      <div>
        <header className="landing-page-header d-flex">
          {/* LOGO */}
          <div
            onClick={() => goToHome(history)}
            className='logo-container'>
            <Logo />
          </div>
        </header>
      </div>

      <div className='policy-container'>
        <h1 className='mt-10'>Cancellations and Refunds</h1>
        <p className='mt-10'>
          Once you have paid for one month membership you will not be able to cancel your menbership for 1 month. After that its your choice, if you want to continue you can pay for next month. Once you have completed your membership month and you don't pay for next month you will only be able to see 2 streaks or 2 rewards as it is in our free plan.
        </p>
      </div>
    </div >
  )
}

export default CancellationPolicy