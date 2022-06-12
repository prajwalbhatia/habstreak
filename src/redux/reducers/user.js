import {
    AUTH,
    LOGOUT,
    REFRESH_TOKEN,
    SIGNIN_FAIL,
    PAYMENT_REQUEST,
    PAYMENT_REQUEST_EMPTY,
    SIGNUP_FAIL,
    VERIFY_EMAIL,
    EMPTY_ERROR,
    CHECK_USER
} from '../constants/action-type';

const initialState = {
    authData: JSON.parse(localStorage.getItem('profile')),
    error: '',
    paymentData: {},
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case REFRESH_TOKEN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case VERIFY_EMAIL:
            localStorage.setItem('profile', JSON.stringify({ ...JSON.parse(localStorage.getItem('profile')), result: action?.data?.result }))
            return { ...state, authData: action?.data }
        case PAYMENT_REQUEST:
            return { ...state, paymentData: action?.data }
        case PAYMENT_REQUEST_EMPTY:
            return { ...state, paymentData: {} }
        case LOGOUT:
            localStorage.clear();
            // localStorage.removeItem('profile');
            return { ...state, authData: null }
        case SIGNIN_FAIL:
            return { ...state, error: action.data }
        case EMPTY_ERROR:
            return { ...state, error: "" }
        default:
            return state;
    }
}

export default userReducer;
