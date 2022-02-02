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

    GET_STREAK_DETAIL,
    GET_STREAK_DETAIL_SUCCESS,
    GET_STREAK_DETAIL_FAIL,

    CREATE_STREAK_FAIL,

    EMPTY_STREAK_DETAIL,

    STREAK_LIST_TYPE,
} from '../constants/action-type';

//Libraries
import moment from 'moment';

//Action Creators
//STREAKS
export const createStreakData = (streak) => async (dispatch) => {
    try {
        const { data } = await createStreak(streak);
        //WE HAVE TO CREATE STREAK DETAIL IF
        //THE STREAK IS OF TODAY'S DATE
        if (moment(moment(data.date).format('YYYY-MM-DD')).isSame(moment(Date.now()).format('YYYY-MM-DD'))) {
            const streadDetailData = {
                date: data.date,
                streakId: data._id,
                rewards: [],
            }
            dispatch(createStreakDetailData(streadDetailData));
        }
        dispatch(getStreaksData());
    } catch (error) {
        console.log(error);
        const action = { type: CREATE_STREAK_FAIL, payload: error }
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

export const streakListType = (type) => async (dispatch) => {
    const action = { type: STREAK_LIST_TYPE , payload : type }
    dispatch(action);
}

//STREAKS DETAIL
export const emptyStreaksDetail = () => async (dispatch) => {
    try {
        const action = { type: EMPTY_STREAK_DETAIL }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}

export const createStreakDetailData = (streakDetail) => async () => {
    try {
        await createStreakDetail(streakDetail);
    } catch (error) {
        console.log(error);
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
        console.log(error);
        const action = { type: GET_STREAK_DETAIL_FAIL, error: error }
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