import {CREATE_STREAK} from '../constants/action-type';

const initialState = {
    streaks : []
}

export default (state = initialState , action) => {
    switch (action.type) {
        case CREATE_STREAK:
            return {...state , streaks : [...action.payload]}
        default:
            return state;
    }
}