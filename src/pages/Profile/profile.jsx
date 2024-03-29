import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";

//COMPONENTS
import Frame from "components/frame/frame";
import { OutlinedPrimaryButton, SecondaryButton } from "components/button/button";

//Actions
import { updateuser, createPaymentRequest, emptyPaymentData, getUserData } from "redux/actions/user";

//CSS
import './profile.css';
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, planDetail } from 'utilities';

//CONSTANTS
import size from 'lodash/size';
import { urls } from "constants/index";

function Profile(props) {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.user.authData);
  console.log('🚀 ~ file: profile.jsx ~ line 32 ~ Profile ~ authData', authData);
  const { paymentData } = useSelector((state) => state.user);

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [planType, setPlanType] = useState("");


  //Getting the data from the state

  const loading = useSelector((state) => state.streak.loading);
  // const loading = false;

  useEffect(() => {
    if (authData) {
      setPlanType(planDetail());
    }
  }, [authData]);


  useEffect(() => {
    dispatch(getUserData(authData.result.email))
  }, [])


  useEffect(() => {
    if (size(paymentData) > 0) {
      var options = {
        "key": process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_RAZORPAY_KEY : process.env.REACT_APP_RAZORPAY_KEY_PROD,
        "amount": paymentData.amount,
        "currency": paymentData.currency,
        "name": "Habstreak",
        "description": "",
        "image": process.env.REACT_APP_ENV === 'development' ? `${urls.dev}logo.svg` : `${urls.prod}logo.svg`,
        "order_id": paymentData.id,
        "handler": function (response) {
          let startTime = "";
          let endTime = "";

          if (authData?.result?.startTime && authData?.result?.endTime) {
            startTime = authData?.result?.startTime;
            endTime = moment(authData?.result?.endTime).add(31, 'days').endOf('day').format();
          }
          else {
            startTime = moment().startOf('day').format();
            endTime = moment().add(31, 'days').endOf('day').format();
          }


          dispatch(updateuser(
            {
              planType: 'prime',
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              startTime,
              endTime
            }
            , authData))


          localStorage.removeItem('planUpgradeModal')
          dispatch(emptyPaymentData())

        },
      };
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    }
  }, [paymentData])


  const loadScript = (src) => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      }
      script.onError = () => {
        resolve(false);
      }

      document.body.appendChild(script);

    })
  }

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load');
    }

    dispatch(createPaymentRequest());
  }



  return (
    <Frame
      withHeader={true}
      withDate={true}
      headerTitle={'Profile'}
      withSearchBox={false}
      containerClass="profile"
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        {
          loading
            ?
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
            :
            <>
              <div className='d-flex profile-inner-container'>
                <div className='flex-dir-col flex-1 left-container'>
                  <h3 className='jos-18-primary'>Edit Profile</h3>
                  <div className='d-flex flex-1 pic-container'>
                    <div className=''>
                      <div
                        className='picture-box d-flex center-items'
                        style={{
                          backgroundImage: `url(${user?.result?.imageUrl})`
                        }}
                      >
                        {!user?.result?.imageUrl && <span>{user?.result?.name[0]}</span>}
                      </div>
                      {false && <span className='d-flex mt-20 rob-reg-14-grey'>Recommend size is 256x256px</span>}
                    </div>
                    {false && <div className='flex-1 flex-dir-col btns-container'>
                      <OutlinedPrimaryButton
                        name='Change Photo'
                        // click={}
                        btnContainerClass=""
                        btnClass='h-40'
                      />

                      <SecondaryButton
                        name={'Delete Photo'}
                        // click={() => handleClick('secondary')}
                        btnContainerClass="mt-20"
                        btnClass={'secondary-btn'}
                      />
                    </div>}
                  </div>

                  <div className='flex-auto flex-dir-col info-container mt-30'>
                    <div className='mt-20'>
                      <span className='rob-reg-12-grey mr-10'>Name:</span><span className='rob-reg-12-black'>{user?.result?.name}</span>
                    </div>

                    {false && <div className='mt-20'>
                      <span className='rob-reg-12-grey mr-10'>DOB:</span><span className='rob-reg-12-black'>01.02.1998</span>
                    </div>}

                    <div className='mt-20'>
                      <span className='rob-reg-12-grey mr-10'>Email:</span><span className='rob-reg-12-black mr-10'>{user?.result?.email}</span>
                      {user?.result?.verified && <span className='rob-reg-12-primary'>Verified</span>}
                    </div>

                  </div>

                  <div className='edit-btn-container'>
                    {false && <OutlinedPrimaryButton
                      name='EDIT'
                      // click={}
                      btnContainerClass=""
                      btnClass='h-40'
                    />}
                  </div>
                </div>
                <div className='flex-dir-col flex-1 right-container'>
                  <h3 className='jos-18-primary'>Current Plan</h3>

                  {
                    planType === "free"
                      ?
                      <div className='flex-dir-col flex-auto plan-container mt-20'>
                        <div className='plan-details'>
                          <div className='plan-type'>
                            <div>
                              <h2 className='jos-primary'>INTRO</h2>
                              <span className='jos-primary size-36'>FREE</span>
                            </div>
                          </div>

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

                          <div className='mt-20 plan-info d-flex mb-20'>
                            <span className='rob-reg-14-black'>Recent Activities</span>
                            <span className='rob-reg-14-black'>No</span>
                          </div>

                        </div>
                      </div>
                      :
                      <div className='flex-dir-col flex-auto plan-container mt-20'>
                        <div className='plan-details'>
                          <div className='plan-type'>
                            <div>
                              <h2 className='jos-primary'>Prime</h2>
                              <div>
                                <h3 className='rob-bold-12-primary'>
                                  {
                                    moment(authData?.result?.endTime).diff(moment(moment().format()), 'days') === 0
                                      ?
                                      'Expires today'
                                      :
                                      `Expires in ${moment(authData?.result?.endTime).diff(moment(moment().format()), 'days')} days`
                                  }
                                </h3></div>
                              <span className='rob-bold-12-black'>Rs</span><span className='foont-jos size-36 ml-5'>45</span><span className='rob-reg-14-black'>.00 / PER MONTH</span>
                              {/* <span className='jos-primary size-36'>FREE</span> */}

                            </div>
                          </div>

                          <div className='mt-20 plan-info d-flex '>
                            <span className='rob-reg-14-black'>No of streaks</span>
                            <span className='rob-reg-14-black'>Unimited</span>
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
                      </div>
                  }

                  <div className='d-flex plan-btn-container center-items'>
                    <OutlinedPrimaryButton
                      name={planType === 'free' ? 'Change Plan' : 'Renew Plan'}
                      click={displayRazorpay}
                      btnContainerClass="change-plan-btn"
                      btnClass='h-40'
                    />
                  </div>

                </div>
              </div>
            </>
        }
      </ErrorBoundary>
    </Frame>
  );
}

export default Profile;