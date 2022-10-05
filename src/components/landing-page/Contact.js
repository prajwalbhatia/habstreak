import React, { useState } from 'react';

import { ReactComponent as Logo } from './img/Logo.svg';

//COMPONENTS
import { TextInputElement, InputElement } from "components/form-elements/form-elements";
import { PrimaryButton } from "components/button/button";

//UTILITIES
import { openInNewTab } from "utilities/index";

//Actions
import {
  sendMessage as sendSupportMessage,
} from "redux/actions/support";

//Redux
import { useDispatch } from "react-redux";

function Contact() {
  const dispatch = useDispatch();

  //STATES
  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState({ email: '' });
  const [successMsg, setSuccessMsg] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validation = (e) => {
    //EMAIL VALIDATION
    if (e.target.name === 'email') {
      if (!formData[e.target.name]) {
        setErrMsg({ ...errMsg, [e.target.name]: 'Email can\'t be empty' });
      }
      else if (typeof formData[e.target.name] !== "undefined") {
        let lastAtPos = formData[e.target.name].lastIndexOf("@");
        let lastDotPos = formData[e.target.name].lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            formData[e.target.name].indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            formData[e.target.name].length - lastDotPos > 2
          )
        ) {
          setErrMsg({ ...errMsg, [e.target.name]: 'Email is not valid' });
        }
        else {
          delete errMsg[[e.target.name]];
          setErrMsg({ ...errMsg });
          setSuccessMsg({ ...successMsg, [e.target.name]: 'Looks Great!' });
        }
      }
    }
  }

  const sendMessage = () => {
    if (Object.keys(formData).length === 2 && formData.email.length > 0 && formData.message.length > 0 && Object.keys(errMsg).length === 0) {
      dispatch(sendSupportMessage(formData));
      setTimeout(() => {
        setFormData({ email: "", message: "" });
        setErrMsg({ email: '' });
        setSuccessMsg({ email: 'Message sent' })
      }, 1000);

      setTimeout(() => {
        setSuccessMsg({ email: '' })
      }, 2000);
    }
  }

  return (
    <section id="contact" className='contact-section contact-background padding-global'>
      {/* <hr></hr>
            <div className='h-1'></div> */}
      <div className='container'>
        <div className='left-section'>
          <Logo />
          <p className='mt-20'>When you will rewards yourself on small small milestones than you will feel exciting and motivated to complete that task and you will not break the streak.</p>

          <div className='socials mt-30'>
            {/* <i className="demo-icon icon-facebook mr-20 contact-icon" /> */}
            <i onClick={() => openInNewTab('https://www.instagram.com/prajwal_bhatia')} className="demo-icon icon-instagram mr-20 contact-icon" />
            <i onClick={() => openInNewTab('https://twitter.com/bhatia_prajwal?t=m8OrMkj-hsks8OjwchvRqQ&s=09')}
              className="demo-icon icon-twitter contact-icon" />
          </div>
        </div>
        <div className='middle-section'>
          {/* <Footer /> */}
        </div>
        <div className='right-section'>
          <h4 className='write-ur-text'>Write us</h4>

          <TextInputElement
            placeholder={'Write message'}
            uid={'message'}
            onChange={handleChange}
            value={formData['message']}
            type={'text'}
            containerClass={'mt-20'}
          />


          <InputElement
            placeholder={'name@gmail.com'}
            uid={'email'}
            type="text"
            value={formData['email']}
            containerClass={'mt-20'}
            onBlur={validation}
            errMsg={errMsg['email']}
            successMsg={successMsg['email']}
            icon={<i className="demo-icon icon-email size-16-8f" />}
            onChange={handleChange}

          />

          <PrimaryButton
            name={'Send'}
            click={sendMessage}
            btnContainerClass="d-flex justify-end"
            btnClass='header-btn landing-login-btn send-btn mt-30'
          />
        </div>
      </div>
    </section>
  )
}

export default Contact;
