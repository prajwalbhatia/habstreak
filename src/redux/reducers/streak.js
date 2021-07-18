import { CREATE_STREAK , GET_STREAK } from '../constants/action-type';

const initialState = {
    streaks: [
        // {
        //     title: "100 days of Javascript",
        //     description: "The motive of this streak is to keep learning JS with consistency....",
        //     days: "100",
        //     date : "2021-07-21"
        // }
    ]
}

const streakReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STREAK:
            return { ...state }
        case GET_STREAK:
            return { ...state, streaks: [...action.payload] }
        default:
            return state;
    }
}

export default streakReducer;