export interface StreakListInterface {
  _id: string;
  title: string;
  dateFrom: string;
  dateTo: string;
  days: string;
  description: string;
  userId: string;
  __v: number;
  rewards: object;
  tag?: string;
}

export interface RewardInterface {
  rewardEarned: boolean;
  _id: string;
  userId: string;
  title: string;
  streakId: string;
  date: string;
  __v: number;
}

export interface ActivityInterface {
  _id: string;
  userId: string;
  type: string;
  title: string;
  date?: string;
  time: string;
  __v: number;
}

export interface PercentageDataInterface {
  streakSuccess: string;
  streakUnsuccessful: number;
  streakCompleted: number;
  rewardsCollectedPerc: string;
  rewardsCollected: number;
  streakUnsuccessfulPerc: string;
}

export interface StreakInterface {
  tag: string;
  dateFrom: string;
  dateTo: string;
}

export interface RewardInterface {
  rewardEarned: boolean;
}

export interface ProgressCardProps {
  title: string;
  iconClass: string;
  percentageData: string;
  count: number;
  onClick: () => void;
  icon : string;
  type : string
}

