import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import size from "lodash/size";

import Frame from "Components/frame/frame";
import Fallback from "Utilities/fallback/fallback";
import { errorHandler, dialogForUpgrade } from "Utilities";
import { activityTitle, iconType } from "./helpers/RecentActivities.renderers";

import { useGetRecentActivitiesQuery } from "../../Redux/Slices/recentActivitiesSlice";
import useGetPlanType from "Hooks/useGetPlanType";

import "index.scss";
import "Styles/Pages/recentActivities.scss";
import { Skeleton } from "@mui/material";

function RecentActivities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groupedActivities, setGroupedActivities] = useState({});
  const planType = useGetPlanType();

  const {
    data: activities,
    isFetching: activitiesFetching,
    isLoading: activitiesLoading,
  } = useGetRecentActivitiesQuery({}, { skip: planType !== "prime" });

  useEffect(() => {
    if (planType === "free") {
      dialogForUpgrade(navigate);
    }
  }, [dispatch, navigate, planType]);

  useEffect(() => {
    if (activities && activities.length) {
      let activitiesClone = [...activities];
      const modifiedActivities = activitiesClone.map((activityValue) => {
        const activity = { ...activityValue };
        const dateFromApi = activity.date;
        const modifiedDate = moment(dateFromApi).format("ll");
        const modifiedTime = moment(dateFromApi).format("LT");
        delete activity.date;
        activity.date = modifiedDate;
        activity.time = modifiedTime;
        return activity;
      });
      const groupedByDate = groupBy(modifiedActivities, "date");
      setGroupedActivities(groupedByDate);
    }
  }, [activities]);

  const recentActivityCardJsx = useCallback(() => {
    const isEmpty = size(groupedActivities) === 0;

    if (!isEmpty && planType.length > 0 && planType !== "free") {
      return map(groupedActivities, (value, key) => {
        return (
          <div key={key} className="date-data">
            <span className="date-content">{key}</span>
            {map(value, (val: any, index: any) => {
              return (
                <div key={index} className="info-container">
                  <div className="icon-container center-items">
                    {activitiesFetching || activitiesLoading ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      iconType(val.type)
                    )}
                    {index < size(value) - 1 ? (
                      <div className="line"></div>
                    ) : null}
                  </div>

                  <div className="flex-dir-col action-info">
                    {activitiesFetching || activitiesLoading ? (
                      <Skeleton variant="rounded" width={250} height={20} />
                    ) : (
                      <h4 className="action">{`${activityTitle(
                        val.type,
                        val.title
                      )}`}</h4>
                    )}

                    {activitiesFetching || activitiesLoading ? (
                      <Skeleton
                        variant="rounded"
                        style={{ marginTop: "10px" }}
                        width={180}
                        height={20}
                      />
                    ) : (
                      <h4 className="time">{val.time}</h4>
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
          <h3>No Activities</h3>
        </div>
      );
    }
  }, [groupedActivities, planType]);

  return (
    <Frame
      withHeader={true}
      headerTitle={"Recent Activities"}
      withSearchBox={false}
      containerClass="recent-activities"
    >
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <div className="subscription-overlay"></div>
        {activitiesFetching || activitiesLoading ? (
          <div className="loader-container">
            <ClipLoader loading size={40} color="var(--primaryColor)" />
          </div>
        ) : (
          <div className="activities-container">
            <div className="sort-btn-container"></div>
            {recentActivityCardJsx()}
          </div>
        )}
      </ErrorBoundary>
    </Frame>
  );
}

export default RecentActivities;
