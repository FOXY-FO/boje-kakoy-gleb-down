import { authAPI, capthaAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = "auth/SET-AUTH-USER-DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";
let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  capthaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAPTCHA:
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        ...action.data,
      };
    }
    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  data: { id, email, login, isAuth },
});

export const setDataCaptcha = (capthaUrl) => ({
  type: SET_CAPTCHA,
  data: { capthaUrl },
});

export const loginThunk = () => async (dispatch) => {

  let response = await authAPI.me();

  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const logIn = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  let response = await authAPI.logIn(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(loginThunk());
  } else {
    dispatch(getCaptcha());
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptcha = () => async (dispatch) => {
  let response = await capthaAPI.getCaptchaApi();
  dispatch(setDataCaptcha(response.data.url));
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
