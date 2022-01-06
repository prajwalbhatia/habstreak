import React, { useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';
import { ClipLoader } from "react-spinners";

//Actions
import { getRewardsData, createRewardData, updateRewardData, deleteRewardData } from "../../redux/actions/reward";
import { getStreaksData } from "../../redux/actions/streak";

//Icons
import { AiFillDelete } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";

//CSS
import "./reward.css";

import { AiFillTrophy } from "react-icons/ai";
import { GiGlassCelebration } from "react-icons/gi";
import { IconContext } from "react-icons";

//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";
import Modal from "../../components/modal";

function Streak(props) {
  const dispatch = useDispatch();
  const [dropdownDates, setDropdownDates] = useState([]);
  const [rewardsEarned, setRewardsEarned] = useState([]);
  const [rewardsToBuy, setRewardsToBuy] = useState([]);

  const rewards = useSelector((state) => state.reward.rewards);
  const streaks = useSelector((state) => state.streak.streaks);
  const loading = useSelector((state) => state.streak.loading);

  //Getting initial data
  useEffect(() => {
    dispatch(getStreaksData());
    dispatch(getRewardsData());
  }, [dispatch]);

  useEffect(() => {
    const earned = [];
    const toBuy = [];

    rewards.forEach((reward) => {
      if (!reward.rewardEarned)
        toBuy.push(reward);
      else
        earned.push(reward);
    });

    setRewardsEarned([...earned]);
    setRewardsToBuy([...toBuy]);

  }, [rewards])

  const dialog = (streaks, dropdownDates, rewardData) => {

    Modal.show({
      title: "Create reward",
      icon: <AiFillTrophy />,
      primaryButtonText: "Create",
      secondaryButtonText: "Cancel",
      content: dropdownDates.length > 0 ? [
        {
          // label: "Title",
          uid: "title",
          type: "text",
          placeholder: 'Enter a title',
          eleType: "input",
        },
        {
          label: "Streak name",
          uid: "streakName",
          eleType: "dropdown",
          options: [...streaks]
        },
        {
          label: "Date",
          uid: "date",
          eleType: "dropdown",
          options: [...dropdownDates]
        },

      ]
        :
        [
          {
            // label: "Title",
            uid: "title",
            type: "text",
            placeholder: 'Enter a title',
            eleType: "input",
          },
          {
            label: "Streak name",
            uid: "streakName",
            eleType: "dropdown",
            options: [...streaks]
          },
        ]
      ,
      btnClickHandler: (data) => {
        if (data.type === "primary") {
          delete data.type
          const rewardData = { title: data.title, date: data.date, streakId: data?.['streakName']?._id }
          dispatch(createRewardData(rewardData));
        }
        Modal.hide();
      },
      dropdownHandler: (uid, selectedStreak) => {
        if (uid === 'streakName') {
          const dateArr = arrayOfDates(selectedStreak);
          setDropdownDates([...dateArr]);
          dialog(streaks, dateArr, rewardData);
        }
      }
    });
  };

  const dialogForUpdate = (streaks, dropdownDates, reward = {}, selectedStreak = null, selectedDate = null) => {
    Modal.show({
      title: 'Update reward',
      icon: <AiFillTrophy />,
      primaryButtonText: 'Update',
      secondaryButtonText: "Cancel",
      initialData: {
        title: reward?.title,
        streakName: selectedStreak ? selectedStreak : streaks.filter((streak) => streak._id === reward.streakId)[0],
        date: selectedDate ? selectedDate : moment(reward?.date).format('YYYY-MM-DD')
      },
      content:
        [
          {
            uid: "title",
            type: "text",
            placeholder: 'Enter a title',
            eleType: "input",
          },
          {
            label: "",
            uid: "streakName",
            eleType: "dropdown",
            options: [...streaks]
          },
          {
            label: "",
            uid: "date",
            eleType: "dropdown",
            options: [...dropdownDates]
          },
        ],
      btnClickHandler: (data) => {
        if (data.type === "primary") {
          delete data.type
          const rewardData = { title: data.title, date: data.date, streakId: data?.['streakName']?._id }
          dispatch(updateRewardData(rewardData, reward._id));
        }
        Modal.hide();
      },
      dropdownHandler: (uid, selectedStreak) => {
        if (uid === 'streakName') {
          const dateArr = arrayOfDates(selectedStreak);
          setDropdownDates([...dateArr]);
          dialogForUpdate(streaks, dateArr, reward, selectedStreak, ' ');
        }
      }
    });
  };

  const dialogBeforDeletngReward = (reward) => {
    Modal.show({
      title: 'Delete',
      icon: <AiFillDelete />,
      primaryButtonText: 'Delete',
      primaryButtonColor: '#d7443e',
      secondaryButtonText: "Cancel",
      content: [
        {
          eleType: 'text',
          text: `Are you sure you want delete reward ${reward.title} ?`
        },
      ],
      btnClickHandler: (data) => {
        if (data.type === "primary") {
          dispatch(deleteRewardData(reward._id));
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
  const deleteReward = (e, reward) => {
    e.stopPropagation();
    dialogBeforDeletngReward(reward);
  }

  /**
   * 
   * @param {Object} e - event 
   * @param {Object} streak - data we want to update  
   * @param {String} startDate - date in the format of 'yyyy-mm-dd' 
   */
  // const updateReward = (e, reward) => {
  //   e.stopPropagation();
  //   const data = {
  //     title: streak.title,
  //     date: startDate,
  //     days: streak.days,
  //     description: streak.description
  //   }
  //   dialog('update', data, streak._id);
  // }

  const arrayOfDates = (data) => {
    let dateArr = [];
    for (let i = 0; i < +data.days; i++) {
      let date = moment(data?.date).add(i, 'days').format('YYYY-MM-DD');
      if (moment(moment(date).format('YYYY-MM-DD')).isAfter(moment(Date.now()).format('YYYY-MM-DD')))
        dateArr.push(date);
    }
    return [...dateArr];
  }

  return (
    <Frame
      withHeader={true}
      withSearchBox={false}
      headerTitle="Rewards"
      containerClass="rewards"
    >
      {
        loading
          ?
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
          :
          <div >
            <div className="rewards-area">
              <div className="left-portion">
                <h4>TO BUY</h4>

                <div className="rewards-list">
                  {
                    rewardsToBuy.length > 0
                      ?
                      rewardsToBuy.map((reward, index) => {

                        let labelArr = streaks.filter((streak) => {
                          if (streak._id === reward.streakId)
                            return streak
                        });

                        let labelName = labelArr.length > 0 ? labelArr[0].title : '';
                        return (
                          <Card key={reward._id} withLine={true} cardClass="reward-card">
                            <div className="info-container">
                              <h4>{reward.title}</h4>
                              <h5>{labelName}</h5>
                              <h5>{moment(reward?.date).format('YYYY-MM-DD')}</h5>
                            </div>

                            <div className="icons-container">
                              <div className="icn icon-delete" onClick={(e) => deleteReward(e, reward)}>
                                <IconContext.Provider value={{ className: 'common-icon' }}>
                                  <AiFillDelete />
                                </IconContext.Provider>
                              </div>
                              <div
                                className="icn icon-edit"
                                // onClick={() => dialog(streaks, dropdownDates, reward, 'update')}
                                onClick={() => {
                                  dialogForUpdate(streaks, dropdownDates, reward)
                                }
                                }
                              >
                                <IconContext.Provider value={{ className: 'common-icon' }}>
                                  <HiPencil />
                                </IconContext.Provider>
                              </div>
                            </div>
                          </Card>
                        );
                      })
                      :
                      <div className="empty-container">
                        <p>You have nothing to buy</p>
                      </div>
                  }
                </div>
              </div>
              <div className="right-portion">
                <h4>Rewards Earned</h4>

                <div className="rewards-list">

                  {
                    rewardsEarned.length > 0
                      ?
                      rewardsEarned.map((reward) => {
                        return (
                          <Card key={reward._id} withLine={true} cardClass="reward-earned-card">
                            <h4>{reward.title}</h4>
                            <IconContext.Provider
                              value={{
                                style: {
                                  fontSize: "2rem",
                                  color: "var(--primaryColor)",
                                  marginTop: "-10px",
                                  marginRight: "5px",
                                },
                              }}
                            >
                              <GiGlassCelebration />
                            </IconContext.Provider>
                          </Card>
                        );
                      })
                      :
                      <div className="empty-container">
                        <p>You have not earned anything</p>
                      </div>
                  }

                </div>
              </div>


            </div>

            <Card cardClass="new-reward-card" onClick={() => dialog(streaks, dropdownDates)}>
              <div className="content-container">
                <h2>Create new reward</h2>
                <IconContext.Provider
                  value={{
                    style: {
                      fontSize: "1.5rem",
                      color: "var(--primaryColor)",
                      marginTop: "3px",
                      marginRight: "5px",
                    },
                  }}
                >
                  <AiFillTrophy />
                </IconContext.Provider>
              </div>
            </Card>
          </div>

      }
    </Frame>
  );
}

export default Streak;
