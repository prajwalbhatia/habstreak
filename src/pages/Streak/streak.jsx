import React, { useState } from 'react';

//Icons
import { AiFillDelete , AiFillFire } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import {IconContext} from "react-icons"

//COMPONENTS
import Navigation from "../../components/navigation/navigation";
import Header from "../../components/header/header";
import Card from "../../components/card/card";
import Modal from "../../components/modal";

//CSS
import './streak.css';
import "../../index.css";

function Streak(props) {
  const [tabOne , setTabOne] = useState(true);
  const [tabTwo , setTabTwo] = useState(false);


  const dialog = () => {
    Modal.show({
      title : 'Create Streak',
      icon : <AiFillFire/>,
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
          label : 'Days',
          uid : 'days',
          type : 'text',
          eleType : 'input'
        },
        {
          label : 'Date',
          uid : 'date',
          type : 'date',
          eleType : 'input'
        },
        {
          label : 'Description',
          uid : 'description',
          type : 'text',
          eleType : 'textArea'
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
    <>
    <div className="streak">
      <Navigation />
      <div className="streak-main-container">
        {/* Header */}
        <div className="pad-global">
            <Header
              headerText={'STREAK'}
              withSearchBox={false}
            />
        </div>

          {/* Tab area */}
          <div className="tab-container" >
          <div 
            className="tab-item"
            onClick={(e) => {
              if(!tabOne) setTabOne(true);
              setTabTwo(false);
            }}
            >
            <h4>Running</h4>
            <div className={tabOne ?  "active-tab" : ""}></div>
          </div>

          <div 
          className="tab-item"
          onClick={(e) => {
            if(!tabTwo) setTabTwo(true);
            setTabOne(false);
          }}
          >
            <span>Upcoming</span>
            <div className={tabTwo ?  "active-tab" : ""}></div>
          </div>
        </div>

          {/*List of streak*/}
          <div className="streak-list">
            <Card withLine={true} cardClass="streak-card">
              <div className="info-container">
                <h3>100 days of Javascript</h3>
                <h4>100 days</h4>
                <p className="mt-1">The motive of this streak is to keep learning JS with consistency....</p>
              </div>
              
              <div className="image-container">

              </div>

              <div className="icons-container">
                  <div className="icn icon-delete">
                    <IconContext.Provider value={{ style: {fontSize: '1.5rem', color: `var(--primaryColor)`}}}> <AiFillDelete/> </IconContext.Provider>
                  </div>
                  <div className="icn icon-arrow">
                    <IconContext.Provider value={{ style: {fontSize: '1.5rem', color: `var(--primaryColor)`}}}> <FaLocationArrow/> </IconContext.Provider>
                  </div>
              </div>
            </Card>
          </div> 

             {/* New Streak creating */}
            <div className="new-streak" onClick={() => dialog()}>
              <Card cardClass="new-streak-card">
                  <div className="content-container">
                    <h2>Create new streak</h2>
                    <IconContext.Provider 
                      value={{ style: {fontSize: '1.4rem', color: "var(--primaryColor)" , marginTop : "1px" , marginRight : "5px"}}}>
                      <AiFillFire/>
                    </IconContext.Provider>
                  </div>
              </Card>
          </div>
          </div>
    </div>
    </>
  );
}

export default Streak;