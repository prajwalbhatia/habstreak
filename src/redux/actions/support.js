import {
  writeMessage
} from '../api/preLogin';

import {
  WRITE_MESSAGE,
  ERROR,
  EMPTY_ERROR
} from '../constants/action-type';

//Action Creators
export const emptyError = () => async (dispatch) => {
  const action = { type: EMPTY_ERROR }
  dispatch(action);
}

export const sendMessage = (message) => async (dispatch) => {
  const action = { type: WRITE_MESSAGE }
  dispatch(action);
  try {
    await writeMessage(message);
  } catch (error) {
    const action = { type: ERROR, data: error.response.data.error.message }
    dispatch(action);
  }
}
