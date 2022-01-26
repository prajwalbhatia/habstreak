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
import { getRecentActivitiesData } from "../../redux/actions/recentActivities";

//Icons
import { GrRefresh } from "react-icons/gr";

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
  const activities = useSelector((state) => state.recentActivities.activities);

  const loading = useSelector((state) => state.streak.loading);

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      dispatch(getStreaksData());
      dispatch(getRecentActivitiesData());
    }
  }, [])

  useEffect(() => {
    const running = streaks.filter((streak) => {
      if (moment(moment(streak.date).format('YYYY-MM-DD')).isSameOrBefore(moment(Date.now()).format('YYYY-MM-DD'))) {
        return streak;
      }
    });

    setTaskCount(running.length);
  }, [streaks]);

  /**
   * 
   * @param {String} type - type of activity (create-streak , delete-streak etc)
   * @param {String} title - title of the action
   * @returns 
   */
  const activityTitle = (type, title) => {
    switch (type) {
      case 'create-streak':
        return `A new streak named as ${title} is created`;
      case 'delete-streak':
        return `A streak named as ${title} is deleted`;
      case 'create-reward':
        return `A new reward named as ${title} is created`;
      case 'delete-reward':
        return `A new reward named as ${title} is deleted`;
      case 'reward-earned':
        return `A reward named as ${title} is earned`;
      default:
        return 'No type is found'
    }
  }

  const refreshClicked = () => {
    dispatch(getRecentActivitiesData());
  }

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
                          <Card key={streak._id} withLine={true} cardClass="streak-card">
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
              <div className="header-container pad-global">
                <div className='d-flex'>
                  <h4>Activities</h4>
                  <div className='c-pointer' onClick={() => { refreshClicked() }}>
                    <GrRefresh />
                  </div>
                </div>
                <PrimaryButton
                  name={'View all'}
                  click={() => {
                    history.push({
                      pathname: `/recent-activities`,
                    });
                  }}
                />
              </div>

              <div className="pad-global">
                <Card cardClass="activities-card">
                  {
                    activities && activities.map((activity, index) => {
                      if (index <= 4) {
                        return (
                          <div key={activity._id} className="list-items">
                            <div className="empty-circle"></div>
                            <div className="date-and-time"><span>{moment(activity?.date).format('LLLL')}</span></div>
                            <div className="activity"><span>{activityTitle(activity.type, activity.title)}</span></div>
                          </div>
                        )
                      }
                    })
                  }
                </Card>
              </div>
            </div>
          </>
      }
    </Frame>
  );
}

export default Dashboard;