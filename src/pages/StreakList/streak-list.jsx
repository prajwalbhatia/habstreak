import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";
import { cloneDeep as _cloneDeep } from "lodash";

//Actions
import { getStreaksData, streakListType, search } from "../../redux/actions/streak";

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
  isSameOrAfter,
  isSameOrBefore,
  isAfter,
  streakTabData,
  activeTab,
  planDetail
} from 'utilities';

//CONSTANTS
import { streakListTableHeadings, streakListTableHeadings2 , plansFeatures } from "constants/index";

function StreakList(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  //STATES
  const [tabData, setTabData] = useState([...streakTabData()]);
  const [tabDataClone, setTabDataClone] = useState([...streakTabData()]);
  const [currentTab, setCurrentTab] = useState('Running');
  const [tableData, setTableData] = useState([]);
  const [streaks, setStreaks] = useState([]);
  const [running, setRunning] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [finished, setFinished] = useState([]);
  const [unfinished, setUnfinished] = useState([]);
  const [planType, setPlanType] = useState("");


  //Getting the data from the state
  const streaksData = useSelector((state) => state.streak.streaks);
  const streaksClone = useSelector((state) => state.streak.streaks);
  const streakListTypeData = useSelector((state) => state.streak.streaksListType);
  const authData = useSelector((state) => state.user.authData);


  const loading = useSelector((state) => state.streak.loading);
  const error = useSelector((state) => state.streak.error);
  const searchText = useSelector((state) => state.streak.searchText);

  //FUNCTIONS
  const tabDataFun = () => {
    return [...tabDataClone].map((tab) => {
      if (tab.title === streakListTypeData)
        tab.active = true;
      else
        tab.active = false;

      return tab;
    });
  }

  const runningStreaks = () => {
    const currentDate = moment().format();
    return [...streaks].filter((streak) => {
      if (isSameOrBefore(streak.dateFrom, currentDate) && isSameOrAfter(streak.dateTo, currentDate) && !streak.tag) {
        return streak;
      }
      else
        return null;
    });
  }

  const upcomingStreak = () => {
    const currentDate = moment().format();
    return [...streaks].filter((streak) => {
      if (isAfter(streak.dateFrom, currentDate) && !streak.tag) {
        return streak;
      }
      else
        return null;
    });
  }

  //WHEN STREAK TEXT IS CHANGED
  useEffect(() => {
    if (searchText === '') {
      setStreaks(streaksClone);

      const tabDataModified = tabDataFun();
      setTabData(tabDataModified)
    }
    else {
      const streaksData = [...streaksClone];
      const filterStreaks = streaksData.filter(streak => streak.title.toLowerCase().includes(searchText.toLowerCase()));

      setStreaks(filterStreaks);

      setTabData([
        {
          title: 'Searched items',
          count: 0,
          active: true
        }])

    }
  }, [searchText])

  useEffect(() => {
    if (planType === "prime") {
      setStreaks([...streaksData]);
    }
    else {
      let limitedData = [...streaksData].splice(0, plansFeatures['free'].streaks);
      setStreaks([...limitedData]);
    }
  }, [streaksData])

  useEffect(() => {
    if (authData)
      setPlanType(planDetail());
  }, [authData]);

  useEffect(() => {
    dispatch(getStreaksData());
    dispatch(search(''));

    setCurrentTab(streakListTypeData);
    const data = tabDataFun();
    setTabData([...data])

    if (location.state && location.state.goTo) {
      setCurrentTab(location.state.goTo);
      let tab = null;
      if (location.state.goTo === 'Finished') {
        // dispatch(streakListType('Finished'));
        tab = activeTab('Finished');
      }
      if (location.state.goTo === 'Unfinished') {
        // dispatch(streakListType('Unfinished'));
        tab = activeTab('Unfinished');
      }
      setTabData([...tab]);
      setTabDataClone([...tab]);
    }
  }, [])


  useEffect(() => {
    if (searchText === "") {
      const unfinished = streaks.filter((streak) => streak.tag === 'unfinished');
      const finished = streaks.filter((streak) => streak.tag === 'finished');

      const running = runningStreaks();
      const upcoming = upcomingStreak();

      setRunning([...running]);
      setUpcoming([...upcoming]);
      setFinished([...finished]);
      setUnfinished([...unfinished])

      const dataOfTabs = [...tabDataClone];
      dataOfTabs[0].count = running.length;
      dataOfTabs[1].count = upcoming.length;
      dataOfTabs[2].count = finished.length;
      dataOfTabs[3].count = unfinished.length;

      setTabData([...dataOfTabs]);

      updateTableData();
    }
    else {
      updateTableData(true);
    }

  }, [streaks]);


  useEffect(() => {
    if (searchText === '')
      updateTableData();
    else
      updateTableData(true)
  }, [tabData])



  const modifyStreaks = (streaks) => {
    const streakData = _cloneDeep(streaks);
    const currentDate = moment().format();

    const modified = streakData.map((streak) => {
      let status = '';
      if (isAfter(streak.dateFrom, currentDate) && !streak.tag)
        status = 'Upcoming';
      const totalRewardsCount = streak.rewards.length;
      const rewardEarned = streak.rewards.filter((reward) => reward.rewardEarned).length
      let streakObj = {};
      streakObj._id = streak._id;
      streakObj.title = streak.title;
      streakObj.startDate = moment(streak.dateFrom).format('L');;
      streakObj.endDate = moment(streak.dateTo).format('L');;
      streakObj.running = status === 'Upcoming'
        ? '--'
        :
        (streak.tag === 'unfinished'
          ? 'DROPPED'
          :
          (streak.tag === 'finished' ? '--' : `${streak.days} days`));
      streakObj.reward = `${rewardEarned}/${totalRewardsCount}`;
      streakObj.description = streak.description

      //We don't want to show rewards in unfinished and finished tab
      if (streak.tag === 'unfinished' || streak.tag === 'finished')
        delete streakObj.reward

      return streakObj;
    });

    return modified
  }


  const updateTableData = (searchData = false) => {
    let selectedData = [];
    if (searchData) {
      selectedData = [...streaks]
    }
    else {
      if (currentTab === 'Running')
        selectedData = [...running];
      else if (currentTab === 'Upcoming')
        selectedData = [...upcoming];
      else if (currentTab === 'Unfinished')
        selectedData = [...unfinished];
      else
        selectedData = [...finished];
    }

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

  const cloneStreak = (streak) => {
    dialogForCreateAndUpdateStreak('clone', streak);
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
        const tab = activeTab('Running', tabDataClone);
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...running]);
        setTableData([...modifiedData]);
        setCurrentTab('Running');
      }
      else if (actionObj.data === 'Upcoming') {
        const tab = activeTab('Upcoming', tabDataClone)
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...upcoming]);
        setTableData([...modifiedData]);
        setCurrentTab('Upcoming');

      }
      else if (actionObj.data === 'Finished') {
        const tab = activeTab('Finished', tabDataClone)
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...finished]);
        setTableData([...modifiedData]);
        setCurrentTab('Finished');

      }
      else if (actionObj.data === 'Unfinished') {
        const tab = activeTab('Unfinished', tabDataClone)

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

    else if (actionObj.actionType === 'cloneRow') {
      cloneStreak(actionObj.data);
    }

    else if (actionObj.actionType === 'navigate') {
      // if (currentTab !== 'Unfinished') {
      history.push({
        pathname: `/streak/${actionObj.data._id}`,
        state: {
          from: 'Streak',
          status: statusFun(currentTab)
        },

      });
      // }
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
                tableHead={(currentTab === 'Finished' || currentTab === 'Unfinished') ? streakListTableHeadings2 :  streakListTableHeadings}
                tabData={[...tabData]}
                tableData={[...tableData]}
                currentTab={currentTab}
                action={tableAction}
                type='Streak'
                streaksCount={streaks.length}
              />

            </div>
        }
      </ErrorBoundary>
    </Frame >
  );
}

export default StreakList;
