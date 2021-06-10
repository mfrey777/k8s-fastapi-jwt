export interface UserState {
  currentUser: string;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  statusText: string;
  isRegistering: boolean;
  isRegistered: boolean;
  isRefreshing: boolean;
  refreshingCall: Promise<boolean>;
  registerStatusText: string;
  tenant: string;
  setRefreshingState: boolean;
  setRefreshingCall: string;
  // expiresIn: 0,
  accessToken: string;
  refreshToken: string;
  signInError: string;
  language: string;
}

export interface UserLoginInfo {
  tenant: string;
  email: string;
  password: string;
}

export interface UserLoginSuccess {
  tenant: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserErrorMessage {
  error: string;
}

export interface UserAccessToken {
  accessToken: string;
}

export interface UserSuccessMessage {
  tenant: string;
  msg: string;
}

export interface UserResetPasswordSuccessMessage {
  msg: string;
}

export interface UserTenantEmail {
  tenant: string;
  email: string;
}

export interface UserNewPassword {
  // tenant: string;
  email: string;
  password: string;
  code: string;
}

// export interface LogoutInfo {
//   tenant: string;
// }

export interface RefreshTokenInfo {
  msg: string;
}

export interface RefreshTokenFailure {
  msg: string;
  tenant: string;
}

export interface UserLanguage {
  language: string;
}

export interface TenantInfo {
  tenant: string;
}

export enum UserActionTypes {
  LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE',
  LOGOUT_USER = 'LOGOUT_USER',
  REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE',
  STORE_REFRESHED_TOKEN = 'STORE_REFRESHED_TOKEN',
  REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS',
  REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE',
  RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',
  SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST',
  SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS',
  SET_NEW_PASSWORD_FAILURE = 'SET_NEW_PASSWORD_FAILURE',
  SET_LANGUAGE = 'SET_LANGUAGE',
  CHECK_USER_TENANT_REQUEST = 'CHECK_USER_TENANT_REQUEST',
  CHECK_USER_TENANT_SUCCESS = 'CHECK_USER_TENANT_SUCCESS',
  CHECK_USER_TENANT_FAILURE = 'CHECK_USER_TENANT_FAILURE',
}

export interface loginUserRequestAction {
  type: UserActionTypes.LOGIN_USER_REQUEST;
  payload: UserLoginInfo;
}

export interface loginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: UserLoginSuccess;
}

export interface loginUserFailureAction {
  type: UserActionTypes.LOGIN_USER_FAILURE;
  payload: UserErrorMessage;
}

export interface storeRefreshedTokenAction {
  type: UserActionTypes.STORE_REFRESHED_TOKEN;
  payload: UserAccessToken;
}

export interface registerUserRequestAction {
  type: UserActionTypes.REGISTER_USER_REQUEST;
  payload: UserLoginInfo;
}

export interface registerUserSuccessAction {
  type: UserActionTypes.REGISTER_USER_SUCCESS;
  payload: UserSuccessMessage;
}

export interface registerUserFailureAction {
  type: UserActionTypes.REGISTER_USER_FAILURE;
  payload: UserErrorMessage;
}

export interface resetPasswordRequestAction {
  type: UserActionTypes.RESET_PASSWORD_REQUEST;
  payload: UserTenantEmail;
}

export interface resetPasswordSuccessAction {
  type: UserActionTypes.RESET_PASSWORD_SUCCESS;
  payload: UserResetPasswordSuccessMessage;
}

export interface resetPasswordrFailureAction {
  type: UserActionTypes.RESET_PASSWORD_FAILURE;
  payload: UserErrorMessage;
}

export interface setNewPasswordRequestAction {
  type: UserActionTypes.SET_NEW_PASSWORD_REQUEST;
  payload: UserNewPassword;
}

export interface setNewPasswordSuccessAction {
  type: UserActionTypes.SET_NEW_PASSWORD_SUCCESS;
  payload: UserResetPasswordSuccessMessage;
}

export interface setNewPasswordFailureAction {
  type: UserActionTypes.SET_NEW_PASSWORD_FAILURE;
  payload: UserErrorMessage;
}

export interface logoutAction {
  type: UserActionTypes.LOGOUT_USER;
}

export interface refreshTokenRequestAction {
  type: UserActionTypes.REFRESH_TOKEN_REQUEST;
  payload: RefreshTokenInfo;
}

export interface refreshTokenSuccessAction {
  type: UserActionTypes.REFRESH_TOKEN_SUCCESS;
  payload: UserAccessToken;
}

export interface refreshTokenFailureAction {
  type: UserActionTypes.REFRESH_TOKEN_FAILURE;
  payload: RefreshTokenFailure;
}

export interface setLanguageAction {
  type: UserActionTypes.SET_LANGUAGE;
  payload: UserLanguage;
}

export interface checkedUserTenantRequestAction {
  type: UserActionTypes.CHECK_USER_TENANT_REQUEST;
  payload: TenantInfo;
}

export interface checkedUserTenantSuccessAction {
  type: UserActionTypes.CHECK_USER_TENANT_SUCCESS;
  payload: UserSuccessMessage;
}

export interface checkedUserTenantFailureAction {
  type: UserActionTypes.CHECK_USER_TENANT_FAILURE;
  payload: UserErrorMessage;
}

export type UserAction =
  | loginUserRequestAction
  | loginUserSuccessAction
  | loginUserFailureAction
  | storeRefreshedTokenAction
  | registerUserRequestAction
  | registerUserSuccessAction
  | registerUserFailureAction
  | resetPasswordRequestAction
  | resetPasswordSuccessAction
  | resetPasswordrFailureAction
  | logoutAction
  | refreshTokenRequestAction
  | refreshTokenSuccessAction
  | refreshTokenFailureAction
  | setNewPasswordRequestAction
  | setNewPasswordSuccessAction
  | setNewPasswordFailureAction
  | setLanguageAction
  | checkedUserTenantRequestAction
  | checkedUserTenantSuccessAction
  | checkedUserTenantFailureAction;
