import { AUTH, LOGOUT } from '../constants/action-type';

const initialState = {
    authData: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case LOGOUT:
            // localStorage.removeItem('profile');
            localStorage.clear();
            return { ...state, authData: null }
        default:
            return state;
    }
}

export default userReducer;