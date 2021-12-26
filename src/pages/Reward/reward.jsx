import React, { useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';

//Actions
import { getRewardsData, createRewardData, updateRewardData, deleteRewardData } from "../../redux/actions/reward";
import { getStreaksData } from "../../redux/actions/streak";

//CSS
import "./reward.css";

import { AiFillTrophy } from "react-icons/ai";
import { GiGlassCelebration } from "react-icons/gi";
import { IconContext } from "react-icons";

//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";
import Modal from "../../components/modal";
import { Dropdown } from "../../components/form-elements/form-elements";

function Streak(props) {
  const dispatch = useDispatch();
  const [dateShow, setDateShow] = useState(false);
  const [dropdownDates, setDropdownDates] = useState([]);
  const rewards = useSelector((state) => state.reward.rewards);
  const streaks = useSelector((state) => state.streak.streaks);

  //Getting initial data
  useEffect(() => {
    dispatch(getStreaksData());
    dispatch(getRewardsData());
  }, [dispatch]);

  const dialog = (streaks, dropdownDates) => {
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
          uid: "streak-name",
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
            uid: "streak-name",
            eleType: "dropdown",
            options: [...streaks]
          },
        ]
      ,
      btnClickHandler: (data) => {
        if (data.type === "primary") {
          delete data.type
          const rewardData = { title: data.title, date: data.date, streakId: data?.['streak-name']?._id }
          console.log('🚀 ~ file: reward.jsx ~ line 78 ~ dialog ~ rewardData', rewardData);
          dispatch(createRewardData(rewardData));
        }

        Modal.hide();
      },
      dropdownHandler: (uid, data) => {
        console.log('🚀 ~ file: reward.jsx ~ line 85 ~ dialog ~ data', data);
        if (uid === 'streak-name') {
          const dateArr = arrayOfDates(data);
          setDropdownDates([...dateArr]);
          dialog(streaks, dateArr);
        }
      }
    });
  };

  const arrayOfDates = (data) => {
    let dateArr = [];
    for (let i = 0; i < +data.days; i++) {
      let date = moment(data?.date).add(i, 'days').format('YYYY-MM-DD');
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
      <div className="rewards-area">
        <div className="left-portion">
          <h4>TO BUY</h4>

          <div className="rewards-list">
            {
              rewards.map((reward, index) => {
                let labelArr = streaks.filter((streak) => {
                  if (streak._id === reward.streakId)
                    return streak
                });

                let labelName = labelArr.length > 0 ? labelArr[0].title : '';
                return (
                  <Card withLine={true} cardClass="streak-card">
                    <h4>{reward.title}</h4>
                    <h5>{labelName}</h5>
                    <h5>{moment(reward?.date).format('YYYY-MM-DD')}</h5>
                  </Card>
                );
              })
            }


            <Card cardClass="new-reward-card" onClick={() => dialog(streaks, dropdownDates)}>
              <div className="content-container">
                <h5>Create new reward</h5>
                <IconContext.Provider
                  value={{
                    style: {
                      fontSize: "1rem",
                      color: "var(--primaryColor)",
                      marginTop: "1px",
                      marginRight: "5px",
                    },
                  }}
                >
                  <AiFillTrophy />
                </IconContext.Provider>
              </div>
            </Card>
          </div>
        </div>
        <div className="right-portion">
          <h4>Rewards Earned</h4>

          <div className="rewards-list">
            <Card withLine={true} cardClass="reward-earned-card">
              <h4>Buy laptop stand</h4>

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
          </div>
        </div>
      </div>
    </Frame>
  );
}

export default Streak;
