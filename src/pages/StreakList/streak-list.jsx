import React, { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";
import { cloneDeep as _cloneDeep } from "lodash";

//Actions
import { getStreaksData, streakListType } from "../../redux/actions/streak";

//COMPONENTS
import Frame from "components/frame/frame";
import Table from "components/table/table.jsx";

//CSS
import "./streak-list.css";
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import {
  errorHandler,
  dialogForCreateAndUpdateStreak,
  dialogBeforDeletng,
  isBefore,
  isSameOrAfter,
  isSameOrBefore,
  isAfter
} from 'utilities';

//CONSTANTS
import { streakListTableHeadings } from "constants/index";

function StreakList(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [tabData, setTabData] = useState(
    [
      {
        title: 'Running',
        count: 0,
        active: true
      },
      {
        title: 'Upcoming',
        count: 0,
        active: false
      },
      {
        title: 'Finished',
        count: 0,
        active: false
      },
      {
        title: 'Unfinished',
        count: 0,
        active: false
      }

    ]
  );

  const [currentTab, setCurrentTab] = useState('Running');
  const [tableData, setTableData] = useState([]);

  const [running, setRunning] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [finished, setFinished] = useState([]);
  const [unfinished, setUnfinished] = useState([]);

  const history = useHistory();

  //Getting the data from the state
  const streaks = useSelector((state) => state.streak.streaks);
  const streakListTypeData = useSelector((state) => state.streak.streaksListType);

  const loading = useSelector((state) => state.streak.loading);
  const error = useSelector((state) => state.streak.error);
  console.log('🚀 ~ file: streak-list.jsx ~ line 89 ~ StreakList ~ error', error);


  useEffect(() => {
    dispatch(getStreaksData());
    setCurrentTab(streakListTypeData);

    const data = [...tabData].map((tab) => {
      if (tab.title === streakListTypeData)
        tab.active = true;
      else
        tab.active = false;

      return tab;
    });

    setTabData(...data)

    if (location.state && location.state.goTo) {
      setCurrentTab(location.state.goTo)

      if (location.state.goTo === 'Finished') {
        const tab = [...tabData];
        tab[0].active = false;
        tab[1].active = false;
        tab[2].active = true;
        tab[3].active = false;
        setTabData([...tab]);
      }
      if (location.state.goTo === 'Unfinished') {
        const tab = [...tabData];
        tab[0].active = false;
        tab[1].active = false;
        tab[2].active = false;
        tab[3].active = true;
        setTabData([...tab]);
      }
    }
  }, [])


  useEffect(() => {
    const currentDate = moment().format();
    const unfinished = streaks.filter((streak) => streak.tag === 'unfinished');
    const finished = streaks.filter((streak) => streak.tag === 'finished');

    const running = streaks.filter((streak) => {
      if (isSameOrBefore(streak.dateFrom, currentDate) && isSameOrAfter(streak.dateTo, currentDate) && !streak.tag) {
        return streak;
      }
      else
        return null;
    });

    const upcoming = streaks.filter((streak) => {
      if (isAfter(streak.dateFrom, currentDate) && !streak.tag) {
        return streak;
      }
      else
        return null;
    });

    setRunning([...running]);
    setUpcoming([...upcoming]);
    setFinished([...finished]);
    setUnfinished([...unfinished])

    const dataOfTabs = [...tabData];
    dataOfTabs[0].count = running.length;
    dataOfTabs[1].count = upcoming.length;
    dataOfTabs[2].count = finished.length;
    dataOfTabs[3].count = unfinished.length;

    setTabData([...dataOfTabs]);

    updateTableData();

  }, [streaks]);


  useEffect(() => {
    updateTableData();
  }, [tabData])



  const modifyStreaks = (streaks) => {
    const streakData = _cloneDeep(streaks);

    const modified = streakData.map((streak) => {
      const totalRewardsCount = streak.rewards.length;
      const rewardEarned = streak.rewards.filter((reward) => reward.rewardEarned).length
      let streakObj = {};
      streakObj._id = streak._id;
      streakObj.title = streak.title;
      streakObj.startDate = moment(streak.dateFrom).format('L');;
      streakObj.endDate = moment(streak.dateTo).format('L');;
      streakObj.running = currentTab === 'Upcoming'
        ? '--'
        :
        (currentTab === 'Unfinished' ? 'DROPPED' : `${streak.days} days`);
      streakObj.reward = `${rewardEarned}/${totalRewardsCount}`;
      streakObj.description = streak.description

      return streakObj;
    });

    return modified
  }


  const updateTableData = () => {
    let selectedData = [];
    if (currentTab === 'Running')
      selectedData = [...running];
    else if (currentTab === 'Upcoming')
      selectedData = [...upcoming];
    else if (currentTab === 'Unfinished')
      selectedData = [...unfinished];
    else
      selectedData = [...finished];

    const modifiedData = modifyStreaks([...selectedData]);
    setTableData([...modifiedData]);
  }

  /**
   * 
   * @param {Object} e - event
   * @param {String} id - Id of streak to delete 
   */
  const deleteStreak = (streak) => {
    dialogBeforDeletng(streak, 'streak')
  }

  /**
   * 
   * @param {Object} streak - data we want to update  
   */
  const updateStreak = (streak) => {
    dialogForCreateAndUpdateStreak('update', streak, streak._id);
  }

  const statusFun = (currentTab) => {
    switch (currentTab) {
      case 'Running':
        return ('Active');
      case 'Upcoming':
        return ('Upcoming');
      case 'Finished':
        return ('Finished');
      case 'Unfinished':
        return ('Dropped');
      default:
        break;
    }
  }

  /**
   * 
   * @param {Object} actionObj
   */
  const tableAction = (actionObj) => {
    if (actionObj.actionType === 'tabClicked') {
      dispatch(streakListType(actionObj.data));
      if (actionObj.data === 'Running') {
        const tab = [...tabData];
        tab[0].active = true;
        tab[1].active = false;
        tab[2].active = false;
        tab[3].active = false;
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...running]);
        setTableData([...modifiedData]);
        setCurrentTab('Running');
      }
      else if (actionObj.data === 'Upcoming') {
        const tab = [...tabData];
        tab[0].active = false;
        tab[1].active = true;
        tab[2].active = false;
        tab[3].active = false;

        setTabData([...tab]);


        const modifiedData = modifyStreaks([...upcoming]);
        setTableData([...modifiedData]);
        setCurrentTab('Upcoming');

      }
      else if (actionObj.data === 'Finished') {
        const tab = [...tabData];
        tab[0].active = false;
        tab[1].active = false;
        tab[2].active = true;
        tab[3].active = false;

        setTabData([...tab]);

        const modifiedData = modifyStreaks([...finished]);
        setTableData([...modifiedData]);
        setCurrentTab('Finished');

      }
      else if (actionObj.data === 'Unfinished') {
        const tab = [...tabData];
        tab[0].active = false;
        tab[1].active = false;
        tab[2].active = false;
        tab[3].active = true;

        setTabData([...tab]);

        const modifiedData = modifyStreaks([...unfinished]);
        setTableData([...modifiedData]);
        setCurrentTab('Unfinished');
      }
    }
    else if (actionObj.actionType === 'deleteRow') {
      deleteStreak(actionObj.data);
    }

    else if (actionObj.actionType === 'editRow') {
      updateStreak(actionObj.data);
    }

    else if (actionObj.actionType === 'navigate') {
      if (currentTab !== 'Unfinished') {
        history.push({
          pathname: `/streak/${actionObj.data._id}`,
          state: {
            from: 'Streak',
            status: statusFun(currentTab)
          },

        });
      }
    }
  }

  return (
    <Frame
      containerClass="container-streak-list"
      withHeader={true}
      headerTitle="Streaks"
      withSearchBox={true}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        {
          loading
            ?
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
            :
            <div className="streak-list-inner-container">
              <Table
                tableHead={streakListTableHeadings}
                tabData={[...tabData]}
                tableData={[...tableData]}
                currentTab={currentTab}
                action={tableAction}
                type='Streak'
              />

            </div>
        }
      </ErrorBoundary>
    </Frame >
  );
}

export default StreakList;
