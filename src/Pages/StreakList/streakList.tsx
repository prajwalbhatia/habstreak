import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import { ErrorBoundary } from "react-error-boundary";
import { io } from "socket.io-client";

import Frame from "Components/frame/frame";
import Table from "Components/table/table";

import {
  errorHandler,
  dialogForCreateAndUpdateStreak,
  dialogBeforeDeleting,
  isAfter,
  streakTabData,
  activeTab,
  isMoreThanAMinute,
} from "Utilities";
import Fallback from "Utilities/fallback/fallback";

import {
  streakListTableHeadings,
  streakListTableHeadings2,
  plansFeatures,
  urls,
} from "Constants/index";
import {
  RewardInterface,
  StreakListInterface,
} from "./constants/StreakList.interfaces";
import {
  finishedStreaks,
  runningStreaks,
  unfinishedStreaks,
  upcomingStreaks,
} from "./helpers/StreakList.renderers";

import {
  useGetStreaksQuery,
  useUpdateStreakMutation,
  useDeleteStreakMutation,
  useDeleteStreakAndRewardMutation,
} from "../../Redux/Slices/streakSlice";
import { storeStreakListType } from "../../Redux/Slices/streakListTypeSlice";
import { storeSearchText } from "../../Redux/Slices/searchTextSlice";
import useGetPlanType from "Hooks/useGetPlanType";
import useSnackBar from "Hooks/useSnackBar";
import useAddStreak from "Hooks/useAddStreak";

import "Styles/Pages/streakList.scss";
import "index.scss";

const mode = process.env.REACT_APP_API_MODE;
// @ts-ignore
const BASE_URL = urls[mode];

function StreakList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { SnackbarComponent, showSnackBar } = useSnackBar();

  const {
    addStreak,
    cloneStreak,
    createStreakLoading: streakAddLoading,
    streaks: streakList,
    getStreaksLoading: streakListLoading,
    getStreaksFetching: streakListFetching,
    SnackbarComponent: AddStreakSnackBarComponent,
  } = useAddStreak();

  const planType = useGetPlanType();

  //STATES
  const [tabData, setTabData] = useState([...streakTabData()]);
  const [tabDataClone, setTabDataClone] = useState([...streakTabData()]);
  const [currentTab, setCurrentTab] = useState("Running");
  const [tableData, setTableData] = useState<any>([]);
  const [streaks, setStreaks] = useState<StreakListInterface[]>([]);
  const [running, setRunning] = useState<StreakListInterface[]>([]);
  const [upcoming, setUpcoming] = useState<StreakListInterface[]>([]);
  const [finished, setFinished] = useState<StreakListInterface[]>([]);
  const [unfinished, setUnfinished] = useState<StreakListInterface[]>([]);

  const {
    data: streaksData,
    isFetching: streakListIsFetching,
    refetch,
    startedTimeStamp,
  } = useGetStreaksQuery({});

  const [updateStreak, { isLoading: updateStreakLoading }] =
    useUpdateStreakMutation();

  const [deleteStreak, { isLoading: deleteStreakLoading }] =
    useDeleteStreakMutation();

  const [deleteStreakAndReward, { isLoading: deleteStreakAndRewardLoading }] =
    useDeleteStreakAndRewardMutation();

  //Getting the data from the state
  const streakListTypeData = useSelector((state: any) => state.streakListType);
  const searchText = useSelector((state: any) => state.searchText);

  const tabDataFun = useCallback(() => {
    return [...tabDataClone].map((tab) => {
      if (tab.title === streakListTypeData) tab.active = true;
      else tab.active = false;

      return tab;
    });
  }, [streakListTypeData, tabDataClone]);

  /* @ts-ignore */
  useEffect(() => {
    const val = sessionStorage.getItem("streakRefetch");
    if (refetch && !val) {
      refetch();
      sessionStorage.setItem("streakRefetch", "true");
    }

    const socket = io(BASE_URL);

    socket.on("data-update", (data) => {
      dispatch({
        type: "streak/invalidateTags",
        payload: ["GetStreaks"],
      });

      dispatch({
        type: "reward/invalidateTags",
        payload: ["GetRewards"],
      });
    });

    // Cleanup function to disconnect on component unmount
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (startedTimeStamp && isMoreThanAMinute(startedTimeStamp) && refetch)
      refetch();
  }, [startedTimeStamp]);

  //WHEN STREAK TEXT IS CHANGED
  useEffect(() => {
    if (searchText === "") {
      setStreaks(streaksData);

      const tabDataModified = tabDataFun();
      setTabData(tabDataModified);
    } else {
      const streaks = [...streaksData];
      const filterStreaks = streaks.filter((streak: StreakListInterface) =>
        streak.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setStreaks(filterStreaks);

      setTabData([
        {
          title: "Searched items",
          count: filterStreaks.length,
          active: true,
        },
      ]);
    }
  }, [searchText]);

  useEffect(() => {
    if (planType === "prime" && streaksData) {
      setStreaks([...streaksData]);
    } else {
      let limitedData =
        (streaksData &&
          [...streaksData]?.splice(0, plansFeatures["free"].streaks)) ||
        [];
      setStreaks(limitedData || []);
    }
  }, [planType, streaksData]);

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
      const unfinished: StreakListInterface[] = unfinishedStreaks(streaks);
      const finished: StreakListInterface[] = finishedStreaks(streaks);
      const running: StreakListInterface[] = runningStreaks(streaks);
      const upcoming: StreakListInterface[] = upcomingStreaks(streaks);

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

      let tabData: StreakListInterface[] = [];
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
    }
  }, [streaks]);

  useEffect(() => {
    if (searchText?.length) updateTableData(true, streaks, tabData);
  }, [searchText, tabData]);

  const modifyStreaks = (streaks: StreakListInterface[]) => {
    const streakData = cloneDeep(streaks);
    const currentDate = moment().format();

    const modified = streakData.map((streak: StreakListInterface) => {
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
    tabData: any
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
  const deleteStreakVal = (streak: StreakListInterface) => {
    dialogBeforeDeleting(streak, "streak", async (type, id) => {
      if (type === "delete") {
        try {
          const deleteStreakResponse: any = await deleteStreak(id);

          if (
            deleteStreakResponse?.data?.message ===
            "Streak deleted successfully"
          ) {
            showSnackBar("success", deleteStreakResponse?.data?.message);
          } else if (deleteStreakResponse?.error) {
            showSnackBar(
              "error",
              deleteStreakResponse?.error?.data?.error?.message ||
                "Error deleting streak"
            );
          }
        } catch (error) {}
      } else if (type === "specialDelete") {
        try {
          const deleteStreakAndRewardResponse: any =
            await deleteStreakAndReward(id);
          if (
            deleteStreakAndRewardResponse?.data?.message ===
            "Streak deleted successfully"
          ) {
            showSnackBar(
              "success",
              deleteStreakAndRewardResponse?.data?.message
            );
          } else if (deleteStreakAndRewardResponse?.error) {
            showSnackBar(
              "error",
              deleteStreakAndRewardResponse?.error?.data?.error?.message || ""
            );
          }
        } catch (error) {}
      }
      refetch && refetch();
    });
  };

  /**
   *
   * @param {Object} streak - data we want to update
   */
  const updateStreakData = (streak: StreakListInterface) => {
    dialogForCreateAndUpdateStreak(
      "update",
      streak,
      streak._id,
      async (type: string, data: object) => {
        try {
          const updatedStreak: any = await updateStreak({
            updatedVal: data,
            streakId: streak._id,
          });

          if (updatedStreak?.error) {
            showSnackBar(
              "error",
              updatedStreak?.error?.data?.error?.message || ""
            );
          } else {
            showSnackBar("success", "Streak updated successfully");
          }
        } catch (error) {}
      }
    );
  };

  const cloneStreakFun = (streak: StreakListInterface) => {
    cloneStreak(streak, streak._id);
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
      cloneStreakFun(actionObj.data);
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
            loading={
              streakListIsFetching ||
              updateStreakLoading ||
              deleteStreakLoading ||
              deleteStreakAndRewardLoading
            }
          />
        </div>
      </ErrorBoundary>
      {SnackbarComponent}
      {AddStreakSnackBarComponent}
    </Frame>
  );
}

export default StreakList;
