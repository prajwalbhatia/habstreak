import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import moment from "moment";
import { ErrorBoundary } from "react-error-boundary";

import { useGetStreaksQuery } from "../../Redux/Slices/streakSlice";
import {
  useGetRewardsQuery,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
} from "../../Redux/Slices/rewardSlice";
import useGetPlanType from "Hooks/useGetPlanType";

import Fallback from "Utilities/fallback/fallback";
import {
  dialogForCreateAndUpdateReward,
  errorHandler,
  dialogBeforeDeleting,
  progressFun,
  isBefore,
  isSameOrAfter,
  isSameOrBefore,
  isAfter,
  isSame,
  activeTab,
  rewardTabData,
  dialogForError,
} from "Utilities";

import Frame from "Components/frame/frame";
import Table from "Components/table/table";

import { rewardListTableHeadings, plansFeatures } from "Constants/index";

import "Styles/Pages/rewardsList.scss";
import "index.scss";

function RewardList() {
  const location = useLocation();

  const [tabData, setTabData] = useState([...rewardTabData()]);
  const [tabDataClone] = useState([...rewardTabData()]);

  const [tableData, setTableData] = useState<any>([]);
  const [currentTab, setCurrentTab] = useState("To Buy");
  const [rewards, setRewards] = useState<any>([]);

  const [rewardsEarned, setRewardsEarned] = useState<any>([]);
  const [rewardsToBuy, setRewardsToBuy] = useState<any>([]);
  const planType = useGetPlanType();

  const { data: streaks, refetch: streakListRefetch } = useGetStreaksQuery({});

  const {
    data: rewardsData,
    isFetching: rewardListIsFetching,
    refetch: rewardListRefetch,
  } = useGetRewardsQuery({});

  const [updateReward, { isLoading: updateRewardLoading }] =
    useUpdateRewardMutation();

  const [deleteReward, { isLoading: deleteRewardLoading }] =
    useDeleteRewardMutation();

  const searchText = "";

  const tabDataFun = () => {
    return [...tabDataClone].map((tab) => {
      if (tab.title === currentTab) tab.active = true;
      else tab.active = false;

      return tab;
    });
  };

  useEffect(() => {
    if (location.state && location.state.goTo) {
      setCurrentTab(location.state.goTo);

      if (location.state.goTo === "Earned") {
        const tab = activeTab("Earned", [...tabData]);
        setTabData([...tab]);
      }
    }
  }, []);

  useEffect(() => {
    if (planType && rewardsData) {
      if (planType === "prime") {
        setRewards([...rewardsData]);
      } else {
        let limitedData = [...rewardsData].splice(
          0,
          plansFeatures["free"].rewards
        );
        setRewards([...limitedData]);
      }
    }
  }, [rewardsData, planType]);

  useEffect(() => {
    if (searchText === "") {
      setRewards(rewardsData);
      const tabDataModified = tabDataFun();
      setTabData(tabDataModified);
    } else {
      const rewards = [...rewardsData];
      const filterRewards = rewards.filter((reward: any) =>
        reward.title.toLowerCase().includes(searchText)
      );

      setRewards(filterRewards);

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
    if (searchText === "") {
      const earned: any = [];
      const toBuy: any = [];

      [...rewards].forEach((reward) => {
        if (!reward.rewardEarned) toBuy.push(reward);
        else earned.push(reward);
      });

      setRewardsEarned([...earned]);
      setRewardsToBuy([...toBuy]);

      const dataOfTabs = [...tabData];
      dataOfTabs[0].count = toBuy.length;
      dataOfTabs[1].count = earned.length;
      setTabData([...dataOfTabs]);

      let tabDataVal: any = [];
      switch (currentTab) {
        case "To Buy":
          tabDataVal = [...toBuy];
          break;
        case "Earned":
          tabDataVal = [...earned];
          break;
        default:
          break;
      }

      updateTableData(false, rewards, tabDataVal);
    } else {
      updateTableData(true, rewards);
    }
  }, [rewards]);

  useEffect(() => {
    if (searchText === "") updateTableData(false);
    else updateTableData(true);
  }, [tabData]);

  const streakState = (streak: any) => {
    const currentDate = moment().format();
    const streakEndDate = moment(streak.dateTo).format();

    if (streak.tag === "unfinished") {
      return "Unfinished";
    } else if (isBefore(streakEndDate, currentDate) && !streak.tag) {
      return "Finished";
    } else if (
      isSameOrBefore(streak.dateFrom, currentDate) &&
      isSameOrAfter(streak.dateTo, currentDate) &&
      !streak.tag
    ) {
      return "Active";
    } else if (isAfter(streak.dateFrom, currentDate) && !streak.tag) {
      return "Upcoming";
    }
  };

  const modifyReward = (rewards: any) => {
    const rewardData = [...rewards];

    const modified = rewardData.map((reward) => {
      const streakAssociated = streaks.filter(
        (streak: any) => streak._id === reward.streakId
      );
      if (streakAssociated[0]) {
        const rewardDate = moment(reward.date);
        const streakStartDate = moment(streakAssociated[0].dateFrom);
        const currentDate = moment().startOf("day").toString();
        let daysLeft = Math.ceil(rewardDate.diff(currentDate, "days", true));

        if (daysLeft < 0) daysLeft = 0;

        const progress = isSame(streakStartDate, currentDate)
          ? 0
          : progressFun(streakStartDate, rewardDate, daysLeft);

        let rewardObj: any = {};
        rewardObj._id = reward._id;
        rewardObj.title = reward.title;
        rewardObj.associated =
          streakAssociated.length > 0 &&
          ({
            title: streakAssociated[0].title,
            id: streakAssociated[0]._id,
            state: streakState(streakAssociated[0]),
          } ||
            "");
        rewardObj.date = moment(reward.date).format("L");
        rewardObj.running =
          moment(streakAssociated[0].dateFrom).format() >
          moment(currentDate).format()
            ? "-"
            : daysLeft;
        rewardObj.reward =
          streakAssociated.rewards && `${streakAssociated?.rewards.length}`;
        rewardObj.progress =
          moment(streakAssociated[0].dateFrom).format() >
          moment(currentDate).format()
            ? "-"
            : `${progress.toFixed(2)}%`;
        rewardObj.streak = streakAssociated.length > 0 && streakAssociated[0];

        return rewardObj;
      } else {
        let rewardObj: any = {};
        rewardObj._id = reward._id;
        rewardObj.title = reward.title;
        rewardObj.associated = "-";
        rewardObj.date = moment(reward.date).format("L");
        rewardObj.running = "-";
        rewardObj.reward = "-";
        rewardObj.progress = "-";
        rewardObj.streak = "-";

        return rewardObj;
      }
    });

    return modified.filter((item) => item);
  };

  const updateTableData = (
    searchData = false,
    rewardsArr = rewards,
    tabData = rewardsToBuy
  ) => {
    let selectedData: any = [];

    if (searchData) {
      selectedData = [...rewardsArr];
    } else {
      if (currentTab === "To Buy") selectedData = [...tabData];
      else if (currentTab === "Earned") selectedData = [...tabData];
    }
    const modifiedData: any = modifyReward([...selectedData]);
    setTableData([...modifiedData]);
  };

  const deleteRewardFun = (reward: any) => {
    dialogBeforeDeleting(reward, "reward", async (data, id) => {
      try {
        const deleteRewardResponse: any = await deleteReward(id);
        if (deleteRewardResponse?.error) {
          dialogForError(
            deleteRewardResponse?.error?.data?.error?.message || ""
          );
        } else {
          rewardListRefetch && rewardListRefetch();
        }
      } catch (error) {
        //
      }
    });
  };

  const tableAction = (actionObj: any) => {
    if (actionObj.actionType === "tabClicked") {
      if (actionObj.data === "To Buy") {
        const tab = activeTab("To Buy", [...tabData]);
        setTabData([...tab]);
        const modifiedData = modifyReward([...rewardsToBuy]);
        setTableData([...modifiedData]);
        setCurrentTab("To Buy");
      } else if (actionObj.data === "Earned") {
        const tab = activeTab("Earned", [...tabData]);
        setTabData([...tab]);

        const modifiedData = modifyReward([...rewardsEarned]);
        setTableData([...modifiedData]);
        setCurrentTab("Earned");
      }
    } else if (actionObj.actionType === "deleteRow") {
      deleteRewardFun(actionObj.data);
    } else if (actionObj.actionType === "editRow") {
      const filterStreak = [...streaks].filter(
        (streak) => streak.tag !== "unfinished"
      );

      dialogForCreateAndUpdateReward(
        "update",
        actionObj.data,
        actionObj.data._id,
        filterStreak,
        async (type: string, data: object) => {
          if (type === "update") {
            try {
              const updateRewardData: any = await updateReward(data);
              if (updateRewardData?.error) {
                dialogForError(
                  updateRewardData?.error?.data?.error?.message || ""
                );
              }
            } catch (error) {
              //
            }
          }
          return;
        }
      );
    } else if (actionObj.actionType === "navigate") {
    }
  };

  return (
    <Frame
      withHeader={true}
      withSearchBox={true}
      headerTitle="Rewards"
      containerClass="rewards"
      updateData={() => {
        if (streakListRefetch && rewardListRefetch) {
          streakListRefetch();
          rewardListRefetch();
        }
      }}
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <div className="rewards-area">
          <Table
            tableHead={rewardListTableHeadings}
            tabData={[...tabData]}
            tableData={[...tableData]}
            action={tableAction}
            type="Reward"
            loading={
              rewardListIsFetching || updateRewardLoading || deleteRewardLoading
            }
          />
        </div>
      </ErrorBoundary>
    </Frame>
  );
}

export default RewardList;
