import {CREATE_STREAK , DELETE_STREAK} from '../constants/action-type';

//Action Creators
export const createStreak = (data) => {
    return {
        type : CREATE_STREAK,
        payload : data
    }
}

export const deleteStreak = (id) => {
    return {
        type: DELETE_STREAK,
    }
}