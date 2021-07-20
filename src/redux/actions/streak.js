import {
    getStreaks,
    createStreak,
    deleteStreak,
    updateStreak,
    createStreakDetail,
    getStreaksDetail,
    updateStreakDetail
} from '../api/streak';

import { GET_STREAK, GET_STREAK_DETAIL } from '../constants/action-type';

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

export const updateStreakData = (streak, streakId) => async (dispatch) => {
    try {
        await updateStreak(streak, streakId);
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error);
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

export const updateStreakDetailData = (streakDetail, id , streakId) => async (dispatch) => {
    try {
        await updateStreakDetail(streakDetail, id);
        dispatch(getStreaksDetailData(streakId));
    } catch (error) {
        console.log(error);
    }
}