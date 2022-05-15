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
  GET_REWARDS_FAIL,
  CREATE_REWARD,
  CREATE_REWARD_SUCCESS,
  ERROR,
  EMPTY_ERROR
} from '../constants/action-type';

//Action Creators
export const emptyError = () => async (dispatch) => {
  const action = { type: EMPTY_ERROR }
  dispatch(action);
}

export const createRewardData = (reward) => async (dispatch) => {
  const action = { type: CREATE_REWARD }
  dispatch(action);
  try {
    await createReward(reward);
    dispatch(getRewardsData());
    const action = { type: CREATE_REWARD_SUCCESS }
    dispatch(action);
  } catch (error) {
    const action = { type: ERROR, data: error.response.data.error.message }
    dispatch(action);
  }
}

export const deleteRewardData = (rewardId) => async (dispatch) => {
  try {
    await deleteReward(rewardId);
    dispatch(getRewardsData());
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export const deleteRewardBulk = (streakId) => async (dispatch) => {
  try {
    await deleteRewardsBulk(streakId);
  } catch (error) {
    console.log(error.response.data.error.message);
  }
}

export const updateRewardData = (reward, rewardId) => async (dispatch) => {
  try {
    await updateReward(reward, rewardId);
    dispatch(getRewardsData());
  } catch (error) {
    console.log(error.response.data.error.message);
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
    console.log('getRewardsData -> ', error.response.data.error.message);
    const action = { type: GET_REWARDS_FAIL, error: error.response.data.error.message }
    dispatch(action);
  }
}