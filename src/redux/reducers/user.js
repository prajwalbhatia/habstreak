import { AUTH, LOGOUT, REFRESH_TOKEN } from '../constants/action-type';

const initialState = {
    authData: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case REFRESH_TOKEN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case LOGOUT:
            localStorage.clear();
            // localStorage.removeItem('profile');
            return { ...state, authData: null }
        default:
            return state;
    }
}

export default userReducer;