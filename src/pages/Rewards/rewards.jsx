import React from "react";

//CSS
import "./rewards.css";

import { AiFillTrophy } from "react-icons/ai";
import { GiGlassCelebration } from "react-icons/gi";
import { IconContext } from "react-icons";

//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";
import Modal from "../../components/modal";
import { Dropdown } from "../../components/form-elements/form-elements";

function Streak(props) {
  const dialog = () => {
    Modal.show({
      title: "Create reward",
      icon: <AiFillTrophy />,
      primaryButtonText: "Create",
      secondaryButtonText: "Cancel",
      content: [
        {
          label: "Title",
          uid: "title",
          type: "text",
          eleType: "input",
        },
        {
          label: "Add to streak",
          uid: "add",
          type: "text",
          eleType: "input",
        },
        {
          label: "Date",
          uid: "date",
          type: "date",
          eleType: "input",
        },
      ],
      btnClickHandler: (data) => {
        console.log(data);
        if (data.type === "secondary") Modal.hide();
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
