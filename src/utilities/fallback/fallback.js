import React from 'react';

//CSS
import './fallback.css';
import "../../index.css";
import { PrimaryButton } from 'components/button/button';

function fallback({ error, resetErrorBoundary }) {
  return (
    <div className='fallback center-items flex-dir-col'>
      <h1 className='mt-10'>Something went wrong:</h1>
      <p className='mt-10' >{error.message}</p>
      <PrimaryButton
        name={'Try again'}
        click={resetErrorBoundary}
        style={{marginTop : '1rem'}}
      />
    </div>
  )
}

export default fallback;