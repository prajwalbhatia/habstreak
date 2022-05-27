import {
  WRITE_MESSAGE,
  ERROR,
  EMPTY_ERROR
} from '../constants/action-type';

const initialState = {
  error: '',
  loading: true,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_MESSAGE:
      return { ...state, loading: true }
    case ERROR:
      return { ...state, error: action.payload, loading: false }
    case EMPTY_ERROR:
      return { ...state, error: "" }
    default:
      return state;
  }
}

export default userReducer;
