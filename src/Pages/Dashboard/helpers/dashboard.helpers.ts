export const navigateToStreakList = (navigate: any) => {
  navigate("/streak-list");
};

export const navigateToStreak = (
  e : any,
  navigate: any,
  id: number,
  from: string
) => {
  e.stopPropagation();
  navigate(`/streak/${id}`, {
    state: { from },
  });
};
