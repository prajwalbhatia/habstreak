import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import cloneDeep from "lodash/cloneDeep";
import { ErrorBoundary } from "react-error-boundary";

import Frame from "Components/frame/frame";
import Table from "Components/table/table";

import {
  useGetStreaksQuery,
  useUpdateStreakMutation,
  useDeleteStreakMutation,
  useDeleteStreakAndRewardMutation,
} from "../../Redux/Slices/streakSlice";
import { storeStreakListType } from "../../Redux/Slices/streakListTypeSlice";
import { storeSearchText } from "../../Redux/Slices/searchTextSlice";

import {
  errorHandler,
  dialogForCreateAndUpdateStreak,
  dialogBeforDeletng,
  isSameOrAfter,
  isSameOrBefore,
  isAfter,
  streakTabData,
  activeTab,
  planDetail,
  dialogForError,
} from "Utilities";
import Fallback from "Utilities/fallback/fallback";

import "Styles/Pages/streakList.scss";
import "index.scss";

import {
  streakListTableHeadings,
  streakListTableHeadings2,
  plansFeatures,
} from "Constants/index";

interface StreakInterace {
  _id: string;
  title: string;
  dateFrom: string;
  dateTo: string;
  days: string;
  description: string;
  userId: string;
  __v: number;
  rewards: [];
  tag?: string;
}

interface RewardInterface {
  rewardEarned: boolean;
  _id: string;
  userId: string;
  title: string;
  streakId: string;
  date: string;
  __v: number;
}

function StreakList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //STATES
  const [tabData, setTabData] = useState([...streakTabData()]);
  const [tabDataClone, setTabDataClone] = useState([...streakTabData()]);
  const [currentTab, setCurrentTab] = useState("Running");
  const [tableData, setTableData] = useState<any>([]);
  const [streaks, setStreaks] = useState<StreakInterace[]>([]);
  const [running, setRunning] = useState<StreakInterace[]>([]);
  const [upcoming, setUpcoming] = useState<StreakInterace[]>([]);
  const [finished, setFinished] = useState<StreakInterace[]>([]);
  const [unfinished, setUnfinished] = useState<StreakInterace[]>([]);
  const [planType, setPlanType] = useState<string>("");

  const {
    data: streaksData,
    isFetching: streakListIsFetching,
    refetch,
  } = useGetStreaksQuery({});

  const [updateStreak, { isLoading: updateStreakLoading }] =
    useUpdateStreakMutation();

  const [deleteStreak, { isLoading: deleteStreakLoading }] =
    useDeleteStreakMutation();

  const [deleteStreakAndReward, { isLoading: deleteStreakAndRewardLoading }] =
    useDeleteStreakAndRewardMutation();

  //Getting the data from the state
  const streakListTypeData = useSelector((state: any) => state.streakListType);
  const authData = useSelector((state: any) => state.authDataStore);

  const searchText = useSelector((state: any) => state.searchText);

  //FUNCTIONS
  const tabDataFun = useCallback(() => {
    return [...tabDataClone].map((tab) => {
      if (tab.title === streakListTypeData) tab.active = true;
      else tab.active = false;

      return tab;
    });
  }, [streakListTypeData, tabDataClone]);

  const runningStreaks = () => {
    const currentDate = moment().format();
    return [...streaks].filter((streak: StreakInterace) => {
      if (
        isSameOrBefore(streak.dateFrom, currentDate) &&
        isSameOrAfter(streak.dateTo, currentDate) &&
        !streak.tag
      ) {
        return streak;
      } else return null;
    });
  };

  const upcomingStreak = () => {
    const currentDate = moment().format();
    return [...streaks].filter((streak: StreakInterace) => {
      if (isAfter(streak.dateFrom, currentDate) && !streak.tag) {
        return streak;
      } else return null;
    });
  };

  //WHEN STREAK TEXT IS CHANGED
  useEffect(() => {
    if (searchText === "") {
      setStreaks(streaksData);

      const tabDataModified = tabDataFun();
      setTabData(tabDataModified);
    } else {
      const streaks = [...streaksData];
      const filterStreaks = streaks.filter((streak: StreakInterace) =>
        streak.title.toLowerCase().includes(searchText.toLowerCase())
      );

      setStreaks(filterStreaks);

      setTabData([
        {
          title: "Searched items",
          count: 0,
          active: true,
        },
      ]);
    }
  }, [searchText]);

  useEffect(() => {
    if (planType === "prime") {
      setStreaks([...streaksData]);
    } else {
      let limitedData = [...streaksData].splice(
        0,
        plansFeatures["free"].streaks
      );
      setStreaks([...limitedData]);
    }
  }, [planType, streaksData]);

  useEffect(() => {
    if (authData) setPlanType(planDetail(authData?.planType));
  }, [authData]);

  useEffect(() => {
    dispatch(storeSearchText(""));

    setCurrentTab(streakListTypeData);
    const data = tabDataFun();
    setTabData([...data]);

    if (location.state && location.state.goTo) {
      setCurrentTab(location.state.goTo);
      let tab: any = null;
      if (location.state.goTo === "Finished") {
        dispatch(storeStreakListType("Finished"));
        tab = activeTab("Finished");
      }
      if (location.state.goTo === "Unfinished") {
        dispatch(storeStreakListType("Unfinished"));
        tab = activeTab("Unfinished");
      }
      setTabData([...tab]);
      setTabDataClone([...tab]);
    }
  }, []);

  useEffect(() => {
    if (searchText === "") {
      const unfinished = streaks.filter(
        (streak: StreakInterace) => streak.tag === "unfinished"
      );
      const finished = streaks.filter(
        (streak: StreakInterace) => streak.tag === "finished"
      );

      const running: StreakInterace[] = runningStreaks();
      const upcoming: StreakInterace[] = upcomingStreak();

      setRunning([...running]);
      setUpcoming([...upcoming]);
      setFinished([...finished]);
      setUnfinished([...unfinished]);

      const dataOfTabs = [...tabDataClone];
      dataOfTabs[0].count = running.length;
      dataOfTabs[1].count = upcoming.length;
      dataOfTabs[2].count = finished.length;
      dataOfTabs[3].count = unfinished.length;

      setTabData([...dataOfTabs]);

      let tabData: StreakInterace[] = [];
      switch (currentTab) {
        case "Running":
          tabData = [...running];
          break;
        case "Upcoming":
          tabData = [...upcoming];
          break;
        case "Finished":
          tabData = [...finished];
          break;
        case "Unfinished":
          tabData = [...unfinished];
          break;
        default:
          break;
      }

      updateTableData(false, streaks, tabData);
    } else {
      updateTableData(true, [], []);
    }
  }, [streaks]);

  useEffect(() => {
    if (searchText === "") updateTableData(false, [], []);
    else updateTableData(true, [], []);
  }, [searchText]);

  const modifyStreaks = (streaks: StreakInterace[]) => {
    const streakData = cloneDeep(streaks);
    const currentDate = moment().format();

    const modified = streakData.map((streak: StreakInterace) => {
      let status = "";
      if (isAfter(streak.dateFrom, currentDate) && !streak.tag)
        status = "Upcoming";
      const totalRewardsCount = streak.rewards.length;
      const rewardEarned = streak.rewards.filter(
        (reward: RewardInterface) => reward.rewardEarned
      ).length;
      let streakObj: any = {};
      streakObj._id = streak._id;
      streakObj.title = streak.title;
      streakObj.startDate = moment(streak.dateFrom).format("L");
      streakObj.endDate = moment(streak.dateTo).format("L");
      streakObj.running =
        status === "Upcoming"
          ? "--"
          : streak.tag === "unfinished"
          ? "DROPPED"
          : streak.tag === "finished"
          ? "--"
          : `${streak.days} days`;
      streakObj.reward = `${rewardEarned}/${totalRewardsCount}`;
      streakObj.description = streak.description;

      //We don't want to show rewards in unfinished and finished tab
      if (streak.tag === "unfinished" || streak.tag === "finished")
        delete streakObj.reward;

      return streakObj;
    });

    return modified;
  };

  const updateTableData = (
    searchData = false,
    streaksArr = streaks,
    tabData: StreakInterace[]
  ) => {
    let selectedData = [];
    if (searchData) {
      selectedData = [...streaksArr];
    } else {
      if (currentTab === "Running") selectedData = [...tabData];
      else if (currentTab === "Upcoming") selectedData = [...tabData];
      else if (currentTab === "Unfinished") selectedData = [...tabData];
      else selectedData = [...tabData];
    }

    const modifiedData = modifyStreaks([...selectedData]);
    setTableData([...modifiedData]);
  };

  /**
   *
   * @param {Object} e - event
   * @param {String} id - Id of streak to delete
   */
  const deleteStreakVal = (streak: StreakInterace) => {
    dialogBeforDeletng(streak, "streak", async (type, id) => {
      if (type === "delete") {
        const deleteStereakResponse: any = await deleteStreak(id);
        if (deleteStereakResponse?.error) {
          dialogForError(
            deleteStereakResponse?.error?.data?.error?.message || ""
          );
        }
      } else if (type === "specialDelete") {
        const deleteStereakAndRewardResponse: any = await deleteStreakAndReward(
          id
        );
        if (deleteStereakAndRewardResponse?.error) {
          dialogForError(
            deleteStereakAndRewardResponse?.error?.data?.error?.message || ""
          );
        }
      }
      refetch && refetch();
    });
  };

  /**
   *
   * @param {Object} streak - data we want to update
   */
  const updateStreakData = (streak: StreakInterace) => {
    dialogForCreateAndUpdateStreak(
      "update",
      streak,
      streak._id,
      async (type: string, data: object) => {
        const updatedStreak: any = await updateStreak({
          updatedVal: data,
          streakId: streak._id,
        });

        if (updatedStreak?.error) {
          dialogForError(updatedStreak?.error?.data?.error?.message || "");
        } else {
          refetch && refetch();
        }
      }
    );
  };

  const cloneStreak = (streak: StreakInterace) => {
    dialogForCreateAndUpdateStreak("clone", streak, streak._id, () => {
      refetch && refetch();
    });
  };

  const statusFun = (currentTab: string) => {
    switch (currentTab) {
      case "Running":
        return "Active";
      case "Upcoming":
        return "Upcoming";
      case "Finished":
        return "Finished";
      case "Unfinished":
        return "Dropped";
      default:
        break;
    }
  };

  /**
   *
   * @param {Object} actionObj
   */
  const tableAction = (actionObj: any) => {
    if (actionObj.actionType === "tabClicked") {
      dispatch(storeStreakListType(actionObj.data));
      if (actionObj.data === "Running") {
        const tab = activeTab("Running", tabDataClone);
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...running]);
        setTableData([...modifiedData]);
        setCurrentTab("Running");
      } else if (actionObj.data === "Upcoming") {
        const tab = activeTab("Upcoming", tabDataClone);
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...upcoming]);
        setTableData([...modifiedData]);
        setCurrentTab("Upcoming");
      } else if (actionObj.data === "Finished") {
        const tab = activeTab("Finished", tabDataClone);
        setTabData([...tab]);

        const modifiedData = modifyStreaks([...finished]);
        setTableData([...modifiedData]);
        setCurrentTab("Finished");
      } else if (actionObj.data === "Unfinished") {
        const tab = activeTab("Unfinished", tabDataClone);

        setTabData([...tab]);

        const modifiedData = modifyStreaks([...unfinished]);
        setTableData([...modifiedData]);
        setCurrentTab("Unfinished");
      }
    } else if (actionObj.actionType === "deleteRow") {
      deleteStreakVal(actionObj.data);
    } else if (actionObj.actionType === "editRow") {
      updateStreakData(actionObj.data);
    } else if (actionObj.actionType === "cloneRow") {
      cloneStreak(actionObj.data);
    } else if (actionObj.actionType === "navigate") {
      if (currentTab !== "Unfinished") {
        navigate(`/streak/${actionObj.data._id}`, {
          state: { from: "Streak", status: statusFun(currentTab) },
        });
      }
    }
  };

  return (
    <Frame
      containerClass="container-streak-list"
      withHeader={true}
      headerTitle="Streaks"
      withSearchBox={true}
      updateData={() => {
        refetch && refetch();
      }}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        { streakListIsFetching || updateStreakLoading || deleteStreakLoading || deleteStreakAndRewardLoading ? (
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
        ) : (
          <div className="streak-list-inner-container">
            <Table
              tableHead={
                currentTab === "Finished" || currentTab === "Unfinished"
                  ? streakListTableHeadings2
                  : streakListTableHeadings
              }
              tabData={[...tabData]}
              tableData={[...tableData]}
              currentTab={currentTab}
              action={tableAction}
              type="Streak"
              // streaksCount={streaks.length}
            />
          </div>
        )}
      </ErrorBoundary>
    </Frame>
  );
}

export default StreakList;
