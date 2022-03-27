import { AUTH, LOGOUT, REFRESH_TOKEN, SIGNIN_FAIL, EMPTY_ERROR} from '../constants/action-type';

const initialState = {
    authData: JSON.parse(localStorage.getItem('profile')),
    error : ''
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
        case SIGNIN_FAIL:
            return {...state , error : action.data }    
        case EMPTY_ERROR:
            return { ...state, error: "" }    
        default:
            return state;
    }
}

export default userReducer;