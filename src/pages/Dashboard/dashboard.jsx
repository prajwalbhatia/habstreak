import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";
import { groupBy as _groupBy, size as _size, map as _map } from "lodash";

//COMPONENTS
import Frame from "components/frame/frame";
import { OutlinedPrimaryButton } from "components/button/button";
import { dialogForCreateAndUpdateStreak, perPerDay } from "utilities";

//Actions
import { getStreaksData } from "redux/actions/streak";
import { getRewardsData } from "redux/actions/reward";
import { getRecentActivitiesData } from "redux/actions/recentActivities";

//CSS
import './dashboard.css';
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, isSameOrBefore, activityTitle, progressFun, isSame, isBefore } from 'utilities';

//CONSTANTS
import { icons, theme } from "constants/index";

function Dashboard(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [taskCount, setTaskCount] = useState(0);
  const [groupedActivities, setGroupedActivities] = useState({});
  const [percentageData, setPercentageData] = useState({
    streakSuccess: 0,
    rewardCollected: 0,
    streakUnsuccessful: 0
  });

  //Getting the data from the state
  const streaks = useSelector((state) => state.streak.streaks);
  const rewards = useSelector((state) => state.reward.rewards);
  const activities = useSelector((state) => state.recentActivities.activities);

  const loading = useSelector((state) => state.streak.loading);

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      dispatch(getStreaksData());
      dispatch(getRecentActivitiesData());
      dispatch(getRewardsData());
    }
  }, [dispatch])

  useEffect(() => {
    const currentDate = moment().format();
    const finished = streaks.filter((streak) => {
      const streakEndDate = moment(streak.dateTo).format();
      if (isBefore(streakEndDate, currentDate) && !streak.tag) {
        return streak;
      }
      else
        return null;
    });

    const running = streaks.filter((streak) => {
      if (isSameOrBefore(streak.dateFrom, Date().now)) {
        return streak;
      }
      else
        return null;
    });

    const earned = rewards.filter(reward => reward.rewardEarned);
    const unfinishedStreak = streaks.filter((streak) => streak.tag === 'unfinished');

    const totalStreak = [...streaks].length;
    const totalRewards = [...rewards].length;
    let successfulStreak = 0;
    let rewardsCollected = 0;
    let streakUnsuccessful = 0;
    let successfulStreakPerc = 0;
    let rewardsCollectedPerc = 0;
    let streakUnsuccessfulPerc = 0;


    successfulStreak = finished.length;
    rewardsCollected = earned.length;
    streakUnsuccessful = unfinishedStreak.length;

    successfulStreakPerc = totalStreak > 0 ? ((successfulStreak / totalStreak) * 100).toFixed(2) : 0;
    rewardsCollectedPerc = totalRewards > 0 ? ((rewardsCollected / totalRewards) * 100).toFixed(2) : 0;
    streakUnsuccessfulPerc = totalStreak > 0 ? ((streakUnsuccessful / totalStreak) * 100).toFixed(2) : 0;

    setPercentageData({
      streakSuccess: successfulStreakPerc,
      streakCompleted: successfulStreak,
      rewardsCollectedPerc: rewardsCollectedPerc,
      rewardsCollected,
      streakUnsuccessfulPerc,
      streakUnsuccessful
    })

    setTaskCount(running.length);
  }, [streaks, rewards]);


  useEffect(() => {
    let activitiesClone = [...activities];
    const modifiedActivities = activitiesClone.map((activity) => {
      const dateFromApi = activity.date;
      const modifiedDate = moment(dateFromApi).format('ll');
      const modifiedTime = moment(dateFromApi).format('LT')
      delete activity.date;
      activity.date = modifiedDate;
      activity.time = modifiedTime;
      return activity;
    })
    const groupedByDate = _groupBy(modifiedActivities, 'date');
    console.log('🚀 ~ file: dashboard.jsx ~ line 127 ~ useEffect ~ groupedByDate', groupedByDate);
    const currentDate = moment(moment().format()).format('ll');
    console.log('🚀 ~ file: dashboard.jsx ~ line 129 ~ useEffect ~ currentDate', currentDate);
    if (groupedActivities[currentDate])
      setGroupedActivities({ [currentDate]: groupedByDate[currentDate] });
    else
      setGroupedActivities({})
  }, [activities, streaks]);


  const streakCardJsx = () => {
    if (streaks.length > 0) {
      const filterSttreaks = streaks.filter((streak, index) => {
        if (index <= 3 && isSameOrBefore(streak.dateFrom, Date().now))
          return streak
      })
      return (
        filterSttreaks.map((streak, index) => {
          const { dateFrom, dateTo, days, _id } = streak;
          const todayDate = moment(new Date());
          const percPerDay = perPerDay(dateFrom, dateTo);
          const daysDone = todayDate.diff(dateFrom, 'days');
          const progress = percPerDay * daysDone;
          return (
            <div
              key={_id} className='flex-dir-col streak-card'
              onClick={() => {
                history.push({
                  pathname: `/streak-list/${_id}`,
                  state: {
                    from: 'Dashboard',
                  },

                })
              }}
            >
              <div
                className='center-items card-icon'
                style={{ background: theme[index] }}
              >
                <i className={`demo-icon ${icons[index]}`} />
              </div>
              <h4>{streak.title}</h4>
              <h6 className='mt-10'>Running</h6>
              <h1 style={{ color: theme[index] }} >{`${progress}%`}</h1>
              <span>{`${streak.days} day to go`}</span>
              <div
                className='d-flex go-btn'
                style={{ background: theme[index] }}
              >
                <i className="demo-icon icon-going-in" />
              </div>
            </div>
          )
        })
      )
    }
    else
      return (
        <h2>No Streaks</h2>
      )
  }

  const recentActivityCardJsx = () => {
    const isEmpty = _size(groupedActivities) === 0;
    console.log('🚀 ~ file: dashboard.jsx ~ line 190 ~ recentActivityCardJsx ~ groupedActivities', groupedActivities);
    if (!isEmpty) {
      return (
        _map(groupedActivities, (value, key) => {
          return (
            <div key={value._id} className='date-data'>
              <span className='date-content'>{key}</span>
              {
                _map(value, (val) => {
                  return (
                    <div className='info-container'>
                      <h3 className='time'>{val.time}</h3>
                      <div
                        className='hr-line'
                        style={{ background: theme[Math.ceil(Math.random() * 10)] }}
                      ></div>
                      <div className='flex-dir-col action-info'>
                        <span className='name'>{val.title}</span>
                        <span className='action'>{`Action: ${activityTitle(val.type, '', 'dashboard')}`}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      );
    }
    else {
      return (
        <div className='d-flex center-items h-100'>
          <h3>No Latest data</h3>
        </div>
      )
    }
  }

  return (
    <Frame
      withHeader={true}
      withDate={true}
      headerTitle={'Dashboard'}
      withSearchBox={false}
      containerClass="dashboard"
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
              <div className='d-flex dashboard-inner-container'>
                <div className='flex-dir-col left-container'>
                  <div className='d-flex task-container'>
                    <div className='flex-dir-col summary'>
                      <h2>Tasks for today</h2>
                      <h4>You have <span className='color-primary'>{taskCount}</span> task to complete today
                      </h4>
                      <OutlinedPrimaryButton
                        name={'Add New Streak'}
                        click={() => dialogForCreateAndUpdateStreak()}
                        btnContainerClass="add-btn"
                        btnClass='h-40'
                      />
                    </div>

                    <div className={taskCount === 0 ? 'd-flex streaks center-items' : 'd-flex streaks'}>
                      {streakCardJsx()}
                    </div>
                  </div>
                  <div className='flex-dir-col data-container'>
                    <div className='d-flex header-data'>
                      <h2>Data</h2>
                    </div>

                    <div className='d-flex progress-container'>
                      <div className='flex-dir-col progress-card'>
                        <div className='flex-dir-col title-container'>
                          <div className='center-items title-icon title-icon-succ'>
                            <i className="demo-icon icon-streak" />
                          </div>
                          <h3 className='d-flex'>Streak Successful</h3>
                        </div>
                        <div className='d-flex progress-bar'>
                          <div className='d-flex bar'>
                            <div
                              className='bar-complete bar-comp-succ'
                              style={{ width: `${percentageData.streakSuccess}%` }}
                            ></div>
                          </div>
                          <h4 className='perc prog-succ'>{`${percentageData.streakSuccess}%`}</h4>
                        </div>
                        <div
                          onClick={() => {
                            history.push({
                              pathname: `/streak-list`,
                              state: {
                                goTo: 'Finished',
                              },

                            });
                          }}
                          className='count-container count-container-succ c-pointer'>
                          <h4>{`${percentageData.streakCompleted} Streak completed`}</h4>
                        </div>

                      </div>

                      <div className='flex-dir-col progress-card'>
                        <div className='flex-dir-col title-container'>
                          <div className='center-items title-icon title-icon-reward'>
                            <i className="demo-icon icon-reward" />
                          </div>
                          <h3 className='d-flex'>Reward Collected</h3>
                        </div>
                        <div className='d-flex progress-bar'>
                          <div className='d-flex bar'>
                            <div
                              className='bar-complete bar-comp-reward'
                              style={{ width: `${percentageData.rewardsCollectedPerc}%` }}
                            ></div>
                          </div>
                          <h4 className='perc prog-reward'>{`${percentageData.rewardsCollectedPerc}%`}</h4>
                        </div>
                        <div
                          className='count-container count-container-reward c-pointer'
                          onClick={() => {
                            history.push({
                              pathname: `/reward-list`,
                              state: {
                                goTo: 'Earned',
                              },

                            });
                          }}
                        >
                          <h4>{`${percentageData.rewardsCollected} Rewards completed`}</h4>
                        </div>

                      </div>

                      <div className='flex-dir-col progress-card'>
                        <div className='flex-dir-col title-container'>
                          <div className='center-items title-icon title-icon-unsucc'>
                            <i className="demo-icon icon-streak" />
                          </div>
                          <h3 className='d-flex'>Streak Unsuccessful</h3>
                        </div>
                        <div className='d-flex progress-bar'>
                          <div className='d-flex bar'>
                            <div
                              className='bar-complete bar-comp-unsucc'
                              style={{ width: `${percentageData.streakUnsuccessfulPerc}%` }}
                            ></div>
                          </div>
                          <h4 className='perc prog-unsucc'>{`${percentageData.streakUnsuccessfulPerc}%`}</h4>
                        </div>
                        <div
                          className='count-container count-container-unsucc c-pointer'
                          onClick={() => {
                            history.push({
                              pathname: `/streak-list`,
                              state: {
                                goTo: 'Unfinished',
                              },

                            });
                          }}
                        >
                          <h4>{`${percentageData.streakUnsuccessful} Streak unsuccessful`}</h4>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
                <div className='flex-dir-col right-container'>
                  <div className='d-flex flex-auto flex-dir-col'>
                    <h3 className='right-container-title'>Calendar</h3>
                    {recentActivityCardJsx()}
                  </div>

                  <div
                    className='see-all-container center-items mt-50'
                    onClick={() => {
                      history.push({
                        pathname: `/recent-activities`,
                      })
                    }}
                  >
                    <span className='see-all'>SEE ALL</span>
                    <span className='see-all-btn center-items'>
                      <i className="demo-icon icon-going-in" />
                    </span>
                  </div>
                </div>
              </div>
            </>
        }
      </ErrorBoundary>
    </Frame>
  );
}

export default Dashboard;