import { getStreaks, createStreak, deleteStreak, updateStreak } from '../api/streak';

import { GET_STREAK } from '../constants/action-type';

//Action Creators
export const createStreakData = (streak) => async (dispatch) => {
    try {
        await createStreak(streak);
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

export const updateStreakData = (streak , streakId) => async (dispatch) => {
    try {
        await updateStreak(streak , streakId);
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