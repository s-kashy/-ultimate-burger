import * as actionType from "../actions/actionType";
import { updateObject } from "../utility";

const initialState = {
  loading: false,
  userId: null,
  token: null,
  error: null
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    userId: action.userId,
    token: action.idToken,
    error: null
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
const logOut = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_FAIL:
      return authFail(state, action);
    case actionType.AUTH_START:
      return authStart(state, action);
    case actionType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionType.LOG_OUT:
      return logOut(state, action);

    default:
      return state;
  }
};
export default reducer;
