import {
  getRewards,
  createReward,
  deleteReward,
  updateReward,
  deleteRewardsBulk
} from '../api';

import {
  GET_REWARDS,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAIL
} from '../constants/action-type';

//Action Creators
export const createRewardData = (reward) => async (dispatch) => {
  try {
    await createReward(reward);
    dispatch(getRewardsData());
  } catch (error) {
    console.log('create reward ->', error.message);
  }
}

export const deleteRewardData = (rewardId) => async (dispatch) => {
  try {
    await deleteReward(rewardId);
    dispatch(getRewardsData());
  } catch (error) {
    console.log(error);
  }
}

export const deleteRewardBulk = (streakId) => async (dispatch) => {
  try {
    await deleteRewardsBulk(streakId);
  } catch (error) {
    console.log(error);
  }
}

export const updateRewardData = (reward, rewardId) => async (dispatch) => {
  try {
    await updateReward(reward, rewardId);
    dispatch(getRewardsData());
  } catch (error) {
    console.log(error);
  }
}

export const getRewardsData = () => async (dispatch) => {
  const action = { type: GET_REWARDS }
  dispatch(action);
  try {
    const rewards = await getRewards();
    const action = { type: GET_REWARDS_SUCCESS, payload: rewards.data }
    dispatch(action);
  } catch (error) {
    console.log('getRewardsData -> ' , error);
    const action = { type: GET_REWARDS_FAIL, error: error }
    dispatch(action);
  }
}