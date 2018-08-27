import * as actionType from "./actionType";
import axios from "axios";

export const authSuccess = (idToken, localId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    userId: localId,
    idToken: idToken
  };
};

export const authFail = error => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};
export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};
export const logOut = () => {
  return {
    type: actionType.LOG_OUT
  };
};
export const checkAuthTimeOut = timeExpiration => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, timeExpiration * 1000);
  };
};

export const authUser = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const userInfo = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCdQU9tdij7QHG3mM8r_RDLs0UCf2wUq_8";
    if (isSignUp) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCdQU9tdij7QHG3mM8r_RDLs0UCf2wUq_8";
    }
    axios
      .post(url, userInfo)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
        console.log("respo", response);
      })
      .catch(error => {
        dispatch(authFail(error));
        console.log(error.response.data);
      });
  };
};
