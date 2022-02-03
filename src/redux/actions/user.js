import { AUTH, LOGOUT } from '../constants/action-type';

import {
    createUser,
    signIn,
    signUp
} from '../api/user';

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

export const logout = () => async (dispatch) => {
    try {
        const action = { type: LOGOUT }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}


