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

//CSS
import './profile.css';
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, isSameOrBefore, activityTitle, progressFun, isSame, isBefore } from 'utilities';

//CONSTANTS
import { icons, theme } from "constants/index";

function Profile(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log('🚀 ~ file: profile.jsx ~ line 38 ~ Profile ~ user', user);

  //Getting the data from the state

  // const loading = useSelector((state) => state.streak.loading);
  const loading = false;


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

                  <div className='flex-dir-col flex-auto plan-container mt-20'>
                    <div className='plan-details'>
                      <div className='plan-type'>
                        <div></div>
                        <div>
                          <h2 className='jos-primary'>Prime</h2>
                          <span className='rob-bold-12-primary'>$</span><span className='jos-primary' style={{ fontSize: '36px' }}>49</span><span className='rob-reg-12-primary'>/PER MONTH</span>
                        </div>
                      </div>

                      <div className='mt-20 plan-info d-flex '>
                        <span className='rob-reg-10-black'>ETIAM CURABITUR MAURIS</span>
                        <span className='rob-reg-10-black'>UNLIMITED</span>
                      </div>

                      <div className='mt-20 plan-info d-flex '>
                        <span className='rob-reg-10-black'>ETIAM CURABITUR MAURIS</span>
                        <span className='rob-reg-10-black'>UNLIMITED</span>
                      </div>

                      <div className='mt-20 plan-info d-flex '>
                        <span className='rob-reg-10-black'>ETIAM CURABITUR MAURIS</span>
                        <span className='rob-reg-10-black'>UNLIMITED</span>
                      </div>

                      <div className='mt-20 plan-info d-flex '>
                        <span className='rob-reg-10-black'>ETIAM CURABITUR MAURIS</span>
                        <span className='rob-reg-10-black'>UNLIMITED</span>
                      </div>

                      <div className='mt-20 plan-info d-flex '>
                        <span className='rob-reg-10-black'>ETIAM CURABITUR MAURIS</span>
                        <span className='rob-reg-10-black'>UNLIMITED</span>
                      </div>
                    </div>
                  </div>

                  <div className='d-flex plan-btn-container center-items'>
                    <OutlinedPrimaryButton
                      name='Change Plan'
                      // click={}
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