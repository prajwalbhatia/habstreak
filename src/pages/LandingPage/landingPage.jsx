import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';

//COMPONENTS
import { PrimaryButton } from "components/button/button";

//CSS
import './landingPage.css';
import "../../index.css";

//Redux
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

//Actions
import { auth } from "../../redux/actions/user";


//IMAGES
import { ReactComponent as AssignSvg } from './img/assign.svg';
import { ReactComponent as ConnectedSvg } from './img/connected.svg';
import { ReactComponent as DataSvg } from './img/data.svg';
import { ReactComponent as FacebookSvg } from './img/facebook.svg';
import { ReactComponent as MailSvg } from './img/mail.svg';
import { ReactComponent as HabstreakSvg } from './img/habstreak.svg';
import { ReactComponent as MessagingSvg } from './img/messaging.svg';
import { ReactComponent as SearchSvg } from './img/search.svg';
import { ReactComponent as SecuritySvg } from './img/security.svg';
import { ReactComponent as TextSvg } from './img/text.svg';
import { ReactComponent as TwitterSvg } from './img/twitter.svg';
import { ReactComponent as VaultSvg } from './img/vault.svg';
import { ReactComponent as YoutubeSvg } from './img/youtube.svg';

function LandingPage() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  useEffect(() => {
    const token = user?.token;
    if (token)
      history.push('/dashboard');
    // setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(auth({ result, token }));
      history.push('/dashboard');
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => {
    console.log('GOOGLE FAILURE')
  }


  return (
    <div className='landing-page'>
      {/* Navigation */}
      <div className='main-navigation'>
        <nav className='landing-navigation'>
          <div className='login-btn-container'>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with google"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </nav>
      </div>


      {/* Header */}
      <header className="align--center pt3">
        <div className="container--lg border--bottom pb3 ">
          <HabstreakSvg />
          <h1 className="mb2">Complete your task and reward yourself.</h1>
        </div>
      </header>

      <main>

        {/* Feature list */}
        <div className="container pt3 mt2 text--gray align--center">
          <h2 className="mb3">-FEATURES-</h2>
          <div className="grid-row">
            <div className="grid-column span-one-third mb3 reveal-on-scroll is-revealing">
              <AssignSvg />
              <p>Assign to others</p>
            </div>
            <div className="grid-column span-one-third mb3 reveal-on-scroll is-revealing">
              <ConnectedSvg />
              <p>Stay connected</p>
            </div>
            <div className="grid-column span-one-third mb3 reveal-on-scroll is-revealing">
              <SearchSvg />
              <p>Powerful search</p>
            </div>
            <div className="grid-column span-one-third mb3 reveal-on-scroll is-revealing">
              <VaultSvg />
              <p>Put in a vault</p>
            </div>
            <div className="grid-column span-one-third mb3 reveal-on-scroll is-revealing">
              <MessagingSvg />
              <p>Fast messaging</p>
            </div>
            <div className="grid-column span-one-third mb3 reveal-on-scroll is-revealing">
              <MailSvg />
              <p>Share with others</p>
            </div>
          </div>
        </div>

        {/* Focus */}
        <div className="container--lg pt1 pb1">

          <div className="grid-row grid-row--center">
            <div className="grid-column mt3 mb2 order-2">
              <div className="border--bottom pb2 mb2">
                <h2>Usage data</h2>
                <p>Quis istud possit, inquit, negare? Videamus animi partes, quarum est conspectus illustrior; Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; Non enim, si omnia non&nbsp;sequebatur.</p>
              </div>
              <p className="italic text--gray mb1">Quae quo sunt excelsiores, eo dant clariora indicia naturae. Causa autem fuit huc veniendi ut quosdam&nbsp;hinc.</p>
              <p className="bold">Carry Andersen, COO at&nbsp;Stripe</p>
            </div>
            <div className="grid-column span-1"></div>
            <div className="grid-column mt3 mb2 order-1 reveal-on-scroll is-revealing">
              <DataSvg />
            </div>
          </div>

          <div className="grid-row grid-row--center">
            <div className="grid-column mt3 mb2 reveal-on-scroll is-revealing">
              <SecuritySvg />
            </div>
            <div className="grid-column span-1"></div>
            <div className="grid-column mt3 mb2">
              <div className="border--bottom pb2 mb2">
                <h2>Absolute security</h2>
                <p>Itaque his sapiens semper vacabit. Qualis ista philosophia est, quae non interitum afferat pravitatis, sed sit contenta mediocritate vitiorum? Quid de Platone aut de Democrito loquar? Quis istud possit, inquit&nbsp;negare?</p>
              </div>
              <p className="italic text--gray mb1">Estne, quaeso, inquam, sitienti in bibendo voluptas? Duo Reges: constructio&nbsp;interrete.</p>
              <p className="bold">Josh Blenton, Product Manager at&nbsp;Blinkist</p>
            </div>
          </div>

        </div>


      </main>

      {/* Footer */}
      <footer className="pt1 pb3 align--center-on-mobile">
        <div className="container">
          <div className="grid-row">
            <div className="grid-column mt2 span-half">
              <div className="mb1">

              </div>
              <p className="small">Design by <a href="https://www.papayatemplates.com" className="link link--text">Papaya</a>. Illustrations from&nbsp;<a href="https://undraw.co/" className="link link--text">Undraw</a>.</p>
            </div>
            <div className="grid-column mt2 span-half align--right align--center-on-mobile">
              <ul className="no-bullets list--inline">
                <li className="mr1"><a href="" className="link"><YoutubeSvg /></a></li>
                <li className="mr1"><a href="" className="link"><TwitterSvg /></a></li>
                <li><a href="" className="link"><FacebookSvg /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage
