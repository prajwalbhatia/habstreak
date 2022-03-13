import { AUTH, LOGOUT, REFRESH_TOKEN } from '../constants/action-type';

import {
    createUser,
    signIn,
    signUp,
    refreshToken,
} from '../api/user';

import {
    logout
} from '../api';

export const auth = (data) => async (dispatch) => {
    try {
        await createUser(data.result);
        const action = { type: AUTH, data }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData, history) => async dispatch => {
    try {
        const { data } = await signIn(formData);
        const action = { type: AUTH, data }
        dispatch(action);
        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async dispatch => {
    try {
        const { data } = await signUp(formData);
        const action = { type: AUTH, data }
        dispatch(action);
        history.push('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

export const refreshTokenFunApiCall = (token) => async dispatch => {
    try {
        const { data } = await refreshToken(token);
        return data;
        // const action = { type: REFRESH_TOKEN, data }
        // dispatch(action);
    } catch (error) {
        console.log(error);
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
        await logout({refreshToken});
        const action = { type: LOGOUT }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}


