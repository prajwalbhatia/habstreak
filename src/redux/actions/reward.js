import { CREATE_REWARD } from '../constants/action-type';

//Action Creators
export const createReward = (data) => {
  return {
    type: CREATE_REWARD,
    payload: data
  }
}