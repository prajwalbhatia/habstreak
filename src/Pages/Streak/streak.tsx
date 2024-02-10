/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

//Libraries
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import SunEditor from "suneditor-react";
import "suneditor/src/assets/css/suneditor.css";
import Parser from "html-react-parser";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useGetStreakQuery } from "../../Redux/Slices/streakSlice";

import {
  useGetStreakDetailQuery,
  useUpdateStreakDetailMutation,
} from "../../Redux/Slices/streakDetailSlices";

//Actions
// import { getStreaksDetailData, updateStreakDetailData, emptyStreaksDetail, getStreakData } from "redux/actions/streak";

//CSS
import "Styles/Pages/streak.scss";

//ERROR BOUNDARY
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "Utilities/fallback/fallback";

//UTILITIES
import {
  errorHandler,
  dialogForCreateAndUpdateStreak,
  perPerDay,
  isSame,
  isAfter,
} from "Utilities";

//COMPONENTS
import Frame from "Components/frame/frame";
import { InputElement } from "Components/form-elements/form-elements";
import { OutlinedPrimaryButton } from "Components/buttons/buttons";

function Streak(props: any) {
  const streakContainerRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState<any>({});
  const [dayData, setDayData] = useState({});
  const [streakId, setStreakId] = useState<string | null>(null);

  const {
    data: streakDetail,
    isLoading: streakDetailLoading,
    isFetching: streakDetailIsFetching,
    error: streakDetailNewErr,
    refetch: streakListRefetch,
  } = useGetStreakDetailQuery({ streakId: streakId }, { skip: !streakId });

  const {
    data: streak,
    isLoading: streakListLoading,
    isFetching: streakListIsFetching,
    error: streakListNewErr,
    refetch,
  } = useGetStreakQuery({ streakId: streakId }, { skip: !streakId });

  const [
    updateStreakDetail,
    { error: updateStreakError, isLoading: updateStreakLoading },
  ] = useUpdateStreakDetailMutation();

  const [streaks, setStreaks] = useState<any>([]);

  const [collapseState, setCollapseState] = useState<any>({});

  const [progressData, setProgressData] = useState<any>({
    weekDaysArr: [],
    daysArr: [],
    perc: 0.0,
    rewards: [],
  });

  //Getting the data from the state
  // const streakDetail = useSelector((state) => state.streak.streakDetail);
  // const streak = useSelector((state) => state.streak.streak);

  // const loading = useSelector((state) => state.streak.loading);
  //Getting initial data
  // useEffect(() => {
  //     if (props?.match?.params?.id) {
  //         dispatch(getStreaksDetailData(props.match.params.id));
  //         dispatch(getStreakData(props.match.params.id));
  //     }
  //     return () => {
  //         dispatch(emptyStreaksDetail());
  //     }

  // }, [dispatch, props.match.params.id]);

  //Whenver there is a change in streakDetails
  //then we want to update out description array
  //with the latest data
  useEffect(() => {
    setTimeout(() => {
      if (
        streakDetail?.length > 0 &&
        JSON.stringify(streaks) !== JSON.stringify(streakDetail)
      ) {
        let streaksData: any = [...streakDetail];
        let descDetail: any = {};
        let collapseDetail: any = {};
        streaksData.forEach((detail: any) => {
          descDetail[detail._id] = detail.description;
          if (isSame(detail.date, moment().format()))
            collapseDetail[detail._id] = false;
          else collapseDetail[detail._id] = true;
        });
        setDesc({ ...desc, ...descDetail });
        setCollapseState({ ...collapseState, collapseDetail });
        setStreaks([...streaksData]);
      }
    }, 0);
  }, [streakDetail, desc, streaks, collapseState]);

  useEffect(() => {
    setDesc({ ...desc, ...dayData });
  }, [dayData]);

  useEffect(() => {
    const pathname = location?.pathname;
    const parts = pathname.split("/");

    if (parts.length >= 3 && parts[1] === "streak") {
      const id = parts[2];
      setStreakId(id);
    } else {
      console.log("ID not found in the pathname");
    }
  }, [location]);

  //   useEffect(() => {
  //     //   window.scrollTo(0,0);
  //     if (streakContainerRef) {
  //       streakContainerRef.current?.scrollTo(0, 0);
  //     }
  //   }, [streakContainerRef]);

  useEffect(() => {
    if (streak && streak?.[0]) {
      const { dateFrom, dateTo, days, rewards } =
        streak.length > 0 && streak?.[0];
      const weekDaysArr = [];
      const daysArr = [];
      const perDayPerc: any = (100 / Number(days)).toFixed(2);
      const daysCompleted =
        streakDetail?.length > 0
          ? streak[0]?.tag === "finished"
            ? streakDetail?.length
            : streakDetail?.length - 1
          : 0;
      const progress = daysCompleted * perDayPerc;

      for (let i = 0; i < days; i++) {
        let date = moment(dateFrom).add(i, "days").format("D");
        let day = moment(dateFrom).add(i, "days").format("ddd");

        weekDaysArr.push(day);
        daysArr.push(date);
      }

      const modifiedReward =
        rewards &&
        rewards.map((reward: any) => {
          let from = moment(dateFrom);
          let rewardDate = moment(new Date(reward.date));
          const daysDiffOfReward = rewardDate.diff(from, "days") + 1;
          const perDayPerc = perPerDay(dateFrom, dateTo);
          return {
            perc: Number(perDayPerc) * daysDiffOfReward,
            title: reward.title,
            date: rewardDate.format("DD-MM-YYYY"),
          };
        });

      let progressData = {
        weekDaysArr,
        daysArr,
        perc: progress,
        rewards: modifiedReward || [],
      };

      setProgressData(progressData);
    }
  }, [streak, streakDetail]);

  /**
   *
   * @param {Object} detail - Object of detail we want to update
   */
  const updateStreakDetailFun = async (detail: any) => {
    const updateStreak = await updateStreakDetail(streakId);

    // dispatch(updateStreakDetail({
    //     description: desc[detail._id]
    // }, detail._id, detail.streakId));
  };

  /**
   *
   * @param {Object} streak - data we want to update
   */
  const updateStreak = (streak: any) => {
    if (streak?.tag !== "unfinished")
      dialogForCreateAndUpdateStreak("update", streak, streak._id, (data) => {
        console.log("🚀 ~ dialogForCreateAndUpdateStreak ~ data:", data);
      });
  };

  const checkingStatusForStreak = (date: any) => {
    let status = "";
    if (isSame(date, moment().format())) status = "Active";
    else if (isAfter(date, moment().format())) status = "Upcoming";
    else status = "Active";
    return status;
  };

  const checkingStatus = (date: any) => {
    let status = "";
    if (isSame(date, moment().format())) status = "Active";
    else if (isAfter(date, moment().format())) status = "Upcoming";
    else status = "Past";
    return status;
  };

  const collapseContainer = (dataId: any) => {
    let obj = { ...collapseState, [dataId]: !collapseState[dataId] };
    setCollapseState({ ...obj });
  };

  const dayContainerJsx = () => {
    return (
      <>
        {streakDetail?.length > 0 ? (
          streakDetail?.map((detail: any, index: any) => {
            const status = checkingStatus(detail.date);
            return (
              <div key={index}>
                <div className="d-flex justify-space-between mt-30 date-data">
                  <span className="rob-bold-12-black">
                    {moment(detail.date).format("ll")}
                  </span>
                  <div onClick={() => collapseContainer(detail._id)}>
                    {collapseState[detail._id] ? (
                      <i className="demo-icon icon-expand-more" />
                    ) : (
                      <i className="demo-icon icon-expand-less" />
                    )}
                  </div>
                </div>

                {!collapseState[detail._id] ? (
                  <div className="d-flex flex-dir-col mt-16 day-represent">
                    <div className="left-line"></div>
                    <div className="d-flex justify-space-between flex-1 day-data">
                      <h4>{`Day ${index + 1}`}</h4>

                      {status === "Past" ? (
                        streak?.[0]?.tag === "unfinished" ? (
                          index === streakDetail?.length - 1 ? (
                            <i className="demo-icon icon-close-circle circle-icon" />
                          ) : (
                            <i className="demo-icon icon-check-circle circle-icon" />
                          )
                        ) : (
                          <i className="demo-icon icon-check-circle circle-icon" />
                        )
                      ) : (
                        <div className="circle"></div>
                      )}
                    </div>

                    <div className="today-task">
                      {status === "Past" ? (
                        <div className="mt-10">
                          {Parser(desc?.[detail?._id] || "")}
                        </div>
                      ) : (
                        <div className="mt-20">
                          <SunEditor
                            autoFocus={false}
                            placeholder={"Write details about today's task..."}
                            setDefaultStyle="font-family: 'Open Sans'; font-size: 14px;"
                            setContents={desc?.[detail?._id]}
                            onChange={(output) => {
                              setDayData({ [detail?._id]: output });
                            }}
                            setOptions={{
                              addTagsWhitelist: "h1",
                              tabDisable: false,
                              width: "100%",
                              toolbarWidth: "100%",
                              height: "auto",
                              mode: "inline",
                              formats: ["p", "blockquote", "h1", "h2", "h3"],
                              buttonList: [
                                ["undo", "redo"],
                                ["formatBlock"],
                                ["fontSize"],
                                ["link"],
                                ["list"],
                                ["fullScreen"],
                                ["outdent", "indent"],
                                ["fontColor", "hiliteColor", "textStyle"],
                                ["table"],
                                ["bold", "underline", "italic"],
                              ],
                            }}
                          />
                        </div>
                      )}

                      {desc?.[detail._id] &&
                      desc?.[detail._id].length > 0 &&
                      status === "Active" ? (
                        <div className="center-items btn-container">
                          <OutlinedPrimaryButton
                            name={"OK"}
                            click={() => updateStreakDetailFun(detail)}
                            btnContainerClass="okay-btn mt-20"
                            btnClass=""
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="h-100 w-100 d-flex center-items">
            <span className="rob-med-14-black">Streak is not started yet</span>
          </div>
        )}
      </>
    );
  };

  const streakDetailJsx = () => {
    return (
      <div className="d-flex flex-1 flex-dir-col">
        <div className="d-flex flex-1 justify-space-between detail-head-container">
          <h3 className="jos-18-primary">{streak?.[0]?.title}</h3>
          <div className="btn-container">
            {streak?.[0]?.tag !== "unfinished" && (
              <OutlinedPrimaryButton
                name={"EDIT"}
                //   click={() => updateStreak(streak[0])}
                click={() => {}}
                btnContainerClass="okay-btn"
                btnClass=""
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-auto">
          <p className="rob-reg-14-grey mt-10 detail-streak">
            {streak?.[0]?.description}
          </p>
        </div>
        <div className="d-flex flex-1 justify-space-between detail-dates mt-20">
          <div className="d-flex date-container">
            <div className="center-items icon-container">
              <i className="demo-icon  icon-flag" />
            </div>
            <div className="flex-dir-col info-container">
              <span className="rob-med-10-primary">Start Date:</span>
              <span className="rob-reg-14-black">
                {moment(streak?.[0]?.dateFrom).format("ll")}
              </span>
            </div>
          </div>
          <div className="d-flex date-container">
            <div className="center-items icon-container">
              <i className="demo-icon  icon-flag" />
            </div>
            <div className="flex-dir-col info-container">
              <span className="rob-med-10-primary">End Date:</span>
              <span className="rob-reg-14-black">
                {moment(streak?.[0]?.dateTo).format("ll")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const performanceDetailJsx = () => {
    return (
      <div className="d-flex flex-1 flex-dir-col w-100">
        <div className="d-flex justify-space-between detail-head-container">
          <h3 className="jos-18-primary">Performance</h3>
        </div>

        <div className="progress-data flex-auto mt-20">
          <div className="dates-info">
            <div className="d-flex days">
              {progressData.weekDaysArr.map((day: any, index: any) => {
                return (
                  <div key={index}>
                    <span className="rob-med-12-black">{day}</span>
                    <div className="d-flex date-circles">
                      <div
                        className="center-items back-circle"
                        style={
                          index <
                          (streak?.[0]?.tag === "finished"
                            ? streakDetail?.length
                            : streakDetail?.length - 1)
                            ? { background: "var(--primaryColor)" }
                            : {}
                        }
                      >
                        <div
                          className="center-items circle"
                          style={
                            index >=
                            (streak?.[0]?.tag === "finished"
                              ? streakDetail?.length
                              : streakDetail?.length - 1)
                              ? {
                                  background: "#E8EEF2",
                                  minWidth: "4rem",
                                  height: "4rem",
                                }
                              : {}
                          }
                        >
                          <span className="rob-med-12-black">
                            {progressData.daysArr[index]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="progress-container">
            <div className="d-flex justify-space-between">
              <span className="rob-med-10-primary">Progress Bar</span>
              <span className="rob-med-10-primary">
                {progressData?.perc > 100
                  ? "100% done"
                  : `${progressData?.perc?.toFixed(2)}% done`}
              </span>
            </div>

            <div className="prgress-slider">
              <div
                className="inner-slider"
                style={{ width: `${progressData.perc}%` }}
              >
                {streakDetail?.length >= 2 && (
                  <i className="demo-icon icon-streak" />
                )}
              </div>

              {progressData.rewards.length > 0 ? (
                progressData.rewards.map((reward: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="center-items trophy-container"
                      style={{ left: `calc(${reward.perc}% - 3rem)` }}
                    >
                      <div className="title reward-info ">
                        <span className="rob-med-10-primary">
                          {reward.date}
                        </span>
                        <span className="rob-med-10-primary reward-title">
                          {reward.title}
                        </span>
                      </div>
                      <i className="demo-icon icon-reward" />
                    </div>
                  );
                })
              ) : (
                <div className="center-items trophy-container-no-hover">
                  <i className="demo-icon icon-flag" />
                </div>
              )}
            </div>

            <div className="center-items mt-20">
              <span className="rob-med-10-primary">
                {!streak?.[0]?.tag
                  ? "Come On! You can Do It."
                  : streak?.[0]?.tag === "finished"
                  ? "Yay!! You have done it"
                  : "Better Luck next time !!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Frame
      containerClass="streak"
      withHeader={true}
      withSearchBox={false}
      //   headerTitle={streak[0]?.title}
      withInternalNavigation={true}
      internalNavigation={location?.state?.from}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        {false ? (
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
        ) : (
          <div
            ref={streakContainerRef}
            className="d-flex streak-details-container"
          >
            <div className="left-container">
              <div className="d-flex justify-space-between container-heading">
                <h3 className="jos-18-primary task-heading">Tasks</h3>
                <span className="rob-med-12-primary streak-status">
                  State:
                  {streak?.[0]?.tag
                    ? streak?.[0]?.tag.toUpperCase()
                    : checkingStatusForStreak(
                        streak?.[0]?.dateFrom
                      ).toUpperCase()}
                </span>
              </div>

              <div className="task-container  mt-20">{dayContainerJsx()}</div>
            </div>
            <div className="flex-dir-col right-container">
              <div className="d-flex streak-detail-container">
                {streakDetailJsx()}
              </div>

              <div className="d-flex performance-container">
                {performanceDetailJsx()}
              </div>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </Frame>
  );
}

export default Streak;
