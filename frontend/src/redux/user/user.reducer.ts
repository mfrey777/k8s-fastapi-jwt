import {
  UserAction,
  // UserActiosnTypes,
  UserState,
  UserActionTypes,
  // UserLoginSuccess,
  // UserLoginSuccess,
} from './user.types';

const INITIAL_STATE = {
  currentUser: '',
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: '',
  isRegistering: false,
  isRegistered: false,
  registerStatusText: '',
  tenant: '',
  isRefreshing: false,
  // refreshingCall: new Promise<boolean>((success) => {
  //   false;
  // }),
  refreshingCall: new Promise<boolean>(() => {
    return false;
  }),
  setRefreshingState: false,
  setRefreshingCall: '',
  // expiresIn: 0,
  accessToken: '',
  refreshToken: '',
  signInError: '',
  language: 'en',
};

export function userReducer(
  state = INITIAL_STATE,
  action: UserAction
): UserState {
  switch (action.type) {
    // case UserActionTypes.SET_CURRENT_USER:
    //     return {
    //         ...state,
    //         currentUser: action.payload
    //     };
    case UserActionTypes.LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };
    // case UserActionTypes.LOGIN_USER_SUCCESS:
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        statusText: 'Authentication succesfull',
        currentUser: action.payload.email,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        tenant: action.payload.tenant,
      };

    case UserActionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        statusText: 'Authentication failed',
        signInError: action.payload.error,
      };
    case UserActionTypes.STORE_REFRESHED_TOKEN:
      return {
        ...state,
        statusText: 'Token refreshed',
        accessToken: action.payload['accessToken'],
      };
    case UserActionTypes.REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        setRefreshingState: true,
      };
    case UserActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        setRefreshingState: false,
        refreshingCall: new Promise<boolean>(() => {
          return false;
        }),
        accessToken: action.payload['accessToken'],
      };

    // case UserActionTypes.REFRESH_TOKEN_FINAL:
    //   return {
    //     ...state,
    //     refreshingCall: action.payload.refreshingCall
    //   };

    case UserActionTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        isRegistering: true,
      };
    case UserActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        isRegistered: true,
        statusText: 'Registration succesfull',
      };
    case UserActionTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegistering: false,
      };
    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        statusText: 'Logout succesfull',
        currentUser: '',
        accessToken: '',
        refreshToken: '',
      };
    case UserActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload['language'],
      };
    case UserActionTypes.CHECK_USER_TENANT_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        statusText: 'Logout succesfull',
        currentUser: '',
        accessToken: '',
        refreshToken: '',
      };
    default:
      return state;
  }
}
