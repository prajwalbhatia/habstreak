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

    STREAK_LIST_TYPE

} from '../constants/action-type';
const initialState = {
    streaks: [],
    streak : [],
    streakDetail: [],
    streaksListType : 'Running',
    loading : true,
    error : ''
}

const streakReducer = (state = initialState, action) => {
    switch (action.type) {
        //EMPTY STREAK DETAIL
        case EMPTY_STREAK_DETAIL:
            return {...state , streakDetail : []}
        //STREAK
        case GET_STREAK:
            return { ...state, loading : true }
        case GET_STREAK_SUCCESS:
            return { ...state, streaks: [...action.payload] , loading : false }
        case GET_STREAK_FAIL:
            return { ...state, error : action.payload , loading : false }
        case GET_A_STREAK:
            return { ...state, streak: action.payload }
        case STREAK_LIST_TYPE:
            return { ...state, streaksListType : action.payload }
        //STREAK DETAIL    
        case GET_STREAK_DETAIL:
            return { ...state, loading: true }
        case GET_STREAK_DETAIL_SUCCESS:
            return { ...state, streakDetail: [...action.payload], loading: false }
        case GET_STREAK_DETAIL_FAIL:
            return { ...state, error: action.payload, loading: false }
        //CREATE STREAK    
        case CREATE_STREAK_FAIL:
            return { ...state, error: action.payload, loading: false }

        default:
            return state;
    }
}

export default streakReducer;