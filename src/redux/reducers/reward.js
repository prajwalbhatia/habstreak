import {
  GET_REWARDS,
  GET_REWARDS_FAIL,
  GET_REWARDS_SUCCESS,
  CREATE_REWARD,
  CREATE_REWARD_SUCCESS,
  ERROR,
  EMPTY_ERROR
} from "../constants/action-type";

const initialState = {
  rewards: [],
  loading: true,
  error: ''
}

const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REWARDS:
      return { ...state, loading: true }
    case CREATE_REWARD:
      return { ...state, loading: true }
    case CREATE_REWARD_SUCCESS:
      return { ...state, loading: false }    
    case GET_REWARDS_SUCCESS:
      return { ...state, rewards: [...action.payload], loading: false }
    case GET_REWARDS_FAIL:
      return { ...state, error: action.payload, loading: false }
    case ERROR:
      return { ...state, error: action.data }
    case EMPTY_ERROR:
      return { ...state, error: "" }
    default:
      return state;
  }
}

export default rewardReducer;