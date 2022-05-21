import React from 'react';

//CSS
import "../../index.css";
import './policies.css';


//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';


function PrivacyPolicy() {
  return (
    <div className='policy-main-container padding-global'>
      {/* Header */}
      <div className='global-background hero-background'>
        <header className="landing-page-header d-flex">
          {/* LOGO */}
          <div className='logo-container'>
            <Logo />
          </div>

          {/* Navigation */}
          <div id="home" className='main-navigation'>
            {/* <nav className='landing-navigation'>
              <ol
                className='d-flex'
                onClick={handleLinkClick}
              >
                <li className={selectedNav === 'home' ? 'list-active' : ''} data-value='home'>Home</li>
                <li className={selectedNav === 'feature' ? 'list-active' : ''} data-value='feature'>Feature</li>
                <li className={selectedNav === 'guide' ? 'list-active' : ''} data-value='guide'>Guide</li>
                <li className={selectedNav === 'contact' ? 'list-active' : ''} data-value='contact'>Contact</li>
              </ol>
            </nav> */}
          </div>

          {/* BUTTONS CONTAINER */}
          {/* <div className='buttons-container'>
            <PrimaryButton
              name={'Login'}
              click={() => { jumpToAccount('login') }}
              btnContainerClass="ml-10"
              btnClass='header-btn landing-login-btn'
            />

            <PrimaryButton
              name={'Get Started'}
              click={() => { jumpToAccount('signup') }}
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
              <ol
                className='d-flex flex-dir-col'
                onClick={handleLinkClick}
              >
                <li data-value='home'>Home</li>
                <li data-value='feature'>Feature</li>
                <li data-value='guide'>Guide</li>
                <li data-value='contact'>Contact</li>
              </ol>

              <span className='rob-med-10-grey'>Made with
                <IconContext.Provider value={{ className: 'heart-icon' }}> <AiFillHeart /> </IconContext.Provider>by PRAJWAL BHATIA</span>
            </div>}
          </div> */}
        </header>
      </div>

      <div className='policy-container'>
        <h1>Privacy Policy</h1> 
        <p className='mt-10'>
          Prajwal Bhatia built the Habstreak app as
          a Commercial app. This SERVICE is provided by
          Prajwal Bhatia  and is intended for use as
          is.
        </p> 
        <p className='mt-10'>
          This page is used to inform visitors regarding my
          policies with the collection, use, and disclosure of Personal
          Information if anyone decided to use my Service.
        </p> 
        <p className='mt-10'>
          If you choose to use my Service, then you agree to
          the collection and use of information in relation to this
          policy. The Personal Information that I collect is
          used for providing and improving the Service. I will not use or share your information with
          anyone except as described in this Privacy Policy.
        </p>
        <p className='mt-10'>
          The terms used in this Privacy Policy have the same meanings
          as in our Terms and Conditions, which are accessible at
          Habstreak unless otherwise defined in this Privacy Policy.
        </p> 
        <p className='mt-10'>
          <h1 className="mt-10">Information Collection and Use</h1></p> 
          <p className='mt-10'>
          For a better experience, while using our Service, I
          may require you to provide us with certain personally
          identifiable information, including but not limited to email,name. The information that
          I request will be retained on your device and is not collected by me in any way.
        </p> 
       
        <p className='mt-10'><h1 className="mt-10">Cookies</h1></p> 
        <p className='mt-10'>
          Cookies are files with a small amount of data that are
          commonly used as anonymous unique identifiers. These are sent
          to your browser from the websites that you visit and are
          stored on your device's internal memory.
        </p> 
        <p className='mt-10'>
          This Service does not use these “cookies” explicitly. However,
          the app may use third-party code and libraries that use
          “cookies” to collect information and improve their services.
          You have the option to either accept or refuse these cookies
          and know when a cookie is being sent to your device. If you
          choose to refuse our cookies, you may not be able to use some
          portions of this Service.
        </p> 
        <p className='mt-10'><h1 className="mt-10">Service Providers</h1></p> 
        <p className='mt-10'>
          I may employ third-party companies and
          individuals due to the following reasons:
        </p> 
        <ul className='mt-10'>
          <li className='mt-10'>To facilitate our Service;</li> 
          <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> 
        <p className='mt-10'>
          I want to inform users of this Service
          that these third parties have access to their Personal
          Information. The reason is to perform the tasks assigned to
          them on our behalf. However, they are obligated not to
          disclose or use the information for any other purpose.
        </p> 
        <p className='mt-10'><h1 className="mt-10">Security</h1></p> 
        <p className='mt-10'>
          I value your trust in providing us your
          Personal Information, thus we are striving to use commercially
          acceptable means of protecting it. But remember that no method
          of transmission over the internet, or method of electronic
          storage is 100% secure and reliable, and I cannot
          guarantee its absolute security.
        </p> 
        <p className='mt-10'><h1 className="mt-10">Links to Other Sites</h1></p> 
        <p className='mt-10'>
          This Service may contain links to other sites. If you click on
          a third-party link, you will be directed to that site. Note
          that these external sites are not operated by me.
          Therefore, I h1ly advise you to review the
          Privacy Policy of these websites. I have
          no control over and assume no responsibility for the content,
          privacy policies, or practices of any third-party sites or
          services.
        </p> 
        <p className='mt-10'><h1 className="mt-10">Children’s Privacy</h1></p> 
        <div className='mt-10'>
          <p>
          I do not knowingly collect personally
          identifiable information from children. I
          encourage all children to never submit any personally
          identifiable information through
          the Application and/or Services.
          I encourage parents and legal guardians to monitor
          their children's Internet usage and to help enforce this Policy by instructing
          their children never to provide personally identifiable information through the Application and/or Services without their permission. If you have reason to believe that a child
          has provided personally identifiable information to us through the Application and/or Services,
          please contact us. You must also be at least 16 years of age to consent to the processing
          of your personally identifiable information in your country (in some countries we may allow your parent
          or guardian to do so on your behalf).
        </p>
        </div> 
        <p className='mt-10'><h1 className="mt-10">Changes to This Privacy Policy</h1></p>
        <p className='mt-10'>
          I may update our Privacy Policy from
          time to time. Thus, you are advised to review this page
          periodically for any changes. I will
          notify you of any changes by posting the new Privacy Policy on
          this page.
        </p> 
        <p className='mt-10'>This policy is effective as of 2022-04-17</p> 
        <p className='mt-10'><h1 className="mt-10">Contact Us</h1></p> 
        <p className='mt-10'>
          If you have any questions or suggestions about my
          Privacy Policy, do not hesitate to contact me at prajwal6bhatia@gmail.com.
        </p> 
        <p className='mt-10'>This privacy policy page was created at <a href="https://privacypolicytemplate.net" target="_blank" rel="noopener noreferrer">privacypolicytemplate.net </a>and modified/generated by <a href="https://app-privacy-policy-generator.nisrulz.com/" target="_blank" rel="noopener noreferrer">App Privacy Policy Generator</a></p>
      </div>
    </div>
  )
}

export default PrivacyPolicy