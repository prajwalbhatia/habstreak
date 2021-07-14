import { CREATE_REWARD } from "../constants/action-type";

const initialState = {
  rewards: []
}

const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REWARD:
      return { ...state, rewards : [...state.rewards , { ...action.payload }] }
    default:
      return state;
  }
}

export default rewardReducer;