import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";

//Actions
import { getRecentActivitiesData } from "../../redux/actions/recentActivities";

//CSS
import './recentActivities.css';
import "../../index.css";

function RecentActivities() {
  const dispatch = useDispatch();

  //Getting the data from the state
  const activities = useSelector((state) => state.recentActivities.activities);

  const loading = useSelector((state) => state.recentActivities.loading);

  useEffect(() => {
    dispatch(getRecentActivitiesData());
  }, [])

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

  return (
    <Frame
      withHeader={true}
      headerTitle={'Recent Activities'}
      withSearchBox={false}
      containerClass="recent-activities"
    >
      {
        loading
          ?
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
          :
          <div className="activities-container pad-global">
            <div className="pad-global">
              <Card cardClass="activities-card">
                {
                  activities && activities.map((activity, index) => {
                    return (
                      <div key={activity._id} className="list-items">
                        <div className="empty-circle"></div>
                        <div className="date-and-time"><span>{moment(activity?.date).format('LLLL')}</span></div>
                        <div className="activity"><span>{activityTitle(activity.type, activity.title)}</span></div>
                      </div>
                    )
                  })
                }
              </Card>
            </div>
          </div>
      }
    </Frame>
  )
}

export default RecentActivities
