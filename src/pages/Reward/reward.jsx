import React, { useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Libraries
import moment from 'moment';

//Actions
import { getRewardsData } from "../../redux/actions/reward";
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
  console.log('🚀 ~ file: reward.jsx ~ line 31 ~ Streak ~ dropdownDates', dropdownDates);
  const rewards = useSelector((state) => state.reward.rewards);
  const streaks = useSelector((state) => state.streak.streaks);

  //Getting initial data
  useEffect(() => {
    dispatch(getStreaksData());
  }, [dispatch]);

  const dialog = (streaks, dropdownDates) => {
    Modal.show({
      title: "Create reward",
      icon: <AiFillTrophy />,
      primaryButtonText: "Create",
      secondaryButtonText: "Cancel",
      content: [
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
        // {
        //   label: "Date",
        //   uid: "To date",
        //   type: "date",
        //   eleType: "input",
        // },
      ],
      btnClickHandler: (data) => {
        console.log('🚀 ~ file: reward.jsx ~ line 52 ~ dialog ~ data', data);
        if (data.type === "primary") {
          delete data.type
          // dispatch(createReward(data));
        }

        Modal.hide();
      },
      dropdownHandler: (uid, data) => {
        if (uid === 'streak-name') {
          const dateArr = arrayOfDates(data)
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
            <Card withLine={true} cardClass="streak-card">
              <h4>Buy monitor</h4>
              <Dropdown
                labelName="Streak Name"
                options={streaks}
                optionSelect={(data) => {
                  arrayOfDates(data);
                }}
              />

              <Dropdown
                labelName="To Date"
                options={dropdownDates}
                optionSelect={(data) => {
                  console.log('🚀 ~ file: reward.jsx ~ line 120 ~ Streak ~ data', data);
                }}
              />
            </Card>

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
