import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";
import { PrimaryButton } from "../../components/button/button";

//Actions
import { getStreaksData } from "../../redux/actions/streak";

//CSS
import './dashboard.css';
import "../../index.css";

function Dashboard(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [taskCount, setTaskCount] = useState(0);

  //Getting the data from the state
  const streaks = useSelector((state) => state.streak.streaks);

  const loading = useSelector((state) => state.streak.loading);

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      dispatch(getStreaksData());
    }
  }, [localStorage.getItem('profile')])

  useEffect(() => {
    const running = streaks.filter((streak) => {
      if (moment(moment(streak.date).format('YYYY-MM-DD')).isSameOrBefore(moment(Date.now()).format('YYYY-MM-DD'))) {
        return streak;
      }
    });

    setTaskCount(running.length);
  }, [streaks]);


  return (
    <Frame
      withHeader={true}
      headerTitle={'DASHBOARD'}
      withSearchBox={false}
      containerClass="dashboard"
    >
      {
        loading
          ?
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
          :
          <>
            {/* Notification Card */}
            <div className="pad-global">
              <Card cardClass="notification-card">
                <h2>Welcome, {user?.result?.name}!</h2>
                <h4 className="mt-1">You have {taskCount} task to complete today</h4>
                <PrimaryButton
                  name={'Check now'}
                  btnContainerClass={'mt-1'}
                  click={() => { history.push('/streak-list') }}
                />
              </Card>
            </div>

            {/* Progress streak */}
            <div className="progress-streak-container pad-global">
              <div className="header-container pad-global">
                <h4>Streak in Progress</h4>
                <PrimaryButton
                  name={'View all'}
                  click={() => {
                    history.push({
                      pathname: `/streak-list`,
                    });
                  }}
                />
              </div>

              <div className="streak-list pad-global">
                {
                  streaks.length > 0
                    ?
                    streaks.length > 0 && streaks.map((streak, index) => {
                      if (index <= 3 && moment(moment(streak.date).format('YYYY-MM-DD')).isSameOrBefore(moment(Date.now()).format('YYYY-MM-DD'))) {
                        return (
                          <Card withLine={true} cardClass="streak-card">
                            <h4>{streak.title}</h4>
                            <p className="mt-1">{streak.description}</p>
                            <PrimaryButton
                              name={'Check now'}
                              btnContainerClass={'mt-1'}
                              click={() => {
                                history.push({
                                  pathname: `/streak-list/${streak._id}`,
                                  state: { streakName: streak.title },
                                });
                              }}
                            />
                          </Card>
                        )
                      }
                    })
                    :
                    <div className="empty-container">
                      <p>No Streaks available</p>
                    </div>
                }


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
          </>
      }


    </Frame>
  );
}

export default Dashboard;