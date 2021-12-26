import { AUTH , LOGOUT} from '../constants/action-type';

export const auth = (data) => async (dispatch) => {
    try {
        const action = { type: AUTH,  data }
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


