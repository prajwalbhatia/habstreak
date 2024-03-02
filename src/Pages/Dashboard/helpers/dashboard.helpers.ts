export const navigateToStreakList = (navigate: any, goTo: string = "") => {
  navigate("/streak-list", { state: { goTo } });
};

export const navigateToRewardList = (navigate: any, goTo: string = "") => {
  navigate("/reward-list", { state: { goTo } });
};

export const navigateToRecentActivities = (navigate: any) => {
  navigate("/recent-activities");
};

export const navigateToStreak = (
  e: any,
  navigate: any,
  id: number,
  from: string
) => {
  e.stopPropagation();
  navigate(`/streak/${id}`, {
    state: { from },
  });
};
