import React from 'react';

import { useDispatch, useSelector  } from "react-redux";

//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";
import {PrimaryButton} from "../../components/button/button";

//CSS
import './dashboard.css';
import "../../index.css";

function Dashboard(props) {
   const user = useSelector((state) => state.user.user);
  console.log('🚀 ~ file: login.jsx ~ line 16 ~ Dashboard ~ user', user);
  return (
    <Frame
      withHeader={true}
      headerTitle={'DASHBOARD'}
      withSearchBox={false}
      containerClass="dashboard"
    >
        {/* Notification Card */}
        <div className="pad-global">
            <Card cardClass="notification-card">
              <h2>Welcom back, Prajwal Bhatia!</h2>
              <h4 className="mt-1">You have 10 task to complete today</h4>
              <PrimaryButton
                name={'Check now'}
                btnContainerClass={'mt-1'}
              />
            </Card>
          </div>

          {/* Progress streak */}
          <div className="progress-streak-container pad-global">
              <div className="header-container pad-global">
                <h4>Streak in Progress</h4>
                <PrimaryButton
                  name={'View all'}
                />
            </div>

            <div className="streak-list pad-global">
              <Card withLine={true} cardClass="streak-card">
                <h4>100 days of Javascript</h4>
                <p className="mt-1">The motive of this streak is to keep learning JS with consistency....</p>
                <PrimaryButton
                  name={'Check now'}
                  btnContainerClass={'mt-1'}
                />
              </Card>

              <Card withLine={true} cardClass="streak-card">
                <h4>100 days of Javascript</h4>
                <p className="mt-1">The motive of this streak is to keep learning JS with consistency....</p>
                <PrimaryButton
                  name={'Check now'}
                  btnContainerClass={'mt-1'}
                />
              </Card>
            </div>
          </div>

          {/* Activities */}
          <div className="activities-container pad-global">
              <diV className="header-container pad-global">
                <h4>Activities</h4>
              
            </diV>

            <div className="pad-global">
              <Card cardClass="activities-card">
                <div className="list-items">
                  <div className="empty-circle"></div>
                  <div className="date-and-time"><span>11 July,2021- </span><span>8 : 00 PM </span></div>
                  <div className="activity"><span>Completed promises</span></div>
                </div>

                <div className="list-items">
                  <div className="empty-circle"></div>
                  <div className="date-and-time"><span>11 July,2021- </span><span>8 : 00 PM </span></div>
                  <div className="activity"><span>Completed promises</span></div>
                </div>

                <div className="list-items">
                  <div className="empty-circle"></div>
                  <div className="date-and-time"><span>11 July,2021- </span><span>8 : 00 PM </span></div>
                  <div className="activity"><span>Completed promises</span></div>
                </div>
              </Card>
            </div>
          </div>
    </Frame>
  );
}

export default Dashboard;