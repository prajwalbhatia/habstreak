import { AUTH, LOGOUT, REFRESH_TOKEN, SIGNIN_FAIL, PAYMENT_REQUEST , EMPTY_ERROR} from '../constants/action-type';

const initialState = {
    authData: JSON.parse(localStorage.getItem('profile')),
    error : '',
    paymentData : {}
}

const userReducer = (state = initialState, action) => {
console.log('🚀 ~ file: user.js ~ line 10 ~ userReducer ~ action', action);
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case REFRESH_TOKEN:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }
        case PAYMENT_REQUEST:
            return {...state , paymentData : action?.data}    
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