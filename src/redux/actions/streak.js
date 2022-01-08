import {
    getStreaks,
    createStreak,
    deleteStreak,
    deleteStreakAndReward,
    updateStreak,
    createStreakDetail,
    getStreaksDetail,
    updateStreakDetail,
    deleteStreakDetail
} from '../api';

import {
    GET_STREAK,
    GET_STREAK_SUCCESS,
    GET_STREAK_FAIL,

    CREATE_STREAK_FAIL,

    // DELETE_STREAK,
    // DELETE_STREAK_SUCCESS,
    // DELETE_STREAK_FAIL,

    // UPDATE_STREAK,
    // UPDATE_STREAK_SUCCESS,
    // UPDATE_STREAK_FAIL,

    GET_STREAK_DETAIL
} from '../constants/action-type';

//Action Creators
//STREAKS
export const createStreakData = (streak) => async (dispatch) => {
    try {
        const { data } = await createStreak(streak);
        const streadDetailData = {
            date: data.date,
            streakId: data._id,
            rewards: [],
        }
        dispatch(createStreakDetailData(streadDetailData));
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error);
        const action = { type: CREATE_STREAK_FAIL , payload : error }
        dispatch(action);
    }
    
}

export const deleteStreakData = (streakId) => async (dispatch) => {
    try {
        await deleteStreak(streakId);
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error);
    }
}

export const deleteStreakAndRewardData = (streakId) => async (dispatch) => {
    try {
        await deleteStreakAndReward(streakId);
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error);
    }
}

export const updateStreakData = (streak, streakId) => async (dispatch) => {
    try {
        await updateStreak(streak, streakId);
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error);
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
        console.log(error);
        const action = { type: GET_STREAK_FAIL, error: error }
        dispatch(action);
    }
}

//STREAKS DETAIL
export const createStreakDetailData = (streakDetail) => async () => {
    try {
        await createStreakDetail(streakDetail);
    } catch (error) {
        console.log(error);
    }
}

export const getStreaksDetailData = (id) => async (dispatch) => {
    try {
        const streakDetail = await getStreaksDetail(id);
        const action = { type: GET_STREAK_DETAIL, payload: streakDetail.data }
        dispatch(action);
    } catch (error) {
        console.log(error);
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