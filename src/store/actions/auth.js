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
  localStorage.removeItem("token");
  localStorage.removeItem("timeExpires");
  localStorage.removeItem("userId");
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
        const dateExpires = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log(response.data);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("timeExpires", dateExpires);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error));
        console.log(error.response.data);
      });
  };
};
export const setAuthRedirectPath = path => {
  return {
    type: actionType.SET_AUTH_REDIRECT,
    pathAuth: path
  };
};
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      ///new Date convert the String from storage to Date obj
      const timeOfExpiration = new Date(localStorage.getItem("timeExpires"));
      if (timeOfExpiration <= new Date()) {
        dispatch(logOut());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeOut(
            (timeOfExpiration.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
