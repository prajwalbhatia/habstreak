import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";
import { groupBy as _groupBy, size as _size, map as _map } from "lodash";

//COMPONENTS
import Frame from "../../components/frame/frame";
import { OutlinedPrimaryButton } from "components/button/button";
import { dialogForCreateAndUpdateStreak, perPerDay} from "utilities";

//Actions
import { getStreaksData } from "../../redux/actions/streak";
import { getRecentActivitiesData } from "../../redux/actions/recentActivities";

//CSS
import './dashboard.css';
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, isSameOrBefore, activityTitle, progressFun } from 'utilities';

//CONSTANTS
import { icons, theme } from "constants/index";

function Dashboard(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
  const [taskCount, setTaskCount] = useState(0);
  const [groupedActivities, setGroupedActivities] = useState({});

  //Getting the data from the state
  const streaks = useSelector((state) => state.streak.streaks);
  const activities = useSelector((state) => state.recentActivities.activities);

  const loading = useSelector((state) => state.streak.loading);

  useEffect(() => {
    if (localStorage.getItem('profile')) {
      dispatch(getStreaksData());
      dispatch(getRecentActivitiesData());
    }
  }, [dispatch])

  useEffect(() => {
    const running = streaks.filter((streak) => {
      if (isSameOrBefore(streak.dateFrom, Date().now)) {
        return streak;
      }
      else
        return null;
    });

    setTaskCount(running.length);
  }, [streaks]);


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
    setGroupedActivities(groupedByDate);
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
          const percPerDay = perPerDay(dateFrom , dateTo);
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
          <h3>No data</h3>
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
                            <div className='bar-complete bar-comp-succ'></div>
                          </div>
                          <h4 className='perc prog-succ'>45%</h4>
                        </div>
                        <div className='count-container count-container-succ'>
                          <h4>73 Streak completed</h4>
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
                            <div className='bar-complete bar-comp-reward'></div>
                          </div>
                          <h4 className='perc prog-reward'>57%</h4>
                        </div>
                        <div className='count-container count-container-reward'>
                          <h4>47 Reward collected</h4>
                        </div>

                      </div>

                      <div className='flex-dir-col progress-card'>
                        <div className='flex-dir-col title-container'>
                          <div className='center-items title-icon title-icon-unsucc'>
                            <i className="demo-icon icon-streak" />
                          </div>
                          <h3 className='d-flex'>Streak Successful</h3>
                        </div>
                        <div className='d-flex progress-bar'>
                          <div className='d-flex bar'>
                            <div className='bar-complete bar-comp-unsucc'></div>
                          </div>
                          <h4 className='perc prog-unsucc'>45%</h4>
                        </div>
                        <div className='count-container count-container-unsucc'>
                          <h4>73 Streak completed</h4>
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