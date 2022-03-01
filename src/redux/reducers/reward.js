import { GET_REWARDS, GET_REWARDS_FAIL, GET_REWARDS_SUCCESS } from "../constants/action-type";

const initialState = {
  rewards: [],
  loading: true,
  error: ''
}

const rewardReducer = (state = initialState, action) => {
console.log('🚀 ~ file: reward.js ~ line 10 ~ rewardReducer ~ action', action);
  switch (action.type) {
    case GET_REWARDS:
      return { ...state, loading : true }
    case GET_REWARDS_SUCCESS:
      return { ...state, rewards: [...action.payload], loading: false }
    case GET_REWARDS_FAIL:
      return { ...state, error: action.payload, loading: false }
    default:
      return state;
  }
}

export default rewardReducer;