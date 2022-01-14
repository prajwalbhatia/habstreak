import {
  getRecentActivities
} from '../api';

import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_FAIL
} from '../constants/action-type';

//Action Creators
export const getRecentActivitiesData = () => async (dispatch) => {
  const action = { type: GET_ACTIVITIES }
  dispatch(action);
  try {
    const activity = await getRecentActivities();
    const action = { type: GET_ACTIVITIES_SUCCESS, payload: activity.data }
    dispatch(action);
  } catch (error) {
    console.log(error);
    const action = { type: GET_ACTIVITIES_FAIL, error: error }
    dispatch(action);
  }
}