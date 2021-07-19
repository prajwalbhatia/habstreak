import {
    getStreaks,
    createStreak,
    deleteStreak,
    updateStreak,
    createStreakDetail
} from '../api/streak';

import { GET_STREAK } from '../constants/action-type';

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