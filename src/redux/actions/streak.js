import {
    getStreaks,
    createStreak,
    deleteStreak,
    deleteStreakAndReward,
    updateStreak,
    createStreakDetail,
    getStreaksDetail,
    updateStreakDetail,
    deleteStreakDetail,
    getStreak
} from '../api';

import {
    GET_STREAK,
    GET_STREAK_SUCCESS,
    GET_STREAK_FAIL,

    GET_A_STREAK,

    GET_STREAK_DETAIL,
    GET_STREAK_DETAIL_SUCCESS,
    GET_STREAK_DETAIL_FAIL,

    CREATE_STREAK_FAIL,

    EMPTY_STREAK_DETAIL,

    STREAK_LIST_TYPE,

    SEARCH
} from '../constants/action-type';

//UTILITIES
import {
    isSame
} from 'utilities';

//Libraries
import { getRecentActivitiesData } from './recentActivities';

//Action Creators
//STREAKS
export const createStreakData = (streak) => async (dispatch) => {
    try {
        const { data } = await createStreak(streak);
        //WE HAVE TO CREATE STREAK DETAIL IF
        //THE STREAK IS OF TODAY'S DATE
        if (isSame(data.dateFrom, Date().now)) {
            const streadDetailData = {
                date: data.dateFrom,
                streakId: data._id,
                rewards: [],
            }
            dispatch(createStreakDetailData(streadDetailData));
        }
        dispatch(getStreaksData());
        dispatch(getRecentActivitiesData());
    } catch (error) {
        console.log(error.response.data.error.message);
        const action = { type: CREATE_STREAK_FAIL, payload: error.response.data.error.message }
        dispatch(action);
    }

}

export const deleteStreakData = (streakId) => async (dispatch) => {
    try {
        await deleteStreak(streakId);
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error.response.data.error.message);
    }
}

export const deleteStreakAndRewardData = (streakId) => async (dispatch) => {
    try {
        await deleteStreakAndReward(streakId);
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error.response.data.error.message);
    }
}

export const updateStreakData = (streak, streakId) => async (dispatch) => {
    try {
        await updateStreak(streak, streakId);
        dispatch(getStreaksData());
        dispatch(getStreakData(streakId));
    } catch (error) {
        console.log(error.response.data.error.message);
    }
}

export const getStreaksData = () => async (dispatch) => {
    const action = { type: GET_STREAK }
    dispatch(action);
    try {
        const streaks = await getStreaks();
        const action = { type: GET_STREAK_SUCCESS, payload: streaks.data }
        dispatch(action);
    } catch (error) {
        console.log(error.response.data.error.message);
        const action = { type: GET_STREAK_FAIL, error: error?.response?.data?.error?.message }
        dispatch(action);
    }
}

export const getStreakData = (streakId) => async (dispatch) => {
    // const action = { type: GET_A_STREAK }
    // dispatch(action);
    try {
        const streak = await getStreak(streakId);
        const action = { type: GET_A_STREAK, payload: streak.data }
        dispatch(action);
    } catch (error) {
        console.log(error.response.data.error.message);
        // const action = { type: GET_STREAK_FAIL, error: error }
        // dispatch(action);
    }
}

export const streakListType = (type) => async (dispatch) => {
    const action = { type: STREAK_LIST_TYPE, payload: type }
    dispatch(action);
}

//STREAKS DETAIL
export const emptyStreaksDetail = () => async (dispatch) => {
    try {
        const action = { type: EMPTY_STREAK_DETAIL }
        dispatch(action);
    } catch (error) {
        console.log(error.response.data.error.message);
    }
}

export const createStreakDetailData = (streakDetail) => async () => {
    try {
        await createStreakDetail(streakDetail);
    } catch (error) {
        console.log(error.response.data.error.message);
    }
}

export const getStreaksDetailData = (id) => async (dispatch) => {
    const action = { type: GET_STREAK_DETAIL }
    dispatch(action);
    try {
        const streakDetail = await getStreaksDetail(id);
        const action = { type: GET_STREAK_DETAIL_SUCCESS, payload: streakDetail.data }
        dispatch(action);
    } catch (error) {
        console.log(error.response.data.error.message);
        const action = { type: GET_STREAK_DETAIL_FAIL, error: error.response.data.error.message }
        dispatch(action);
    }
}

export const updateStreakDetailData = (streakDetail, id, streakId) => async (dispatch) => {
    try {
        await updateStreakDetail(streakDetail, id);
        dispatch(getStreaksDetailData(streakId));
    } catch (error) {
        console.log(error);
    }
}

export const deleteStreakDetailData = (streakId) => async (dispatch) => {
    try {
        await deleteStreakDetail(streakId);
    } catch (error) {
        console.log(error);
    }
}

//SEARCH
export const search = (searchText) => async (dispatch) => {
    try {
        const action = { type: SEARCH , payload : searchText}
        dispatch(action);
    } catch (error) {
        console.log(error.response.data.error.message);
    }
}