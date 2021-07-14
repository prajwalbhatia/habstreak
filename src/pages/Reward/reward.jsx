import React from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import { createReward } from "../../redux/actions/reward";

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
  const rewards = useSelector((state) => state.reward.rewards);
  console.log('🚀 ~ file: reward.jsx ~ line 25 ~ Streak ~ rewards', rewards);


  const dialog = () => {
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
          placeholder : 'Enter a title',
          eleType: "input",
        },
        {
          label: "Streak name",
          uid: "streak-name",
          eleType: "dropdown",
          options : ['Streak 1' , 'Streak 2']
        },
        {
          label: "Date",
          uid: "date",
          eleType: "dropdown",
          options: ['12th Aug, 2021', '12th Aug, 2021']
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
          dispatch(createReward(data));
        }

        Modal.hide();
      },
    });
  };

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
                options={['Streak 1', 'Streak 2']}
                optionSelect={(data) => {
                }}
              />

              <Dropdown
                labelName="To Date"
                options={['12th Aug, 2021', '12th Aug, 2021']}
                optionSelect={(data) => {
                }}
              />
            </Card>

            <Card cardClass="new-reward-card" onClick={() => dialog()}>
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
