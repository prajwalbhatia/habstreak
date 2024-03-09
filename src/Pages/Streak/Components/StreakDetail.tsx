import moment from "moment";
import { Skeleton } from "@mui/material";

import { OutlinedPrimaryButton } from "Components/buttons/buttons";

import { useUpdateStreakMutation } from "../../../Redux/Slices/streakSlice";
import { dialogForCreateAndUpdateStreak } from "Utilities";
import useSnackBar from "Hooks/useSnackBar";

const StreakDetail: React.FC<{ streak: any; loading: boolean }> = ({
  streak,
  loading,
}) => {
  const [updateStreak, { isLoading: updateStreakLoading }] =
    useUpdateStreakMutation();

  const { SnackbarComponent, showSnackBar } = useSnackBar();

  const updateStreakFun = (streak: any, updateStreak: any) => {
    if (streak?.tag !== "unfinished")
      dialogForCreateAndUpdateStreak(
        "update",
        streak,
        streak._id,
        async (_, data: any) => {
          try {
          } catch (error) {}

          const updatedStreak: any = await updateStreak({
            updatedVal: { description: data?.description, title: data?.title },
            streakId: streak._id,
          });

          if (updatedStreak?.error) {
            showSnackBar(
              "error",
              updatedStreak?.error?.data?.error?.message || ""
            );
          } 
        }
      );
  };

  return (
    <div className="d-flex flex-1 flex-dir-col">
      <div className="d-flex flex-1 justify-space-between ai-start detail-head-container">
        {loading || updateStreakLoading ? (
          <Skeleton variant="text" sx={{ minWidth: 150, minHeight: 40 }} />
        ) : (
          <h3 className="jos-18-primary">{streak?.[0]?.title}</h3>
        )}
        <div className="btn-container">
          {streak?.[0]?.tag !== "unfinished" && (
            <OutlinedPrimaryButton
              name={"EDIT"}
              click={() => updateStreakFun(streak[0], updateStreak)}
              btnContainerClass="okay-btn"
              btnClass=""
              loading={loading || updateStreakLoading}
            />
          )}
        </div>
      </div>

      <div className="d-flex flex-auto">
        <p className="rob-reg-14-grey mt-10 detail-streak">
          {loading || updateStreakLoading ? (
            <Skeleton variant="text" sx={{ minWidth: 150, minHeight: 40 }} />
          ) : (
            streak?.[0]?.description
          )}
        </p>
      </div>
      <div className="d-flex flex-1 justify-space-between detail-dates mt-20">
        <div className="d-flex date-container">
          {loading || updateStreakLoading ? (
            <Skeleton
              variant="circular"
              width={35}
              height={35}
              sx={{ marginRight: 1 }}
            />
          ) : (
            <div className="center-items icon-container">
              <i className="demo-icon  icon-flag" />
            </div>
          )}

          <div className="flex-dir-col info-container">
            {loading || updateStreakLoading ? (
              <Skeleton variant="text" sx={{ width: 40, minHeight: 20 }} />
            ) : (
              <span className="rob-med-10-primary">Start Date:</span>
            )}

            <span className="rob-reg-14-black">
              {loading || updateStreakLoading ? (
                <Skeleton variant="text" sx={{ minWidth: 80, minHeight: 20 }} />
              ) : (
                moment(streak?.[0]?.dateFrom).format("ll")
              )}
            </span>
          </div>
        </div>
        <div className="d-flex date-container">
          {loading || updateStreakLoading ? (
            <Skeleton
              variant="circular"
              width={35}
              height={35}
              sx={{ marginRight: 1 }}
            />
          ) : (
            <div className="center-items icon-container">
              <i className="demo-icon  icon-flag" />
            </div>
          )}

          <div className="flex-dir-col info-container">
            {loading || updateStreakLoading ? (
              <Skeleton variant="text" sx={{ width: 40, minHeight: 20 }} />
            ) : (
              <span className="rob-med-10-primary">End Date:</span>
            )}

            <span className="rob-reg-14-black">
              {loading || updateStreakLoading ? (
                <Skeleton variant="text" sx={{ minWidth: 80, minHeight: 20 }} />
              ) : (
                moment(streak?.[0]?.dateTo).format("ll")
              )}
            </span>
          </div>
        </div>
      </div>
      {SnackbarComponent}
    </div>
  );
};

export default StreakDetail;
