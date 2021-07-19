import React, { useState } from "react";
import { useHistory } from "react-router";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Actions
import { createStreakData, getStreaksData, deleteStreakData, updateStreakData} from "../../redux/actions/streak";

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
import { useEffect } from "react";

function Streak(props) {
  const dispatch = useDispatch();
  const streaks = useSelector((state) => state.streak.streaks);
  console.log('🚀 ~ file: streak-list.jsx ~ line 28 ~ Streak ~ streaks', streaks);

  useEffect(() => {
    dispatch(getStreaksData());
  }, [dispatch]);

  const [tabOne, setTabOne] = useState(true);
  const [tabTwo, setTabTwo] = useState(false);

  const history = useHistory();

  const dialog = (type , data , streakId) => {
    Modal.show({
      title: type === 'create' ?  "Create Streak" : 'Update Streak',
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

          if(type === 'create')
            dispatch(createStreakData(data));
          else
            dispatch(updateStreakData(data, streakId));
        }
        Modal.hide();
      },
    });
  };

  const dateConversion = (dateToConvert , daysToAdd) => {
    let formattedDate;

    let someDate = new Date(dateToConvert);
    let numberOfDaysToAdd = +daysToAdd;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);


    let dd = someDate.getDate();
    let mm = someDate.getMonth() + 1;
    let y = someDate.getFullYear();

    if (mm.toString().length === 1 && dd.toString().length === 1) {
      formattedDate = `${y}-0${mm}-0${dd}`
    }
    else if (mm.toString().length === 1) {
      formattedDate = `${y}-0${mm}-${dd}`
    }
    else if (dd.toString().length === 1) {
      formattedDate = `${y}-${mm}-${dd}`
    }
    else {
      formattedDate = `${y}-${mm}-${dd}`
    }


    return formattedDate;
  }

  return (
    <Frame
      containerClass="streak-list"
      withHeader={true}
      headerTitle="Streaks"
      withSearchBox={false}
    >
      {/* Tab area */}
      <div className="tab-container">
        <div
          className="tab-item"
          onClick={(e) => {
            if (!tabOne) setTabOne(true);
            setTabTwo(false);
          }}
        >
          <h4>Running</h4>
          <div className={tabOne ? "active-tab" : ""}></div>
        </div>

        <div
          className="tab-item"
          onClick={(e) => {
            if (!tabTwo) setTabTwo(true);
            setTabOne(false);
          }}
        >
          <span>Upcoming</span>
          <div className={tabTwo ? "active-tab" : ""}></div>
        </div>
      </div>

      {/*List of streak*/}
      <div className="streak-list">
        {
          streaks.map((streak, index) => {
            let endDate = dateConversion(streak?.date , streak?.days);
            let startDate = dateConversion(streak?.date, "0");
            return (
              <Card
                key={index}
                onClick={() => {
                  history.push({
                    pathname: `/streak-list/${index}`,
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
                  <div className="icn icon-delete">
                    <IconContext.Provider
                      value={{
                        style: { fontSize: "1.5rem", color: `var(--primaryColor)` },
                      }}
                    >
                      {" "}
                      <AiFillDelete
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteStreakData(streak._id))
                        }}
                      />{" "}
                    </IconContext.Provider>
                  </div>
                  <div className="icn icon-arrow">
                    <IconContext.Provider
                      value={{
                        style: { fontSize: "1.5rem", color: `var(--primaryColor)` },
                      }}
                    >
                      {" "}
                      <HiPencil
                        onClick={(e) => {
                          e.stopPropagation();
                          dialog('update',
                           {
                            title: streak.title,
                            date: startDate,
                            days: streak.days,
                            description: streak.description
                          },
                          streak._id
                          )
                        }}
                      />{" "}
                    </IconContext.Provider>
                  </div>
                </div>
              </Card>
            )
          })
        }
      </div>

      {/* New Streak creating */}
      <div className="new-streak" onClick={() => dialog('create')}>
        <Card cardClass="new-streak-card">
          <div className="content-container">
            <h2>Create new streak</h2>
            <IconContext.Provider
              value={{
                style: {
                  fontSize: "1.4rem",
                  color: "var(--primaryColor)",
                  marginTop: "1px",
                  marginRight: "5px",
                },
              }}
            >
              <AiFillFire />
            </IconContext.Provider>
          </div>
        </Card>
      </div>
    </Frame>
  );
}

export default Streak;
