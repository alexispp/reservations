import axios from "axios";

import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
} from "./login-action-types";

//Sign up action creators
const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};
const signUpSuccess = (user) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: {
      user,
    },
  };
};
const signUpFailure = (error) => {
  return {
    type: SIGN_UP_FAILURE,
    payload: error,
  };
};

export const signUp = (user, history) => {
  return async (dispatch) => {
    dispatch(signUpRequest());
    try {
      const response = await axios({
        method: "post",
        url: "/signUp",
        data: user,
      });
      const { data } = response.data;
      dispatch(signUpSuccess(data));
      history.push("/");
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };
};

//Sign in action creators
const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  };
};
const signInSuccess = (token) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token,
    },
  };
};
const signInFailure = (error) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: error,
  };
};

export const signIn = (payload, history) => {
  return async (dispatch) => {
    dispatch(signInRequest);

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/auth/signIn`,
        data: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("USER-TOKEN")}`,
        },
      });
      const { token } = response.data;
      localStorage.setItem("USER-TOKEN", token);

      dispatch(signInSuccess(token));
      history.push("/admin");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
};

//sign out action creators
export const signOutRequest = function () {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

export const signOutSuccess = function () {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = function () {
  return {
    type: SIGN_OUT_FAILURE,
  };
};

export const signOut = function (history) {
  return (dispatch) => {
    dispatch(signOutRequest());
    localStorage.clear();
    history.push("/");
    if (localStorage.getItem("USER_TOKEN")) {
      dispatch(signOutFailure());
    } else {
      dispatch(signOutSuccess());
    }
  };
};
