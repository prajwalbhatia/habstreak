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
import { OutlinedPrimaryButton } from "components/button/button";
import { dialogCreateStreak } from "utilities";

//Actions
import { getStreaksData } from "../../redux/actions/streak";
import { getRecentActivitiesData } from "../../redux/actions/recentActivities";

//Icons
import { GrRefresh } from "react-icons/gr";

//CSS
import './dashboard.css';
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler } from 'utilities';

function Dashboard(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user] = useState(JSON.parse(localStorage.getItem('profile')));
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
  }, [dispatch])

  useEffect(() => {
    const running = streaks.filter((streak) => {
      if (moment(moment(streak.date).format('YYYY-MM-DD')).isSameOrBefore(moment(Date.now()).format('YYYY-MM-DD'))) {
        return streak;
      }
      else
        return null;
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
      withDate={true}
      headerTitle={'Dashboard'}
      withSearchBox={true}
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
                      <h4>You have <span className='color-primary'>2</span> task to complete today and <span className='color-primary'>3</span> task in progress</h4>
                      <OutlinedPrimaryButton
                        name={'Add New Streak'}
                        click={() => dialogCreateStreak()}
                        btnContainerClass="add-btn"
                        btnClass='h-40'
                      />
                    </div>

                    <div className='d-flex streaks'>
                      <div className='flex-dir-col streak-card'>
                        <div className='card-icon'>
                          <i className="demo-icon icon-kayaking" />
                        </div>
                        <h4>Streak name one</h4>
                        <h6 className='mt-10'>Task completed</h6>
                        <h1 >82%</h1>
                        <span>1 day to go</span>
                        <div className='go-btn'>
                          <i className="demo-icon icon-going-in" />
                        </div>
                      </div>

                      <div className='flex-dir-col streak-card'>
                        <div className='center-items card-icon'>
                          <i className="demo-icon icon-kayaking" />
                        </div>
                        <h4>Streak name one</h4>
                        <h6 className='mt-10'>Task completed</h6>
                        <h1 >82%</h1>
                        <span>1 day to go</span>
                        <div className='d-flex go-btn'>
                          <i className="demo-icon icon-going-in" />
                        </div>
                      </div>

                      <div className='flex-dir-col streak-card'>
                        <div className='card-icon'>
                          <i className="demo-icon icon-kayaking" />
                        </div>
                        <h4>Streak name one</h4>
                        <h6 className='mt-10'>Task completed</h6>
                        <h1 >82%</h1>
                        <span>1 day to go</span>
                        <div className='go-btn'>
                          <i className="demo-icon icon-going-in" />
                        </div>
                      </div>

                      <div className='flex-dir-col streak-card'>
                        <div className='card-icon'>
                          <i className="demo-icon icon-kayaking" />
                        </div>
                        <h4>Streak name one</h4>
                        <h6 className='mt-10'>Task completed</h6>
                        <h1 >82%</h1>
                        <span>1 day to go</span>
                        <div className='go-btn'>
                          <i className="demo-icon icon-going-in" />
                        </div>
                      </div>
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
                  <h3 className='right-container-title'>Calendar</h3>
                  <div className='date-data'>
                    <span className='date-content'>Feb 08, 2022</span>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>
                  </div>

                  <div className='date-data'>
                    <span className='date-content'>Feb 08, 2022</span>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='flex-dir-col action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>
                  </div>


                  <div className='date-data'>
                    <span className='date-content'>Feb 08, 2022</span>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>

                    <div className='info-container'>
                      <h3 className='time'>10:00</h3>
                      <div className='hr-line'></div>
                      <div className='action-info'>
                        <span className='name'>Streak Name</span>
                        <span className='action'>Action: Streak Deleted</span>
                      </div>
                    </div>
                  </div>
                  <div className='see-all-container center-items mt-50'>
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