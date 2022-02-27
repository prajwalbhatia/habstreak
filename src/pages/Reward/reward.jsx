import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//Actions
import { getStreaksDetailData, updateStreakDetailData, emptyStreaksDetail, getStreakData } from "redux/actions/streak";

//CSS
import "./reward.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, dialogForCreateAndUpdateStreak, progress, perPerDay, isSame, isBefore } from 'utilities';


//COMPONENTS
import Frame from "../../components/frame/frame";
import { InputElement } from "components/form-elements/form-elements";
import { OutlinedPrimaryButton } from "components/button/button";

function Reward(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState({});
  const [streaks, setStreaks] = useState([]);

  const [collapseState, setCollapseState] = useState({

  });

  const [progressData, setProgressData] = useState({
    weekDaysArr: [],
    daysArr: [],
    perc: '0',
    rewards: []
  });


  //Getting the data from the state
  const streakDetail = useSelector((state) => state.streak.streakDetail);
  const streak = useSelector((state) => state.streak.streak);

  const loading = useSelector((state) => state.streak.loading);
  //Getting initial data
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(getStreaksDetailData(props.match.params.id));
      dispatch(getStreakData(props.match.params.id));
    }
    return () => {
      dispatch(emptyStreaksDetail());
    }

  }, [dispatch, props.match.params.id]);

  //Whenver there is a change in streakDetails
  //then we want to update out description array
  //with the latest data 
  useEffect(() => {
    if (streakDetail.length > 0 && JSON.stringify(streaks) !== JSON.stringify(streakDetail)) {
      let streaksData = [...streakDetail];
      let descDetail = {};
      let collapseDetail = {}
      streaksData.forEach((detail) => {
        descDetail[detail._id] = detail.description;
        if (isSame(detail.date, moment().format()))
          collapseDetail[detail._id] = false
        else
          collapseDetail[detail._id] = true
      });
      setDesc({ ...desc, ...descDetail });
      setCollapseState({ ...collapseState, collapseDetail });
      setStreaks([...streaksData]);
    }
  }, [streakDetail, desc, streaks])



  useEffect(() => {
    const { dateFrom, dateTo, days, rewards } = streak.length > 0 && streak[0];
    const weekDaysArr = [];
    const daysArr = [];
    const perDayPerc = Number((100 / (Number(days))).toFixed(2));
    const daysCompleted = streakDetail.length - 1;
    const progress = daysCompleted * perDayPerc;



    for (let i = 0; i < days; i++) {
      let date = moment(dateFrom).add(i, 'days').format('D');
      let day = moment(dateFrom).add(i, 'days').format('ddd');

      weekDaysArr.push(day);
      daysArr.push(date);
    }

    const modifiedReward = rewards && rewards.map((reward) => {
      let from = moment(dateFrom);
      let rewardDate = moment(new Date(reward.date));
      const daysDiffOfReward = rewardDate.diff(from, 'days') + 1;
      const perDayPerc = perPerDay(dateFrom, dateTo);
      return { perc: perDayPerc * daysDiffOfReward }
    })

    let progressData = {
      weekDaysArr,
      daysArr,
      perc: progress,
      rewards: modifiedReward || []
    }

    setProgressData(progressData);

  }, [streak])


  /**
   * 
   * @param {Object} detail - Object of detail we want to update
   */
  const updateStreakDetail = (detail) => {
    dispatch(updateStreakDetailData({
      description: desc[detail._id]
    }, detail._id, detail.streakId));
  }

  /**
 * 
 * @param {Object} streak - data we want to update  
 */
  const updateStreak = (streak) => {
    dialogForCreateAndUpdateStreak('update', streak, streak._id);
  }





 

 

  return (
    <Frame
      containerClass="streak"
      withHeader={true}
      withSearchBox={false}
      headerTitle={streak[0]?.title}
      withInternalNavigation={true}
      internalNavigation={location?.state?.from}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        {
          loading
            ?
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
            :
            <div className="d-flex ">
            
            </div>
        }
      </ErrorBoundary>
    </Frame>
  );
}

export default withRouter(Reward);



