import { GET_STREAK, GET_STREAK_DETAIL } from '../constants/action-type';

const initialState = {
    streaks: [],
    streakDetail : []
}

const streakReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STREAK:
            return { ...state, streaks: [...action.payload] }
        case GET_STREAK_DETAIL:
            return { ...state, streakDetail: [...action.payload] }
        default:
            return state;
    }
}

export default streakReducer;