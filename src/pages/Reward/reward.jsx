import React, { useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//Actions
import { getRewardsData } from "redux/actions/reward";
import { getStreaksData } from "redux/actions/streak";

//CSS
import "./reward.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { dialogForCreateAndUpdateReward, errorHandler, dialogBeforDeletng, progressFun } from 'utilities';

//COMPONENTS
import Frame from "../../components/frame/frame";
import Table from "components/table/table.jsx";

//CONSTANTS
import { rewardListTableHeadings } from "constants/index";

function Streak(props) {
  const dispatch = useDispatch();

  const [tabData, setTabData] = useState(
    [
      {
        title: 'To Buy',
        count: 0,
        active: true
      },
      {
        title: 'Earned',
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

  const [tableData, setTableData] = useState([]);
  const [currentTab, setCurrentTab] = useState('To Buy');

  const [rewardsEarned, setRewardsEarned] = useState([]);
  const [rewardsToBuy, setRewardsToBuy] = useState([]);
  const [rewardsUnfinished, setRewardsUnfinished] = useState([]);


  const rewards = useSelector((state) => state.reward.rewards);
  console.log('🚀 ~ file: reward.jsx ~ line 63 ~ Streak ~ rewards', rewards);
  const streaks = useSelector((state) => state.streak.streaks);
  const loading = useSelector((state) => state.streak.loading);

  //Getting initial data
  useEffect(() => {
    dispatch(getStreaksData());
    dispatch(getRewardsData());
  }, []);

  useEffect(() => {
    const earned = [];
    const toBuy = [];
    const unfinished = [];


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
    dataOfTabs[2].count = unfinished.length;
    setTabData([...dataOfTabs]);


    updateTableData();

  }, [rewards])


  useEffect(() => {
    updateTableData();
  }, [tabData])



  const modifyReward = (rewards) => {
    const rewardData = [...rewards];

    const modified = rewardData.map((reward) => {
      const streakAssociated = streaks.filter((streak) => streak._id === reward.streakId);

      if (streakAssociated[0]) {
        const rewardDate = moment(reward.date);
        const streakStartDate = moment(streakAssociated[0].dateFrom);
        const currentDate = moment(new Date());

        const daysLeft = rewardDate.diff(currentDate, 'days') + 1;
        const progress = progressFun(streakStartDate, rewardDate, daysLeft)

        let rewardObj = {};
        rewardObj._id = reward._id;
        rewardObj.title = reward.title;
        rewardObj.associated = streakAssociated.length > 0 && (streakAssociated[0].title || '');
        rewardObj.date = moment(reward.date).format('L');
        rewardObj.running = daysLeft;
        rewardObj.reward = streakAssociated.rewards && `${streakAssociated?.rewards.length}`;
        rewardObj.progress = `${progress}%`;
        rewardObj.streak = streakAssociated.length > 0 && streakAssociated[0];

        return rewardObj;
      }
    });

    return modified
  }


  const updateTableData = () => {
    let selectedData = [];
    if (currentTab === 'To Buy')
      selectedData = [...rewardsToBuy];
    else if (currentTab === 'Earned')
      selectedData = [...rewardsEarned];
    else
      selectedData = [];

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
    console.log('🚀 ~ file: reward.jsx ~ line 326 ~ tableAction ~ actionObj', actionObj);
    if (actionObj.actionType === 'tabClicked') {
      if (actionObj.data === 'To Buy') {
        const tab = [...tabData];
        tab[0].active = true;
        tab[1].active = false;
        tab[2].active = false;
        setTabData([...tab]);

        const modifiedData = modifyReward([...rewardsToBuy]);
        setTableData([...modifiedData]);
        setCurrentTab('To buy');
      }
      else if (actionObj.data === 'Earned') {
        const tab = [...tabData];
        tab[0].active = false;
        tab[1].active = true;
        tab[2].active = false;
        setTabData([...tab]);


        const modifiedData = modifyReward([...rewardsEarned]);
        setTableData([...modifiedData]);
        setCurrentTab('Earned');

      }
      else if (actionObj.data === 'Unfinished') {
        const tab = [...tabData];
        tab[0].active = false;
        tab[1].active = false;
        tab[2].active = true;
        setTabData([...tab]);

        const modifiedData = modifyReward([...rewardsUnfinished]);
        setTableData([...modifiedData]);
        setCurrentTab('Unfinished');

      }
    }
    else if (actionObj.actionType === 'deleteRow') {
      deleteReward(actionObj.data);
    }

    else if (actionObj.actionType === 'editRow') {
      dialogForCreateAndUpdateReward('update', actionObj.data, actionObj.data._id, [...streaks]);
    }

    // else if (actionObj.actionType === 'navigate') {
    //   history.push({
    //     pathname: `/streak-list/${actionObj.data._id}`,
    //     state: {
    //       from: 'Streak',
    //     },

    //   });
    // }
  }

  return (
    <Frame
      withHeader={true}
      withSearchBox={false}
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
              />
            </div>
        }
      </ErrorBoundary>
    </Frame>
  );
}

export default Streak;
