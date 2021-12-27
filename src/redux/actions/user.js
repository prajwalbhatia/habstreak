import { AUTH, LOGOUT } from '../constants/action-type';

import {
    createUser
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

export const logout = () => async (dispatch) => {
    try {
        const action = { type: LOGOUT }
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}


