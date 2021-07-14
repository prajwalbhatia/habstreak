import { CREATE_STREAK } from '../constants/action-type';

const initialState = {
    streaks: []
}

const streakReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STREAK:
            return { ...state, streaks: [...state.streaks, { ...action.payload }] }
        default:
            return state;
    }
}

export default streakReducer;