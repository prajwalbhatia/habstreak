import { GET_STREAK } from '../constants/action-type';

const initialState = {
    streaks: []
}

const streakReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STREAK:
            return { ...state, streaks: [...action.payload] }
        default:
            return state;
    }
}

export default streakReducer;