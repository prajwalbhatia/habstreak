import { GET_REWARDS } from "../constants/action-type";

const initialState = {
  rewards: []
}

const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REWARDS:
      return { ...state, rewards : [...action.payload ] }
    default:
      return state;
  }
}

export default rewardReducer;