import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAIL,
  STOP_LOADING
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
    case STOP_LOADING:
      return { ...state, loading: false }
    default:
      return state;
  }
}

export default recentActivityReducer;