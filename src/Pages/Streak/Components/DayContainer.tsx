import moment from "moment";
import React, { useEffect, useState } from "react";
import { checkingStatus } from "../helpers/StreakDetail.renderers";

import SunEditor from "suneditor-react";
import "suneditor/src/assets/css/suneditor.css";
import Parser from "html-react-parser";
import { OutlinedPrimaryButton } from "Components/buttons/buttons";

import { useUpdateStreakDetailMutation } from "../../../Redux/Slices/streakDetailSlices";
import { isSame } from "Utilities";
import { Skeleton } from "@mui/material";

const DayContainer: React.FC<any> = ({ streakDetail, streak, loading }) => {
  const [collapseState, setCollapseState] = useState<any>({});
  const [desc, setDesc] = useState<any>({});
  const [dayData, setDayData] = useState({});
  const [streaks, setStreaks] = useState<any>([]);

  const [
    updateStreakDetail,
    { error: updateStreakError, isLoading: updateStreakLoading },
  ] = useUpdateStreakDetailMutation();

  const collapseContainer = (dataId: any) => {
    let obj = { ...collapseState, [dataId]: !collapseState[dataId] };
    setCollapseState({ ...obj });
  };

  const updateStreakDetailFun = async (detail: any) => {
    try {
      const updateStreak = await updateStreakDetail({
        data: { description: desc[detail._id] },
        id: detail._id,
      });
    } catch (error) {}
  };

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

  return (
    <>
      {streakDetail?.length === 0 && !loading ? (
        <div className="h-100 w-100 d-flex center-items">
          <span className="rob-med-14-black">Streak is not started yet</span>
        </div>
      ) : (
        streakDetail?.map((detail: any, index: any) => {
          const status = checkingStatus(detail.date);
          return (
            <div key={index}>
              <div className="d-flex justify-space-between mt-30 date-data">
                {loading ? (
                  <Skeleton
                    variant="text"
                    sx={{ minWidth: 80, minHeight: 25 }}
                  />
                ) : (
                  <span className="rob-bold-12-black">
                    {moment(detail.date).format("ll")}
                  </span>
                )}

                {loading ? (
                  <Skeleton variant="text" sx={{ width: 20, minHeight: 15 }} />
                ) : (
                  <div onClick={() => collapseContainer(detail._id)}>
                    {collapseState[detail._id] ? (
                      <i className="demo-icon icon-expand-more" />
                    ) : (
                      <i className="demo-icon icon-expand-less" />
                    )}
                  </div>
                )}
              </div>

              {!collapseState[detail._id] ? (
                loading ? (
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={120}
                    sx={{ marginTop: 2 }}
                  />
                ) : (
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
                            loading={updateStreakLoading}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                )
              ) : null}
            </div>
          );
        })
      )}
    </>
  );
};

export default DayContainer;
