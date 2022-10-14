import {
  SET_OTP_TOKEN,
  SET_MOBILE_NUMBER,
  SET_AUTHORIZATION_TOKEN,
  SET_DEVICE_ID,
  SET_USER_DETAILS,
  SET_IS_AUTHENTICATED,
  SET_LOGOUT,
  THEME_CHANGE,
} from './methods';

export const setOtpToken = otpToken => dispatch => {
  dispatch({
    type: SET_OTP_TOKEN,
    otpToken: otpToken,
  });
};
export const setMobileNumber = mobileNumber => dispatch => {
  dispatch({
    type: SET_MOBILE_NUMBER,
    mobileNumber: mobileNumber,
  });
};
export const setAuthorizationToken = token => dispatch => {
  dispatch({
    type: SET_AUTHORIZATION_TOKEN,
    token: token,
  });
};
export const setDeviceId = deviceId => dispatch => {
  dispatch({
    type: SET_DEVICE_ID,
    deviceId: deviceId,
  });
};
export const setUserDetails = userDetails => dispatch => {
  dispatch({
    type: SET_USER_DETAILS,
    user: userDetails,
  });
};

export const setIsAuthenticated = isAuthenticated => dispatch => {
  dispatch({
    type: SET_IS_AUTHENTICATED,
    isAuthenticated: isAuthenticated,
  });
};

export const switchMode = mode => {
  return {
    type: THEME_CHANGE,
    payload: mode,
  };
};
export const logout = () => dispatch => {
  dispatch({
    type: SET_LOGOUT,
  });
};
