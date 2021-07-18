import { getStreaks } from '../api/streak';

import { CREATE_STREAK, DELETE_STREAK, GET_STREAK } from '../constants/action-type';

//Action Creators
export const createStreak = (data) => {
    return {
        type: CREATE_STREAK,
        payload: data
    }
}

export const deleteStreak = (id) => {
    return {
        type: DELETE_STREAK,
    }
}

export const getStreaksData = () => async (dispatch) => {
    try {
        const streaks = await getStreaks();
        const action = { type: GET_STREAK, payload: streaks.data }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}