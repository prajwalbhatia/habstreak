import {
    AUTH,
    LOGOUT,
    REFRESH_TOKEN,
    SIGNIN_FAIL,
    EMPTY_ERROR,
    PAYMENT_REQUEST,
    SIGNUP_FAIL,
    VERIFY_EMAIL,
    PAYMENT_REQUEST_FAIL
} from '../constants/action-type';

import {
    createUser,
    signIn,
    signUp,
    verifyEmail
} from '../api/user';

import {
    logout,
    updateUser,
    paymentRequest,
} from '../api';

export const emptyError = () => async (dispatch) => {
    const action = { type: EMPTY_ERROR }
    dispatch(action);
}

export const updateuser = (data, email) => async (dispatch) => {
    try {
        const updatedData = await updateUser(data, email);
        const tokens = JSON.parse(localStorage.getItem('profile'))
        const newObj = {
            token: tokens.token,
            refreshToken: tokens.refreshToken,
            result: updatedData.data
        }
        const action = { type: AUTH, data: newObj }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}

export const auth = (data) => async (dispatch) => {
    try {

        const userDetail = await createUser(data.result);

        data.result.planType = userDetail.data.planType;
        data.result.verified = userDetail.data.verified;
        const action = { type: AUTH, data }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData, history) => async dispatch => {
    try {
        delete formData.confirmPassword;
        delete formData.fullName;
        const { data } = await signIn(formData);
        const action = { type: AUTH, data }
        dispatch(action);
        // history.push('/dashboard');
    } catch (error) {
        const action = { type: SIGNIN_FAIL, data: error.response.data.error.message }
        dispatch(action);
    }
}

export const signup = (formData, history) => async dispatch => {
    try {
        const { data } = await signUp(formData);
        const action = { type: AUTH, data }
        dispatch(action);
        // history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

export const verifyemail = (emailData, history) => async dispatch => {
    try {
        const { data } = await verifyEmail(emailData);
        const action = { type: VERIFY_EMAIL, data }
        dispatch(action);
        history.push('/dashboard');
    } catch (error) {
        const action = { type: SIGNUP_FAIL, data: error.response.data.error.message }
        dispatch(action);
    }
}

export const storeRefreshToken = (data) => async dispatch => {
    try {
        const action = { type: REFRESH_TOKEN, data }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}

export const logoutCall = (refreshToken) => async (dispatch) => {
    try {
        await logout({ refreshToken });
        const action = { type: LOGOUT }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}

export const createPaymentRequest = () => async (dispatch) => {
    try {
        const { data } = await paymentRequest();
        const action = { type: PAYMENT_REQUEST, data }
        dispatch(action);
    } catch (error) {
        console.log(error.response.data.error.message);
        // const action = { type: PAYMENT_REQUEST_FAIL, payload: error.response.data.error.message }
        // dispatch(action);
    }

}

