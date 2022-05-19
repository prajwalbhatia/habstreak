import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory, useLocation } from 'react-router-dom'

//COMPONENTS
import { InputElement } from "components/form-elements/form-elements";
import { PrimaryButton } from "components/button/button";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import {
  auth,
  signup,
  signin,
  emptyError,
  verifyemail
} from "redux/actions/user";

//CSS
import './account.css';
import "index.css";

//IMAGES
import { ReactComponent as Logo } from './img/Logo.svg';
import { ReactComponent as Signup } from './img/Signup.svg';
import { ReactComponent as Login } from './img/Login.svg';

//UTILITIES
import { dialogForError } from "utilities/index";

const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function Account(props) {
  //HOOKS
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const authData = useSelector((state) => state.user.authData);
  let error = useSelector((state) => state.user.error);
  //HOOKS

  //STATES
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [showPassword, setShowPassword] = useState(false);
  const [stage, setStage] = useState('login');
  const [formData, setFormData] = useState(initialState);
  const [errMsg, setErrMsg] = useState({ email: '' });
  const [successMsg, setSuccessMsg] = useState({});
  const [isValid, setIsValid] = useState(false);
  //STATES

  //USE EFFECTS
  useEffect(() => {
    if (error.length > 0) {
      dialogForError(error);
      dispatch(emptyError());
    }
  }, [dispatch, error])


  useEffect(() => {
    const token = user?.token;
    if (token && user.result.verified)
      history.push('/dashboard');
    else {
      if (!user?.result?.verified)
        setStage('login')
    }
  }, [history, user?.token])

  useEffect(() => {
    if (location?.state?.jumpTo === 'signup')
      setStage('signin')
    else if (location?.state?.jumpTo === 'login') {
      setStage('login');
    }
    // delete location.state.jumpTo
  }, [location])

  useEffect(() => {
    if (authData && stage === 'signin') {
      setStage('verify')
    }
    else if (authData && stage === 'login') {
      console.log('AUTH DATA', authData)
      if (authData?.result?.verified)
        history.push('/dashboard');
      else
        setStage('verify')
    }
  }, [authData, history]);

  useEffect(() => {
    if (stage)
      setIsValid(false);
    // else
    //   setIsValid(true);
  }, [stage]);


  useEffect(() => {
    if (!stage) {
      if (Object.keys(errMsg).length === 0 && formData['email'].length > 0 && formData['password'].length > 0)
        setIsValid(true);
    }
  }, [formData]);
  //USE EFFECTS

  //FUNCTIONS
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(auth({ result, token }));
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (res) => {
    console.log('GOOGLE FAILURE', res)
  }

  window.getProfile = (data) => {
    if (data) {
      const token = data?.idToken;
      const result = data?.user;

      try {
        dispatch(auth({ result, token }));
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Signining the user
    //and will send the user to verify email screen
    if (stage === 'signin') {
      dispatch(signup(formData, history))
    }
    //Logging the user if and only if user is verified
    //if not verified then will send to verify screen
    else if (stage === 'login') {
      dispatch(signin(formData, history))
    }
    //Verifying the user
    else if (stage === 'verify') {
      const otp = formData.otp1 + formData.otp2 + formData.otp3 + formData.otp4;
      if (otp.length === 4) {
        const dataObj = {
          otp,
          userId: authData?.result?._id
        }
        dispatch(verifyemail(dataObj, history))
      }
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const switchMode = () => {
    if (stage === 'login')
      setStage('signin')
    else if (stage === 'signin')
      setStage('login')

    setFormData(initialState);
    setErrMsg({});
    setSuccessMsg({});
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const validation = (e) => {
    //FULL NAME
    if (e.target.name === 'fullName') {
      if (!formData[e.target.name]) {
        setErrMsg({ ...errMsg, [e.target.name]: 'Name can\'t be empty' });
      }
      else if (formData[e.target.name].split(' ').length !== 2) {
        setErrMsg({ ...errMsg, [e.target.name]: 'Please enter first and last name' });
      }
      else {
        delete errMsg[[e.target.name]];
        setErrMsg({ ...errMsg });
        setSuccessMsg({ ...successMsg, [e.target.name]: 'Looks Great!' });
      }
    }

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
            formData[e.target.name].indexOf("@@") == -1 &&
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

    //PASSWORD VALIDATION
    if (e.target.name === 'password') {
      const regex = /(?=.*[A-Z])/;
      if (!formData[e.target.name]) {
        setErrMsg({ ...errMsg, [e.target.name]: 'Password can\'t be empty' });
      }
      else if (typeof formData[e.target.name] !== "undefined") {
        if (formData[e.target.name].length < 8) {
          setErrMsg({ ...errMsg, [e.target.name]: 'Atleast 8 character' });
        }
        else if (!formData[e.target.name].match(regex)) {
          setErrMsg({ ...errMsg, [e.target.name]: 'Atleast one uppercase letter' });
        }
        else {
          delete errMsg[[e.target.name]];
          setErrMsg({ ...errMsg })
          setSuccessMsg({ ...successMsg, [e.target.name]: 'Looks Great!' });
        }
      }
    }

    //CONFIRM PASSWORD
    if (e.target.name === 'confirmPassword') {
      if (formData[e.target.name] !== formData['password']) {
        setErrMsg({ ...errMsg, [e.target.name]: 'Password doesn\'t match' });
      }
      else {
        delete errMsg[[e.target.name]];
        setErrMsg({ ...errMsg })
        setSuccessMsg({ ...successMsg, [e.target.name]: 'Password Matched!' });

        if (Object.keys(errMsg).length === 0)
          setIsValid(true);
      }
    }

    //VALIDATION
    if (Object.keys(errMsg).length === 0)
      setIsValid(true);
    else
      setIsValid(false);

  }


  const mobileAppGoogleLogin = () => {
    const event = {
      event: 'google-login',
      data: {}
    }
    window.ReactNativeWebView.postMessage(JSON.stringify(event));
  }
  //FUNCTIONS

  const clientId = process.env.REACT_APP_CLIENT_ID;
  return (
    <div className="login-container">
      <div className='left-container padding-global'>
        <Logo />
        <p>A central hub where individual or teams can work, plan, and archive amazing things together.</p>
        <div className='center-items'>
          {
            stage === 'login'
              ?
              <Login />
              :
              <Signup />
          }
        </div>
      </div>
      <div className='right-container'>
        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-end'>
            <p className='size-16-8f'>ENG (USA)</p>
            <i className="demo-icon  icon-language size-16-8f" />
          </div>


          <p className='size-10-8f roboto-medium mt-35'>
            {stage === 'signin'
              ? 'START FOR FREE' :
              (stage === 'login' ?
                'ENJOY YOUR STREAK!'
                : 'Verify TO ENJOY!')}
          </p>

          <h1>{stage === 'signin'
            ? 'Sign up to Habstreak'
            :
            (
              stage === 'login'
                ?
                'Login to Habstreak'
                :
                'Verify your email'
            )
          }</h1>

          <p className='already-member'>
            {stage === 'signin'
              ?
              'Already a Member?' :
              (stage === 'login'
                ?
                'Are you a new member?'
                :
                'An OTP is send to your email'
              )}
            <span className='c-pointer' onClick={switchMode}>
              {stage === 'signin'
                ?
                'Login'
                :
                (stage === 'login' ? 'Sign up' : '')}</span>
          </p>


          {
            stage === 'signin' &&
            <InputElement
              placeholder={'Firstname Lastname'}
              uid={'fullName'}
              lable={'FULL NAME'}
              type="text"
              value={formData['fullName']}
              containerClass={'mt-25'}
              onChange={handleChange}
              onBlur={validation}
              errMsg={errMsg['fullName']}
              successMsg={successMsg['fullName']}
              icon={<i className="demo-icon icon-person size-16-8f" />}
            />
          }

          {
            (stage === 'signin' || stage === 'login')
            &&
            <>
              <InputElement
                placeholder={'name@gmail.com'}
                lable={'EMAIL'}
                uid={'email'}
                type="email"
                value={formData['email']}
                containerClass={'mt-25'}
                onChange={handleChange}
                onBlur={validation}
                errMsg={errMsg['email']}
                successMsg={successMsg['email']}
                icon={<i className="demo-icon icon-email size-16-8f" />}
              />

              <InputElement
                placeholder={'8 characters and 1 capital letter'}
                lable={'PASSWORD'}
                uid={'password'}
                type={showPassword ? "text" : "password"}
                containerClass={'mt-25'}
                value={formData['password']}
                onChange={handleChange}
                onBlur={stage ? validation : null}
                errMsg={stage ? errMsg['password'] : null}
                successMsg={stage ? successMsg['password'] : null}
                icon={<i
                  onClick={togglePassword}
                  className="demo-icon icon-lock size-16-8f c-pointer"
                />}
              />
            </>
          }


          {
            stage === 'signin'
            &&
            <InputElement
              placeholder={'8 characters and 1 capital letter'}
              lable={'CONFIRM PASSWORD'}
              uid={'confirmPassword'}
              value={formData['confirmPassword']}
              type={"password"}
              containerClass={'mt-25'}
              onChange={handleChange}
              onBlur={validation}
              errMsg={errMsg['confirmPassword']}
              successMsg={successMsg['confirmPassword']}
              icon={<i className="demo-icon icon-lock size-16-8f c-pointer" />}
            />
          }

          {
            stage === 'verify'
            &&
            <div style={{ display: 'flex' }}>
              <InputElement
                placeholder={'X'}
                // lable={'CONFIRM PASSWORD'}
                uid={'otp1'}
                value={formData['otp1']}
                type={"string"}
                onChange={handleChange}
                // onBlur={validation}
                // errMsg={errMsg['confirmPassword']}
                // successMsg={successMsg['confirmPassword']}
                containerClass='otp-box mt-25'
              />

              <InputElement
                placeholder={'X'}
                // lable={'CONFIRM PASSWORD'}
                uid={'otp2'}
                value={formData['otp2']}
                type={"string"}
                onChange={handleChange}
                // onBlur={validation}
                // errMsg={errMsg['confirmPassword']}
                // successMsg={successMsg['confirmPassword']}
                containerClass='otp-box mt-25'

              />

              <InputElement
                placeholder={'X'}
                // lable={'CONFIRM PASSWORD'}
                uid={'otp3'}
                value={formData['otp3']}
                type={"string"}
                onChange={handleChange}
                // onBlur={validation}
                // errMsg={errMsg['confirmPassword']}
                // successMsg={successMsg['confirmPassword']}
                containerClass='otp-box mt-25'

              />

              <InputElement
                placeholder={'X'}
                // lable={'CONFIRM PASSWORD'}
                uid={'otp4'}
                value={formData['otp4']}
                type={"string"}
                onChange={handleChange}
                // onBlur={validation}
                // errMsg={errMsg['confirmPassword']}
                // successMsg={successMsg['confirmPassword']}
                containerClass='otp-box mt-25'

              />

            </div>
          }


          <PrimaryButton
            name={stage === 'signin' ? 'CREATE ACCOUNT' : (stage === 'login' ? 'LOGIN' : 'VERIFY')}
            click={() => { }}
            btnContainerClass="mt-30"
            btnClass={(isValid || stage === 'verify') ? 'create-account-btn' : 'create-account-btn in-valid'}
            type="submit"
            disabled={(isValid || stage === 'verify') ? false : true}
          />


          {
            (stage === 'signin' || stage === 'login')
            &&
            <>
              <p className='size-10-8f mt-35'>{stage ? 'Or Signup With' : 'Or Login With'}</p>

              <div className='socials'>
                <div onClick={mobileAppGoogleLogin} className='icon-container'>
                  <i className="demo-icon  icon-google" />
                </div>

                {!window.ReactNativeWebView
                  &&
                  <GoogleLogin
                    clientId={clientId}
                    buttonText=""
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                    className='google-btn'
                  />}
              </div>
            </>
          }




          <p className='t-and-c'>By creating an account means you're okay with
            <span
              onClick={() => {
                history.push('/terms-and-condition')
              }}
            >Terms &amp; Condition</span> and <span
              onClick={() => {
                history.push('/privacy-policy')
              }}>Privacy Policy</span>
          </p>

        </form>
      </div>

    </div>
  );
}

export default Account;