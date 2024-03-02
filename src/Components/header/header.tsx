import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

import "Styles/Components/header.scss";

import { ReactComponent as Logo } from "Assests/Images/Logo.svg";

import Search from "Components/search/search";
import { OutlinedPrimaryButton } from "Components/buttons/buttons";
import { IconButton } from "Components/buttons/buttons";

import {
  dialogForCreateAndUpdateStreak,
  dialogForCreateAndUpdateReward,
  dialogForUpgrade,
  dialogForMessage,
  activityTitle,
  planDetail,
  sendEventToMobile,
  isSame,
} from "Utilities";

import { plansFeatures } from "Constants/index";

import { useLogoutMutation } from "../../Redux/Slices/accountSlice";
import {
  useGetStreaksQuery,
  useCreateStreakMutation,
} from "../../Redux/Slices/streakSlice";

import {
  useCreateRewardMutation,
  useGetRewardsQuery,
} from "../../Redux/Slices/rewardSlice";
import { useGetRecentActivitiesQuery } from "../../Redux/Slices/recentActivitiesSlice";
import { storeSearchText } from "../../Redux/Slices/searchTextSlice";
import { noop } from "lodash";
import { useCreateStreakDetailMutation } from "../../Redux/Slices/streakDetailSlices";
import store from "../../Redux/Store/store";
import { clearResults } from "../../Redux/Slices/clearPersistSlice";

declare var window: any;

interface ActivityInterface {
  _id: string;
  userId: string;
  type: string;
  title: string;
  date: string;
  __v: number;
}

// interface logoutDataInterface {
//   data : {
//     message : string
//   }
// }

interface HeaderProps {
  headerText: string;
  withSearchBox: boolean;
  withInternalNavigation: boolean;
  internalNavigation: boolean;
  withDate: boolean;
  updateData: () => {};
}

const Header: React.FC<HeaderProps> = ({
  headerText,
  withSearchBox,
  withInternalNavigation,
  internalNavigation,
  withDate,
  updateData = noop,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    logout,
    // , { error: logoutError }
  ] = useLogoutMutation();

  const authData = useSelector((state: any) => state.authDataStore);

  const {
    data: streaks,
    isLoading: streakListLoading,
    refetch,
  } = useGetStreaksQuery({});

  const { data: rewards, isLoading: rewardListLoading } = useGetRewardsQuery(
    {}
  );

  const { data: activities, isLoading: recentActivitiesListLoading } =
    useGetRecentActivitiesQuery({});

  const [
    createStreak,
    // , { error: createStreakError }
    { isSuccess: createStreakSuccess },
  ] = useCreateStreakMutation();

  const [
    createStreakDetail,
    // , { error: createStreakError }
    { isSuccess: createStreakDetsilSuccess },
  ] = useCreateStreakDetailMutation();

  const [
    createReward,
    // , { error: createStreakError }
    { isSuccess: createRewardSuccess },
  ] = useCreateRewardMutation();

  const [showListing, setShowListing] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [user] = useState(() => {
    const localData = localStorage.getItem("profile");
    if (localData) {
      return JSON.parse(localData);
    } else {
      return "";
    }
  });
  const [streakCount, setStreakCount] = useState<number>(0);
  const [rewardCount, setRewardCount] = useState<number>(0);
  const [planType, setPlanType] = useState<string>("free");

  const notification = () => {
    setShowNotification(!showNotification);
  };

  const goToActivities = () => {
    navigate({
      pathname: "/recent-activities",
    });
  };

  const logoutFun = async (navigate: any, refreshToken: string) => {
    const logoutData: any = await logout({ refreshToken });

    if (logoutData?.data?.message === "You logged out successfully") {
      localStorage.clear();
      store.dispatch(clearResults());

      if (window.ReactNativeWebView) {
        navigate("/");
      } else {
        navigate("/");
      }

      if (window.ReactNativeWebView) sendEventToMobile("loggedOut");
    }
  };

  useEffect(() => {
    if (createStreakSuccess) updateData("streak");
    else if (createRewardSuccess) updateData("reward");
  }, [createStreakSuccess, createRewardSuccess]);

  useEffect(() => {
    if (streaks) setStreakCount(streaks?.length || 0);
  }, [streaks]);

  useEffect(() => {
    if (rewards) setRewardCount(rewards?.length || 0);
  }, [rewards]);

  useEffect(() => {
    if (authData) setPlanType(planDetail(authData?.planType));
  }, [authData]);

  return (
    <header className="header">
      <div className="d-flex justify-space-between small-screen-header">
        <div className="brand-name-container">
          <Logo />
        </div>

        <div className="list-container mt-20">
          {showListing ? (
            <i
              onClick={() => setShowListing(false)}
              className="demo-icon size-30-primary icon-close"
            />
          ) : (
            <i
              onClick={() => setShowListing(true)}
              className="demo-icon size-30-primary icon-menu"
            />
          )}

          {showListing && (
            <div className="menu-list">
              <div
                className="d-flex center-items profile-container c-pointer"
                onClick={() => {
                  navigate({
                    pathname: "/profile",
                  });
                }}
              >
                <div
                  className="profile d-flex center-items"
                  style={{
                    backgroundImage: `url(${user?.result?.imageUrl})`,
                  }}
                >
                  {!user?.result?.imageUrl && (
                    <span>{user?.result?.name[0]}</span>
                  )}
                </div>
                <h4 className="text-center" style={{ marginLeft: "10px" }}>
                  {user?.result?.name}
                </h4>
              </div>
              <ol className="d-flex flex-dir-col mt-20">
                <li onClick={goToActivities} className="c-pointer">
                  <i className="demo-icon icon-notifications c-pointer" />
                  Notification
                </li>
                <li
                  onClick={() => logoutFun(navigate, user?.refreshToken)}
                  className="c-pointer"
                >
                  <i className="demo-icon icon-logout " />
                  Logout
                </li>
              </ol>

              <span>
                Made with
                <i className="demo-icon icon-heart color-red" />
                by PRAJWAL BHATIA
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="header-text-container">
        <h1 className="heading">{headerText}</h1>
        {withInternalNavigation && (
          <div
            onClick={() => navigate(-1)}
            className="d-flex header-nav-container mt-10"
          >
            <i className="demo-icon icon-back" />
            <h5>{internalNavigation}</h5>
          </div>
        )}
        {withDate ? (
          <h5 className="date">{moment().format("dddd, Do MMMM YYYY")}</h5>
        ) : null}
      </div>

      <div className="d-flex header-btn-container">
        {withSearchBox ? (
          <Search
            data={(searchText: string) => {
              dispatch(storeSearchText(searchText));
            }}
            containerClass={"mr-30"}
          />
        ) : null}

        <div className="pos-relative">
          <IconButton
            click={notification}
            icon={<i className="demo-icon icon-notifications" />}
            btnContainerClass={"mr-30"}
          />

          {showNotification && (
            <div
              className="notification-dropdown-container d-flex flex-dir-col"
              style={{ height: "calc(4 * 4rem )" }}
            >
              {recentActivitiesListLoading ? (
                <ClipLoader size={20} />
              ) : (
                <ol className="flex-auto">
                  {activities.map(
                    (activity: ActivityInterface, index: number) => {
                      if (index < 3) {
                        return (
                          <div className="d-flex" key={index}>
                            <li>
                              {activityTitle(
                                activity.type,
                                activity.title,
                                "dashboard"
                              )}
                            </li>
                          </div>
                        );
                      }
                    }
                  )}
                </ol>
              )}
              <div className="d-flex center-items mb-10">
                <span
                  onClick={goToActivities}
                  className="color-primary c-pointer"
                >
                  See all
                </span>
              </div>
            </div>
          )}
        </div>

        <OutlinedPrimaryButton
          name={headerText === "Rewards" ? "Add New Reward" : "Add New Streak"}
          click={() => {
            const filterStreak = streaks.filter(
              (streak: any) => streak.tag !== "unfinished"
            );
            if (headerText === "Rewards") {
              if (streaks.length === 0) dialogForMessage(navigate);
              else {
                if (rewardCount < plansFeatures[planType].rewards)
                  dialogForCreateAndUpdateReward(
                    "create",
                    {},
                    "",
                    filterStreak,
                    (type: string, data: object) => {
                      if (type === "create") {
                        createReward(data);
                      }
                      return;
                    }
                  );
                else dialogForUpgrade(navigate);
              }
            } else {
              if (streakCount < plansFeatures[planType].streaks)
                dialogForCreateAndUpdateStreak(
                  "create",
                  {},
                  "",
                  async (type: string, data: object) => {
                    if (type === "create") {
                      try {
                        const streak: any = await createStreak(data);
                        if (isSame(streak?.data?.dateFrom, Date.now())) {
                          const streadDetail = {
                            date: streak?.data?.dateFrom,
                            streakId: streak?.data._id,
                            rewards: [],
                          };

                          try {
                            await createStreakDetail(streadDetail);
                          } catch (error) {}
                        }
                      } catch (error) {}
                      updateData();
                    }
                    return;
                  }
                );
              else dialogForUpgrade(navigate);
            }
          }}
          btnContainerClass=""
          btnClass="h-40"
          loading={streakListLoading || rewardListLoading}
        />
      </div>
    </header>
  );
};

export default React.memo(Header);
