import {
  SET_OTP_TOKEN,
  SET_MOBILE_NUMBER,
  SET_AUTHORIZATION_TOKEN,
  SET_DEVICE_ID,
  SET_USER_DETAILS,
  SET_IS_AUTHENTICATED,
  SET_LOGOUT,
} from './methods';

const initialState = {
  otpToken: '',
  mobileNumber: '',
  token: '',
  deviceId: '',
  user: {},
  isAuthenticated: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_OTP_TOKEN:
      return {...state, otpToken: action.otpToken};
    case SET_MOBILE_NUMBER:
      return {...state, mobileNumber: action.mobileNumber};
    case SET_DEVICE_ID:
      return {...state, deviceId: action.deviceId};
    case SET_AUTHORIZATION_TOKEN:
      return {...state, token: action.token};
    case SET_USER_DETAILS:
      return {...state, user: action.user};

    case SET_IS_AUTHENTICATED:
      return {...state, isAuthenticated: action.isAuthenticated};

    case SET_LOGOUT:
      return {...initialState};
    default:
      return state;
  }
}

export default appReducer;
