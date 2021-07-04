import React from 'react';

//CSS
import "./rewards.css";

import { AiFillTrophy } from "react-icons/ai";
import {IconContext} from "react-icons"


//COMPONENTS
import Frame from "../../components/frame/frame";
import Card from "../../components/card/card";
import Modal from "../../components/modal";


function Streak(props) {

  const dialog = () => {
    Modal.show({
      title : 'Create reward',
      icon : <AiFillTrophy/>,
      primaryButtonText : 'Create',
      secondaryButtonText : 'Cancel',
      content : 
      [
        {
          label : 'Title',
          uid : 'title',
          type : 'text',
          eleType : 'input'
        },
        {
          label : 'Add to streak',
          uid : 'add',
          type : 'text',
          eleType : 'input'
        },
        {
          label : 'Date',
          uid : 'date',
          type : 'date',
          eleType : 'input'
        },
        
    ],
      btnClickHandler : (data) => {
          console.log(data)
          if(data.type === 'secondary')
          Modal.hide()
      }
    });
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
                  <h4>100 days of Javascript</h4>
                  <p className="mt-1">The motive of this streak is to keep learning JS with consistency....</p>
                  
                </Card>

                <Card cardClass="new-reward-card" onClick={() => dialog()}>
                  <div className="content-container">
                    <h5>Create new reward</h5>
                    <IconContext.Provider 
                      value={{ style: {fontSize: '1rem', color: "var(--primaryColor)" , marginTop : "1px" , marginRight : "5px"}}}>
                      <AiFillTrophy/>
                    </IconContext.Provider>
                  </div>
              </Card>
              </div>
            </div>
            <div className="right-portion">
              <h4>Rewards Earned</h4>

              <div className="rewards-list">
                <Card withLine={true} cardClass="streak-card">
                  <h4>100 days of Javascript</h4>
                  <p className="mt-1">The motive of this streak is to keep learning JS with consistency....</p>
                  
                </Card>
              </div>
            </div>
          </div>
      </Frame>
  );
}

export default Streak;