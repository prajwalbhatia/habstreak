import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import ClipLoader from "react-spinners/ClipLoader";

//Actions
import { getRewardsData, emptyError } from "redux/actions/reward";
import { getStreaksData } from "redux/actions/streak";

//CSS
import "./rewardList.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import {
  dialogForCreateAndUpdateReward, errorHandler, dialogBeforDeletng, progressFun, isBefore,
  isSameOrAfter,
  isSameOrBefore,
  isAfter,
  isSame,
  activeTab,
  rewardTabData,
  dialogForError,
  planDetail
} from 'utilities';

//COMPONENTS
import Frame from "../../components/frame/frame";
import Table from "components/table/table.jsx";

//CONSTANTS
import { rewardListTableHeadings, plansFeatures } from "constants/index";

function RewardList(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const [tabData, setTabData] = useState([...rewardTabData()]);
  const [tabDataClone] = useState([...rewardTabData()]);

  const [tableData, setTableData] = useState([]);
  const [currentTab, setCurrentTab] = useState('To Buy');
  const [rewards, setRewards] = useState([]);

  const [rewardsEarned, setRewardsEarned] = useState([]);
  const [rewardsToBuy, setRewardsToBuy] = useState([]);
  const [planType, setPlanType] = useState("");


  const rewardsData = useSelector((state) => state.reward.rewards);
  const rewardsClone = useSelector((state) => state.reward.rewards);
  const authData = useSelector((state) => state.user.authData);

  let { error, loading } = useSelector((state) => state.reward);



  const { searchText, streaks } = useSelector((state) => state.streak);

  const tabDataFun = () => {
    return [...tabDataClone].map((tab) => {
      if (tab.title === currentTab)
        tab.active = true;
      else
        tab.active = false;

      return tab;
    });
  }

  //Getting initial data
  useEffect(() => {
    if (error.length > 0) {
      dialogForError(error);
      dispatch(emptyError());
    }
  }, [dispatch, error])


  useEffect(() => {
    dispatch(getStreaksData());
    dispatch(getRewardsData());

    if (location.state && location.state.goTo) {
      setCurrentTab(location.state.goTo)

      if (location.state.goTo === 'Earned') {
        const tab = activeTab('Earned', [...tabData]);
        setTabData([...tab]);
      }
    }


  }, []);

  useEffect(() => {
    if (planType === "prime") {
      setRewards([...rewardsData]);
    }
    else {
      let limitedData = [...rewardsData].splice(0, plansFeatures['free'].rewards);
      setRewards([...limitedData]);
    }
  }, [rewardsData])

  useEffect(() => {
    if (authData)
      setPlanType(planDetail());
  }, [authData]);

  useEffect(() => {
    if (searchText === '') {
      setRewards(rewardsClone);
      const tabDataModified = tabDataFun();
      setTabData(tabDataModified);
    }
    else {
      const rewardsData = [...rewardsClone];
      const filterRewards = rewardsData.filter(reward => reward.title.toLowerCase().includes(searchText.toLowerCase()));

      setRewards(filterRewards);

      setTabData([
        {
          title: 'Searched items',
          count: 0,
          active: true
        }])

    }
  }, [searchText])

  useEffect(() => {
    if (searchText === "") {
      const earned = [];
      const toBuy = [];

      // setCurrentTab('To buy');

      [...rewards].forEach((reward) => {
        if (!reward.rewardEarned)
          toBuy.push(reward);
        else
          earned.push(reward);
      });

      setRewardsEarned([...earned]);
      setRewardsToBuy([...toBuy]);

      const dataOfTabs = [...tabData];
      dataOfTabs[0].count = toBuy.length;
      dataOfTabs[1].count = earned.length;
      setTabData([...dataOfTabs]);

      updateTableData();
    }
    else {
      updateTableData(true);
    }

  }, [rewards])

  useEffect(() => {
    if (searchText === '')
      updateTableData();
    else
      updateTableData(true)
  }, [tabData])

  const streakState = (streak) => {
    const currentDate = moment().format();
    const streakEndDate = moment(streak.dateTo).format();

    if (streak.tag === 'unfinished') {
      return 'Unfinished';
    }
    else if (isBefore(streakEndDate, currentDate) && !streak.tag) {
      return 'Finished';
    }
    else if (isSameOrBefore(streak.dateFrom, currentDate) && isSameOrAfter(streak.dateTo, currentDate) && !streak.tag) {
      return 'Active';
    }
    else if (isAfter(streak.dateFrom, currentDate) && !streak.tag) {
      return 'Upcoming';
    }
  }

  const modifyReward = (rewards) => {
    const rewardData = [...rewards];

    const modified = rewardData.map((reward) => {
      const streakAssociated = streaks.filter((streak) => streak._id === reward.streakId);
      if (streakAssociated[0]) {
        const rewardDate = moment(reward.date);
        const streakStartDate = moment(streakAssociated[0].dateFrom);
        const currentDate = moment().startOf('day').toString();
        let daysLeft = Math.ceil(rewardDate.diff(currentDate, 'days', true));

        if (daysLeft < 0)
          daysLeft = 0;

        const progress = isSame(streakStartDate, currentDate) ? 0 : progressFun(streakStartDate, rewardDate, daysLeft);

        let rewardObj = {};
        rewardObj._id = reward._id;
        rewardObj.title = reward.title;
        rewardObj.associated = streakAssociated.length > 0 && ({
          title: streakAssociated[0].title,
          id: streakAssociated[0]._id,
          state: streakState(streakAssociated[0])
        } || '');
        rewardObj.date = moment(reward.date).format('L');
        rewardObj.running = moment(streakAssociated[0].dateFrom).format() > moment(currentDate).format() ? '-' : daysLeft;
        rewardObj.reward = streakAssociated.rewards && `${streakAssociated?.rewards.length}`;
        rewardObj.progress = moment(streakAssociated[0].dateFrom).format() > moment(currentDate).format() ? '-' : `${progress.toFixed(2)}%`;
        rewardObj.streak = streakAssociated.length > 0 && streakAssociated[0];

        return rewardObj;
      }
      else {
        let rewardObj = {};
        rewardObj._id = reward._id;
        rewardObj.title = reward.title;
        rewardObj.associated = '-';
        rewardObj.date = moment(reward.date).format('L');
        rewardObj.running = '-';
        rewardObj.reward = '-';
        rewardObj.progress = '-';
        rewardObj.streak = '-';

        return rewardObj;
      }
    });

    return modified.filter((item) => item);
  }


  const updateTableData = (searchData = false) => {
    let selectedData = [];

    if (searchData) {
      selectedData = [...rewards]
    }
    else {
      if (currentTab === 'To Buy')
        selectedData = [...rewardsToBuy];
      else if (currentTab === 'Earned')
        selectedData = [...rewardsEarned];
    }
    const modifiedData = modifyReward([...selectedData]);
    setTableData([...modifiedData]);
  }

  /**
 * 
 * @param {Object} e - event
 * @param {String} id - Id of streak to delete 
 */
  const deleteReward = (reward) => {
    dialogBeforDeletng(reward, 'reward');
  }

  /**
  * 
  * @param {Object} actionObj
  */
  const tableAction = (actionObj) => {
    if (actionObj.actionType === 'tabClicked') {
      if (actionObj.data === 'To Buy') {
        const tab = activeTab('To Buy', [...tabData])
        setTabData([...tab]);
        const modifiedData = modifyReward([...rewardsToBuy]);
        setTableData([...modifiedData]);
        setCurrentTab('To Buy');
      }
      else if (actionObj.data === 'Earned') {
        const tab = activeTab('Earned', [...tabData])
        setTabData([...tab]);


        const modifiedData = modifyReward([...rewardsEarned]);
        setTableData([...modifiedData]);
        setCurrentTab('Earned');

      }
    }
    else if (actionObj.actionType === 'deleteRow') {
      deleteReward(actionObj.data);
    }

    else if (actionObj.actionType === 'editRow') {
      const filterStreak = [...streaks].filter(streak => streak.tag !== 'unfinished')

      dialogForCreateAndUpdateReward('update', actionObj.data, actionObj.data._id, filterStreak);
    }

    else if (actionObj.actionType === 'navigate') {

    }
  }

  return (
    <Frame
      withHeader={true}
      withSearchBox={true}
      headerTitle="Rewards"
      containerClass="rewards"
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        {
          loading
            ?
            <div className="loader-container">
              <ClipLoader loading size={40} color="var(--primaryColor)" />
            </div>
            :
            <div className="rewards-area">
              <Table
                tableHead={rewardListTableHeadings}
                tabData={[...tabData]}
                tableData={[...tableData]}
                action={tableAction}
                type='Reward'
              />
            </div>
        }
      </ErrorBoundary>
    </Frame>
  );
}

export default RewardList;
