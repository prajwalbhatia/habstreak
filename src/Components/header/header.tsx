import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";

import { ReactComponent as Logo } from "Assets/Images/Logo.svg";

import Search from "Components/search/search";
import { OutlinedPrimaryButton } from "Components/buttons/buttons";
import { IconButton } from "Components/buttons/buttons";

import { activityTitle, dialogForError } from "Utilities";

import { useGetRecentActivitiesQuery } from "../../Redux/Slices/recentActivitiesSlice";
import { storeSearchText } from "../../Redux/Slices/searchTextSlice";

import "Styles/Components/header.scss";
import {
  ActivityInterface,
  HeaderProps,
} from "Components/Interfaces/interfaces";
import useLogout from "Hooks/useLogout";
import useGetUserData from "Hooks/useGetUserData";
import useAddStreak from "Hooks/useAddStreak";
import useAddReward from "Hooks/useAddReward";

declare var window: any;

const Header: React.FC<HeaderProps> = ({
  headerText,
  withSearchBox,
  withInternalNavigation,
  internalNavigation,
  withDate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    addStreak,
    createStreakLoading: streakAddLoading,
    streaks,
    getStreaksLoading: streakListLoading,
    getStreaksFetching: streakListFetching,
    SnackbarComponent
  } = useAddStreak();


  const { data: activities, isLoading: recentActivitiesListLoading } =
    useGetRecentActivitiesQuery({});

  const { addReward, rewards, rewardListLoading , SnackbarComponent : SnackBarComponentReward } = useAddReward();

  const [showListing, setShowListing] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { user } = useGetUserData();

  const { logUserOut, logoutError, logoutLoading } = useLogout(
    user?.refreshToken
  );

  const notification = () => {
    setShowNotification(!showNotification);
  };

  const goToActivities = () => {
    navigate({
      pathname: "/recent-activities",
    });
  };

  const handleLogout = async () => {
    try {
      await logUserOut();
    } catch (error) {}
  };

  const handlePrimaryButtonClick = () => {
    if (headerText === "Rewards") {
      addReward();
    } else {
      addStreak();
    }
  };

  const getActivities = useCallback(() => {
    return activities.map((activity: ActivityInterface, index: number) => {
      if (index < 3) {
        return (
          <div className="d-flex" key={index}>
            <li>{activityTitle(activity.type, activity.title, "dashboard")}</li>
          </div>
        );
      }
    });
  }, [activities]);

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
                <li onClick={() => handleLogout()} className="c-pointer">
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
        {headerText ? (
          <h1 className="heading">{headerText}</h1>
        ) : (
          <Skeleton variant="text" sx={{ minWidth: 200, minHeight: 40 }} />
        )}

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
                <ol className="flex-auto">{getActivities()}</ol>
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
          click={handlePrimaryButtonClick}
          btnContainerClass=""
          btnClass="h-40"
          loading={streakAddLoading || rewardListLoading}
        />
      </div>
      {SnackbarComponent}
      {SnackBarComponentReward}
    </header>
  );
};

export default React.memo(Header);
