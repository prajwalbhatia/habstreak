/* eslint-disable no-undef */
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//Actions
import { createStreakData, getStreaksData, deleteStreakData, deleteStreakAndRewardData, updateStreakData, streakListType } from "../../redux/actions/streak";
import { deleteRewardBulk } from "../../redux/actions/reward";

//Icons
import { AiFillDelete, AiFillFire } from "react-icons/ai";

//COMPONENTS
import Frame from "components/frame/frame";
import Modal from "components/modal";
import Table from "components/table/table.jsx"

//CSS
import "./streak-list.css";
import "../../index.css";

//ERROR BOUNDARY
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from 'utilities/fallback/fallback.js';

//UTILITIES
import { errorHandler, dialogForCreateAndUpdateStreak} from 'utilities';

//CONSTANTS
import { streakListTableHeadings } from "constants/index";
import { cloneDeep as _cloneDeep } from "lodash";

function Streak(props) {
  const dispatch = useDispatch();

  const [tabData, setTabData] = useState(
    [
      {
        title: 'Running',
        count: 11,
        active: true
      },
      {
        title: 'Upcoming',
        count: 13,
        active: false
      },
      {
        title: 'Finished',
        count: 27,
        active: false
      }
    ]
  );

  const [currentTab, setCurrentTab] = useState('Running');
  console.log('🚀 ~ file: streak-list.jsx ~ line 63 ~ Streak ~ currentTab', currentTab);
  const [tableData, setTableData] = useState([]);

  const [running, setRunning] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [finished, setFinished] = useState([]);

  const [streakType, setStreakType] = useState('running');
  const [emptyStateText, setEmptyStateText] = useState('No Streaks available..Please create some streaks');
  const history = useHistory();

  //Getting the data from the state
  const streaks = useSelector((state) => state.streak.streaks);
  const streakListTypeData = useSelector((state) => state.streak.streaksListType);

  const loading = useSelector((state) => state.streak.loading);

  useEffect(() => {
    dispatch(streakListType(streakType));
  }, [dispatch, streakType])


  useEffect(() => {
    const currentDate = moment().format();
    const finished = streaks.filter((streak) => {
      const streakEndDate = moment(streak.dateTo).format();
      if (moment(moment(streakEndDate).format('YYYY-MM-DD')).isBefore(moment(currentDate).format('YYYY-MM-DD'))) {
        return streak;
      }
      else
        return null;
    });

    const running = streaks.filter((streak) => {
      if (
        moment(moment(streak.dateFrom).format('YYYY-MM-DD')).isSameOrBefore(moment(currentDate).format('YYYY-MM-DD'))
        &&
        moment(moment(streak.dateTo).format('YYYY-MM-DD')).isSameOrAfter(moment(currentDate).format('YYYY-MM-DD'))
      ) {
        return streak;
      }
      else
        return null;
    });

    const upcoming = streaks.filter((streak) => {
      if (moment(moment(streak.dateFrom).format('YYYY-MM-DD')).isAfter(moment(currentDate).format('YYYY-MM-DD'))) {
        return streak;
      }
      else
        return null;
    });

    setRunning([...running]);
    setUpcoming([...upcoming]);
    setFinished([...finished]);

    const dataOfTabs = [...tabData];
    dataOfTabs[0].count = running.length;
    dataOfTabs[1].count = upcoming.length;
    dataOfTabs[2].count = finished.length;
    setTabData([...dataOfTabs]);

    updateTableData();

  }, [streaks]);


  useEffect(() => {
    updateTableData();
  }, [tabData])



  const modifyStreaks = (streaks) => {
    const streakData = _cloneDeep(streaks);

    const modified = streakData.map((streak) => {
      let streakObj = {};
      streakObj._id = streak._id;
      streakObj.title = streak.title;
      streakObj.startDate = moment(streak.dateFrom).format('L');;
      streakObj.endDate = moment(streak.dateTo).format('L');;
      streakObj.running = currentTab === 'Upcoming' ? '--' : `${streak.days} days`;
      streakObj.reward = 'Yes';
      streakObj.description = streak.description;

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
    else
      selectedData = [...finished];

    const modifiedData = modifyStreaks([...selectedData]);
    setTableData([...modifiedData]);
  }


  const dialogBeforDeletngStreak = (streak) => {
    Modal.show({
      type: 'delete',
      title: 'Delete Streak',
      icon: 'icon-delete',
      primaryButtonText: 'Delete streak',
      primaryButtonColor: '#d7443e',
      secondaryButtonText: "Cancel",
      extraButtons: [
        {
          text: 'Special Delete',
          btnClass : 'special-btn',
          uid: 'delete-streak-and-rewards',
          tooltip : true,
          tooltipData : 'Delete streak and rewards assosiated with it'
        }
      ],
      content: [
        {
          eleType: 'text',
          text: `Are you sure you want delete streak ${streak.title} ?`
        },
      ],
      btnClickHandler: (data) => {
        if (data.type === 'delete-streak-and-rewards') {
          dispatch(deleteStreakData(streak._id));
          dispatch(deleteRewardBulk(streak._id));
        }
        else if (data.type === "primary") {
          dispatch(deleteStreakAndRewardData(streak._id))
        }
        Modal.hide();
      },
    });
  };

  /**
   * 
   * @param {Object} e - event
   * @param {String} id - Id of streak to delete 
   */
  const deleteStreak = (streak) => {
    dialogBeforDeletngStreak(streak)
  }

  /**
   * 
   * @param {Object} streak - data we want to update  
   */
  const updateStreak = (streak) => {
    dialogForCreateAndUpdateStreak('update', streak, streak._id);
  }

  /**
   * 
   * @param {Object} actionObj
   */
  const tableAction = (actionObj) => {
    if (actionObj.actionType === 'tabClicked') {
      if (actionObj.data === 'Running') {
        const tab = [...tabData];
        tab[0].active = true;
        tab[1].active = false;
        tab[2].active = false;
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
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...finished]);
        setTableData([...modifiedData]);
        setCurrentTab('Finished');

      }
    }
    else if (actionObj.actionType === 'deleteRow') {
      deleteStreak(actionObj.data);
    }

    else if (actionObj.actionType === 'editRow') {
      updateStreak(actionObj.data);
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

                action={tableAction}
              />

            </div>
        }
      </ErrorBoundary>
    </Frame >
  );
}

export default Streak;
