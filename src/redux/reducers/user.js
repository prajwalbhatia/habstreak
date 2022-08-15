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
    CHECK_USER,
    SIGN_IN,
    SIGN_UP,
    VERIFY_EMAIL_SUCCESS
} from '../constants/action-type';

//UTILITIES
import { sendEventToMobile } from "utilities/index";

const initialState = {
    authData: JSON.parse(localStorage.getItem('profile')),
    error: '',
    paymentData: {},
    loading: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            if (window.ReactNativeWebView)
                sendEventToMobile('loggedIn');
            return { ...state, loading: false, authData: action?.data }
        case SIGN_IN:
            return { ...state, loading: true }
        case SIGNUP_FAIL:
            return { ...state, loading: false , error : action.data}    
        case SIGN_UP:
            return { ...state, loading: true }
        case VERIFY_EMAIL:
            return { ...state, loading: true }
        case REFRESH_TOKEN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, loading: false, authData: action?.data }
        case VERIFY_EMAIL_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({ ...JSON.parse(localStorage.getItem('profile')), result: action?.data?.result }))
            return { ...state, loading: false, authData: action?.data }
        case PAYMENT_REQUEST:
            return { ...state, paymentData: action?.data }
        case PAYMENT_REQUEST_EMPTY:
            return { ...state, paymentData: {} }
        case LOGOUT:
            localStorage.clear();
            return {
                authData: null,
                error: '',
                paymentData: {},
                loading: false
            }
        case SIGNIN_FAIL:
            return { ...state, loading: false, error: action.data }
        case EMPTY_ERROR:
            return { ...state, error: "" }
        default:
            return state;
    }
}

export default userReducer;
