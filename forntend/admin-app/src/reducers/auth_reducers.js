import { authContants } from "../actions/constant";

const iniState = {
  token: null,
  user: {
    firstname: "",
    lastName: "",
    email: "",
    profilePicture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
};

export default (state = { iniState }, action) => {
  switch (action.type) {
    case authContants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authContants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;

    case authContants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case authContants.LOGOUT_SUCCESS:
      state = {
        ...iniState,
      };
      break;
    case authContants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }

  return state;
};
