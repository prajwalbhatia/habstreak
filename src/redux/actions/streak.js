import {CREATE_STREAK} from '../constants/action-type';

//Action Creators
export const createStreak = (data) => {
    return {
        type : CREATE_STREAK,
        payload : data
    }
}