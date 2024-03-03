
export interface StreakListInterface {
    _id: string;
    title: string;
    dateFrom: string;
    dateTo: string;
    days: string;
    description: string;
    userId: string;
    __v: number;
    rewards: [];
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
  