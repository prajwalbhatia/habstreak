import React, { useEffect, useState } from "react";
import { clone, groupBy } from "lodash";
import moment from "moment";
import { Skeleton } from "@mui/material";
import map from "lodash/map";
import size from "lodash/size";
import { useNavigate } from "react-router-dom";

import { ActivityInterface } from "../constants/dashboard.interfaces";

import { theme } from "Constants";
import { activityTitle } from "Utilities";
import { navigateToRecentActivities } from "../helpers/dashboard.helpers";

import { useGetRecentActivitiesQuery } from "../../../Redux/Slices/recentActivitiesSlice";

const Activities : React.FC<{refetchVal : boolean}> = ({ refetchVal }) => {
  const navigate = useNavigate();
  const [groupedActivities, setGroupedActivities] = useState({});

  const {
    data: recentActivitiesList,
    isFetching: recentActivitiesListFetching,
    refetch: activitiesRefetch,
  } = useGetRecentActivitiesQuery({});

  useEffect(() => {
    if (refetchVal) {
      activitiesRefetch();
    }
  }, [refetchVal]);

  useEffect(() => {
    if (recentActivitiesList && recentActivitiesList.length) {
      let activitiesClone: ActivityInterface[] = [...recentActivitiesList];
      const modifiedActivities = activitiesClone.map(
        (activityData: ActivityInterface) => {
          let activity = clone(activityData);
          const dateFromApi = activity.date;
          const modifiedDate = moment(dateFromApi).format("ll");
          const modifiedTime = moment(dateFromApi).format("LT");
          if (activity.date) delete activity.date;
          activity.date = modifiedDate;
          activity.time = modifiedTime;
          return activity;
        }
      );
      const groupedByDate = groupBy(modifiedActivities, "date");
      const currentDate = moment(moment().format()).format("ll");
      if (groupedByDate[currentDate]) {
        setGroupedActivities({ [currentDate]: groupedByDate[currentDate] });
      } else setGroupedActivities({});
    }
  }, [recentActivitiesList]);

  const recentActivityCardJsx = () => {
    const isEmpty = size(groupedActivities) === 0;
    if (!isEmpty) {
      return map(groupedActivities, (value, key) => {
        return (
          <div key={key} className="date-data">
            <span className="date-content">{key}</span>
            {map(value, (val: ActivityInterface, index) => {
              return (
                <div key={index} className="info-container">
                  {recentActivitiesListFetching ? (
                    <Skeleton
                      variant="text"
                      sx={{ minWidth: 80, minHeight: 10 }}
                    />
                  ) : (
                    <h3 className="time">{val.time}</h3>
                  )}
                  <div
                    className="hr-line"
                    style={{ background: theme[Math.ceil(Math.random() * 10)] }}
                  ></div>
                  <div className="flex-dir-col action-info">
                    {recentActivitiesListFetching ? (
                      <Skeleton
                        variant="text"
                        sx={{ minWidth: 80, minHeight: 20 }}
                      />
                    ) : (
                      <span className="name">{val.title}</span>
                    )}

                    {recentActivitiesListFetching ? (
                      <Skeleton
                        variant="text"
                        sx={{ minWidth: 80, minHeight: 20 }}
                      />
                    ) : (
                      <span className="action">{`Action: ${activityTitle(
                        val.type,
                        "",
                        "dashboard"
                      )}`}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    } else {
      return (
        <div className="d-flex center-items h-100">
          <h3>No Latest data</h3>
        </div>
      );
    }
  };

  return (
    <>
      <div className="d-flex flex-auto flex-dir-col">
        <h3 className="right-container-title">Calendar</h3>
        {recentActivityCardJsx()}
      </div>

      <div
        className="see-all-container center-items mt-50"
        onClick={() => navigateToRecentActivities(navigate)}
      >
        <span className="see-all">SEE ALL</span>
        <span className="see-all-btn center-items">
          <i className="demo-icon icon-going-in" />
        </span>
      </div>
    </>
  );
};

export default Activities;
