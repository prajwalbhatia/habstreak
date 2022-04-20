import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//COMPONENTS
import Frame from "components/frame/frame";
import { OutlinedPrimaryButton, SecondaryButton } from "components/button/button";
import { dialogForCreateAndUpdateStreak, perPerDay } from "utilities";

//Actions
import { getStreaksData } from "redux/actions/streak";
import { getRewardsData } from "redux/actions/reward";
import { getRecentActivitiesData } from "redux/actions/recentActivities";
import { updateuser, createPaymentRequest } from "redux/actions/user";


//CSS
import './profile.css';
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, isSameOrBefore, activityTitle, progressFun, isSame, isBefore, planDetail } from 'utilities';

//CONSTANTS
import { icons, theme } from "constants/index";
import { size } from 'lodash';

function Profile(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const authData = useSelector((state) => state.user.authData);
  const { paymentData } = useSelector((state) => state.user);
  console.log('🚀 ~ file: profile.jsx ~ line 41 ~ Profile ~ paymentData', paymentData);

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [planType, setPlanType] = useState("");
  console.log('🚀 ~ file: profile.jsx ~ line 45 ~ Profile ~ planType', planType);


  //Getting the data from the state

  const loading = useSelector((state) => state.streak.loading);
  // const loading = false;

  useEffect(() => {
    if (authData)
      setPlanType(planDetail());
  }, [authData]);


  useEffect(() => {
    if (size(paymentData) > 0) {
      var options = {
        "key": process.env.REACT_APP_RAZORPAY_KEY,
        "amount": paymentData.amount,
        "currency": paymentData.currency,
        "name": "Habstreak",
        "description": "",
        "image": process.env.REACT_APP_ENV === 'development' ? "http://localhost:5000/logo.svg" : 'https://habstreak.herokuapp.com/logo.svg',
        "order_id": paymentData.id,
        "handler": function (response) {
          console.log('🚀 ~ file: profile.jsx ~ line 68 ~ useEffect ~ response', response);
          dispatch(updateuser(
            {
              planType: 'prime',
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id
            }
            , authData.result.email))

          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
        },
        // "prefill": {
        //   "name": "Gaurav Kumar",
        //   "email": "gaurav.kumar@example.com",
        //   "contact": "9999999999"
        // },
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

    // let data;

    // if (process.env.REACT_APP_ENV === 'development')
    // {
    //   data = await fetch(
    //     'http://localhost:5000/razorpay',
    //     { method: 'POST' })
    //     .then(res => res.json());
    // }
    // else
    // {
    //   data = await fetch(
    //     'https://habstreak.com/razorpay',
    //     { method: 'POST' })
    //     .then(res => res.json());
    // }


    // paymentObject.on('payment.failed', function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });
    // document.getElementById('rzp-button1').onclick = function (e) {
    //   rzp1.open();
    //   e.preventDefault();
    // }
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
                      {/* su<span className='rob-reg-12-primary'>Verified</span> */}
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

                          <div className='mt-20 plan-info d-flex '>
                            <span className='rob-reg-14-black'>Recent Activities</span>
                            <span className='rob-reg-14-black'>No</span>
                          </div>

                        </div>
                      </div>
                      :
                      <div className='flex-dir-col flex-auto plan-container mt-20'>
                        <div className='plan-details'>
                          <div className='plan-type'>
                            <div></div>
                            <div>
                              <h2 className='jos-primary'>Prime</h2>
                              <span className='rob-bold-12-black'>Rs</span><span className='foont-jos size-36 ml-5'>90</span><span className='rob-reg-14-black'>.00 / PER MONTH</span>
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

                  {
                    planType === 'free' &&
                    <div className='d-flex plan-btn-container center-items'>
                      <OutlinedPrimaryButton
                        name='Change Plan'
                        click={displayRazorpay}
                        btnContainerClass="change-plan-btn"
                        btnClass='h-40'
                      />
                    </div>
                  }
                </div>
              </div>
            </>
        }
      </ErrorBoundary>
    </Frame>
  );
}

export default Profile;