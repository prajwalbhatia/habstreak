import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//Libraries
import moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";

import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import size from 'lodash/size';

//COMPONENTS
import Frame from "../../components/frame/frame";

//Actions
import { getRecentActivitiesData, stopLoading } from "../../redux/actions/recentActivities";

//CSS
import './recentActivities.css';
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, planDetail, dialogForUpgrade } from 'utilities';

//FUNCTIONS
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
    case 'update-streak':
      return `A streak named as ${title} is updated`;
    case 'create-reward':
      return `A new reward named as ${title} is created`;
    case 'delete-reward':
      return `A new reward named as ${title} is deleted`;
    case 'reward-earned':
      return `A reward named as ${title} is earned`;
    case 'update-reward':
      return `A reward named as ${title} is updated`;
    default:
      return 'No type is found'
  }
}

/**
* 
* @param {String} type - type of activity (create-streak , delete-streak etc)
* @returns 
*/
const iconType = (type) => {
  switch (type) {
    case 'create-streak':
      return (
        <i
          className="demo-icon icon-streak"
          style={{ color: '#F96E46' }}
        />
      );
    case 'delete-streak':
      return (
        <i
          className="demo-icon icon-delete"
          style={{ color: '#D63E3E' }}
        />
      );
    case 'update-streak':
    case 'update-reward':
      return (
        <i
          className="demo-icon icon-edit"
          style={{ color: '#689669' }}
        />
      );
    case 'create-reward':
      return (
        <i
          className="demo-icon icon-reward"
          style={{ color: '#F96E46' }}
        />
      );
    case 'delete-reward':
      return (
        <i
          className="demo-icon icon-delete"
          style={{ color: '#D63E3E' }}
        />
      );
    case 'reward-earned':
      return (
        <i
          className="demo-icon icon-reward"
          style={{ color: '#FFCB47' }}
        />
      );
    default:
      return 'No type is found'
  }
}

function RecentActivities() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [groupedActivities, setGroupedActivities] = useState({});
  const [planType, setPlanType] = useState("");

  //Getting the data from the state
  const activities = useSelector((state) => state.recentActivities.activities);
  const authData = useSelector((state) => state.user.authData);
  const loading = useSelector((state) => state.recentActivities.loading);


  useEffect(() => {
    if (planType === "prime") {
      dispatch(getRecentActivitiesData());
    }
    else if (planType === 'free') {
      dialogForUpgrade(history);
    }
    dispatch(stopLoading());
  }, [dispatch, planType])


  useEffect(() => {
    if (authData)
      setPlanType(planDetail());
  }, []);

  useEffect(() => {
    if (authData)
      setPlanType(planDetail());
  }, [authData]);


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
    const groupedByDate = groupBy(modifiedActivities, 'date');
    setGroupedActivities(groupedByDate);
  }, [activities]);

  const recentActivityCardJsx = () => {
    const isEmpty = size(groupedActivities) === 0;

    if (!isEmpty && planType.length > 0 && planType !== "free") {
      return (
        map(groupedActivities, (value, key) => {
          return (
            <div key={key} className='date-data'>
              <span className='date-content'>{key}</span>
              {
                map(value, (val, index) => {
                  return (
                    <div key={index} className='info-container'>
                      <div className='icon-container center-items'>
                        {iconType(val.type)}
                        {index < size(value) - 1 ? <div className='line'></div> : null}
                      </div>

                      <div className='flex-dir-col action-info'>
                        <h4 className='action'>{`${activityTitle(val.type, val.title)}`}</h4>
                        <h4 className='time'>{val.time}</h4>
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
          <h3>No Activities</h3>
        </div>
      )
    }
  }

  return (
    <Frame
      withHeader={true}
      headerTitle={'Recent Activities'}
      withSearchBox={false}
      containerClass="recent-activities"
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <div className='subscription-overlay'></div>
        {
          loading
            ?
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
            :
            <div className='activities-container'>
              <div className='sort-btn-container'>

              </div>
              {recentActivityCardJsx()}
            </div>
        }
      </ErrorBoundary>
    </Frame>
  )
}

export default RecentActivities
