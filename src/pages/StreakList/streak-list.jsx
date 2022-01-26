import React, { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//Actions
import { createStreakData, getStreaksData, deleteStreakData, deleteStreakAndRewardData , updateStreakData } from "../../redux/actions/streak";
import { deleteRewardBulk } from "../../redux/actions/reward";

//Icons
import { AiFillDelete, AiFillFire } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { IconContext } from "react-icons";

//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";
import Modal from "../../components/modal";

//CSS
import "./streak-list.css";
import "../../index.css";

function Streak(props) {
  const dispatch = useDispatch();
  const [tabOne, setTabOne] = useState(true);
  const [tabTwo, setTabTwo] = useState(false);
  const [tabThree, setTabThree] = useState(false);

  const [running, setRunning] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [finished, setFinished] = useState([]);

  const [streakType, setStreakType] = useState('running');
  const [emptyStateText, setEmptyStateText] = useState('No Streaks available..Please create some streaks');
  const history = useHistory();

  //Getting the data from the state
  const streaks = useSelector((state) => state.streak.streaks);
  const loading = useSelector((state) => state.streak.loading);

  let dataToRender = streakType === 'running' ? running : (streakType === 'upcoming' ? upcoming : finished);
  //Getting initial data
  useEffect(() => {
    dispatch(getStreaksData());
  }, [dispatch]);


  useEffect(() => {
    const finished = streaks.filter((streak) => {
      const streakEndDate = moment(streak.date).add(Number(streak.days), 'd').format();
      if (moment(moment(streakEndDate).format('YYYY-MM-DD')).isBefore(moment(moment().date()).format('YYYY-MM-DD'))) {
        return streak;
      }
    });

    const running = streaks.filter((streak) => {
      if (moment(moment(streak.date).format('YYYY-MM-DD')).isSameOrBefore(moment(Date.now()).format('YYYY-MM-DD'))) {
        return streak;
      }
    });

    const upcoming = streaks.filter((streak) => {
      if (moment(moment(streak.date).format('YYYY-MM-DD')).isAfter(moment(Date.now()).format('YYYY-MM-DD'))) {
        return streak;
      }
    });

    setRunning(running);
    setUpcoming(upcoming);
    setFinished(finished);
  }, [streaks]);

  /**
   * 
   * @param {String} type - type of action we want to take ('create' or 'update')
   * @param {Object} data - Pre loaded data in case of update
   * @param {String} streakId - In case of update id of streak we want to update
   */
  const dialog = (type, data, streakId) => {
    Modal.show({
      title: type === 'create' ? "Create Streak" : 'Update Streak',
      icon: <AiFillFire />,
      initialData: {
        title: data?.title,
        days: data?.days,
        date: data?.date,
        description: data?.description
      },
      primaryButtonText: type === 'create' ? "Create" : 'Update',
      secondaryButtonText: "Cancel",
      content: [
        {
          label: "Title",
          uid: "title",
          type: "text",
          eleType: "input",
        },
        {
          label: "Days",
          uid: "days",
          type: "text",
          eleType: "input",
        },
        {
          label: "Start date",
          uid: "date",
          type: "date",
          eleType: "input",
          min: moment(new Date()).format('YYYY-MM-DD')
        },
        {
          label: "Description",
          uid: "description",
          type: "text",
          eleType: "textArea",
        },
      ],
      btnClickHandler: (data) => {
        if (data.type === "primary") {
          delete data.type
          if (type === 'create') {
            dispatch(createStreakData(data));
            if (moment(moment(data.date).format('YYYY-MM-DD')).isAfter(moment(Date.now()).format('YYYY-MM-DD')
            )) {
              setStreakType('upcoming');
              setTabOne(false);
              setTabTwo(true);
            }
            else {
              setStreakType('running')
              setTabOne(true)
              setTabTwo(false)
            }
          }
          else
            dispatch(updateStreakData(data, streakId));
        }
        Modal.hide();
      },
    });
  };

  const dialogBeforDeletngStreak = (streak) => {
    Modal.show({
      title: 'Delete',
      icon: <AiFillDelete />,
      primaryButtonText: 'Delete streak',
      primaryButtonColor: '#d7443e',
      secondaryButtonText: "Cancel",
      extraButtons: [
        {
          text: 'Delete streak and rewards assosiated',
          style: { backgroundColor: '#d80900' },
          uid: 'delete-streak-and-rewards'
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
  const deleteStreak = (e, streak) => {
    e.stopPropagation();
    dialogBeforDeletngStreak(streak)
  }

  /**
   * 
   * @param {Object} e - event 
   * @param {Object} streak - data we want to update  
   * @param {String} startDate - date in the format of 'yyyy-mm-dd' 
   */
  const updateStreak = (e, streak, startDate) => {
    e.stopPropagation();
    const data = {
      title: streak.title,
      date: startDate,
      days: streak.days,
      description: streak.description
    }
    dialog('update', data, streak._id);
  }

  return (
    <Frame
      containerClass="container-streak-list"
      withHeader={true}
      headerTitle="Streaks"
      withSearchBox={false}
    >
      {
        loading
          ?
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
          :
          <>
            {/* Tab area */}
            <div className="tab-container">
              <div
                className="tab-item"
                onClick={(e) => {
                  if (!tabOne) setTabOne(true);
                  setTabTwo(false);
                  setTabThree(false);
                  setStreakType('running');
                  setEmptyStateText('No running Streaks available..Please create some streaks');
                }}
              >
                <h4>{`Running (${running.length})`}</h4>
                <div className={tabOne ? "active-tab" : ""}></div>
              </div>

              <div
                className="tab-item"
                onClick={(e) => {
                  if (!tabTwo) setTabTwo(true);
                  setTabOne(false);
                  setTabThree(false);
                  setStreakType('upcoming');
                  setEmptyStateText('No upcoming streaks available..Please create some streaks');
                }}
              >
                <span>{`Upcoming (${upcoming.length})`}</span>
                <div className={tabTwo ? "active-tab" : ""}></div>
              </div>

              <div
                className="tab-item"
                onClick={(e) => {
                  if (!tabThree) setTabThree(true);
                  setTabOne(false);
                  setTabTwo(false);
                  setStreakType('finished');
                  setEmptyStateText('No streak is finished');
                }}
              >
                <span>{`Finished (${finished.length})`}</span>
                <div className={tabThree ? "active-tab" : ""}></div>
              </div>
            </div>

            {/*List of streak*/}
            <div className="streak-list">
              {
                dataToRender.length > 0
                  ?
                  dataToRender.map((streak, index) => {
                    let endDate = moment(streak?.date).add(+streak?.days, 'days').format('YYYY-MM-DD');
                    let startDate = moment(streak?.date).format('YYYY-MM-DD');
                    return (
                      <Card
                        key={index}
                        onClick={() => {
                          history.push({
                            pathname: `/streak-list/${streak._id}`,
                            state: { streakName: streak.title },
                          });
                        }}
                        withLine={true}
                        cardClass="streak-card"
                      >
                        <div className="info-container">
                          <h3>{streak.title}</h3>
                          <h4>{`${streak.days} days`}</h4>
                          <h4>{`${startDate} to ${endDate}`}</h4>
                          <p className="mt-1">
                            {streak.description}
                          </p>
                        </div>

                        <div className="image-container"></div>
                        <div className="icons-container">
                          <div className="icn icon-delete" onClick={(e) => deleteStreak(e, streak)}>
                            <IconContext.Provider value={{ className: 'common-icon' }}>
                              <AiFillDelete />
                            </IconContext.Provider>
                          </div>
                          <div
                            className="icn icon-edit"
                            onClick={(e) => updateStreak(e, streak, startDate)}
                          >
                            <IconContext.Provider value={{ className: 'common-icon' }}>
                              <HiPencil />
                            </IconContext.Provider>
                          </div>
                        </div>
                      </Card>
                    )
                  })
                  :
                  <div className="empty-container">
                    <p>{emptyStateText}</p>
                  </div>
              }
            </div>

            {/* New Streak creating */}
            {
              streakType !== 'finished' &&
              <div className="new-streak" onClick={() => dialog('create')}>
                <Card cardClass="new-streak-card">
                  <div className="content-container">
                    <h2>Create new streak</h2>
                    <IconContext.Provider value={{ className: 'common-icon fire-icon' }}>
                      <AiFillFire />
                    </IconContext.Provider>
                  </div>
                </Card>
              </div>
            }
          </>
      }
    </Frame >
  );
}

export default Streak;
