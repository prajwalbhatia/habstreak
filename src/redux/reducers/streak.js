import {
    GET_STREAK,
    GET_STREAK_SUCCESS,
    GET_STREAK_FAIL,

    CREATE_STREAK_FAIL,

    EMPTY_STREAK_DETAIL,

    // DELETE_STREAK,
    // DELETE_STREAK_SUCCESS,
    // DELETE_STREAK_FAIL,

    // UPDATE_STREAK,
    // UPDATE_STREAK_SUCCESS,
    // UPDATE_STREAK_FAIL,

    GET_STREAK_DETAIL
} from '../constants/action-type';
const initialState = {
    streaks: [],
    streakDetail: [],
    loading : true,
    error : ''
}

const streakReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPTY_STREAK_DETAIL:
            return {...state , streakDetail : []}
        case GET_STREAK:
            return { ...state, loading : true }
        case GET_STREAK_SUCCESS:
            return { ...state, streaks: [...action.payload] , loading : false }
        case GET_STREAK_FAIL:
            return { ...state, error : action.payload , loading : false }

        case CREATE_STREAK_FAIL:
            return { ...state, error: action.payload, loading: false }

        case GET_STREAK_DETAIL:
            return { ...state, streakDetail: [...action.payload] }
        default:
            return state;
    }
}

export default streakReducer;