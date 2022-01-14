import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAIL
} from "../constants/action-type";

const initialState = {
  activities: [],
  loading: true,
  error: ''
}

const recentActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return { ...state, loading: true }
    case GET_ACTIVITIES_SUCCESS:
      return { ...state, activities : [...action.payload].reverse(), loading: false }
    case GET_ACTIVITIES_FAIL:
      return { ...state, error: action.payload, loading: false }
    default:
      return state;
  }
}

export default recentActivityReducer;