import {
  UserAction,
  UserLoginInfo,
  UserTenantEmail,
  UserLoginSuccess,
  UserErrorMessage,
  UserSuccessMessage,
  UserResetPasswordSuccessMessage,
  UserAccessToken,
  UserNewPassword,
  RefreshTokenInfo,
  UserLanguage,
  TenantInfo,
  RefreshTokenFailure,
  UserActionTypes,
} from './user.types';

export function loginUserRequest(newUserLoginInfo: UserLoginInfo): UserAction {
  return {
    type: UserActionTypes.LOGIN_USER_REQUEST,
    payload: newUserLoginInfo,
  };
}

export function loginUserSuccess(
  newUserLoginSuccess: UserLoginSuccess
): UserAction {
  return {
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: newUserLoginSuccess,
  };
}

export function loginUserFailure(
  newUserErrorMessage: UserErrorMessage
): UserAction {
  return {
    type: UserActionTypes.LOGIN_USER_FAILURE,
    payload: newUserErrorMessage,
  };
}

export function storeRefreshedToken(
  newUserAccessToken: UserAccessToken
): UserAction {
  return {
    type: UserActionTypes.STORE_REFRESHED_TOKEN,
    payload: newUserAccessToken,
  };
}

export function refreshTokenRequest(
  newRefreshTokenInfo: RefreshTokenInfo
): UserAction {
  return {
    type: UserActionTypes.REFRESH_TOKEN_REQUEST,
    payload: newRefreshTokenInfo,
  };
}

export function refreshTokenSuccess(
  newUserAccessToken: UserAccessToken
): UserAction {
  return {
    type: UserActionTypes.REFRESH_TOKEN_SUCCESS,
    payload: newUserAccessToken,
  };
}

export function refreshTokenFailure(
  newRefreshTokenFailure: RefreshTokenFailure
): UserAction {
  return {
    type: UserActionTypes.REFRESH_TOKEN_FAILURE,
    payload: newRefreshTokenFailure,
  };
}
export function registerUserRequest(
  newUserLoginInfo: UserLoginInfo
): UserAction {
  return {
    type: UserActionTypes.REGISTER_USER_REQUEST,
    payload: newUserLoginInfo,
  };
}

export function registerUserSuccess(
  newUserSuccessMessage: UserSuccessMessage
): UserAction {
  return {
    type: UserActionTypes.REGISTER_USER_SUCCESS,
    payload: newUserSuccessMessage,
  };
}

export function registerUserFailure(
  newUserErrorMessage: UserErrorMessage
): UserAction {
  return {
    type: UserActionTypes.REGISTER_USER_FAILURE,
    payload: newUserErrorMessage,
  };
}

export function resetPasswordRequest(
  newUserTenantEmail: UserTenantEmail
): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_REQUEST,
    payload: newUserTenantEmail,
  };
}

export function resetPasswordSuccess(
  newUserSuccessMessage: UserSuccessMessage
): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_SUCCESS,
    payload: newUserSuccessMessage,
  };
}

export function resetPasswordFailure(
  newUserErrorMessage: UserErrorMessage
): UserAction {
  return {
    type: UserActionTypes.RESET_PASSWORD_FAILURE,
    payload: newUserErrorMessage,
  };
}

export function setNewPasswordRequest(
  newUserNewPassword: UserNewPassword
): UserAction {
  return {
    type: UserActionTypes.SET_NEW_PASSWORD_REQUEST,
    payload: newUserNewPassword,
  };
}

export function setNewPasswordSuccess(
  newResetPasswordUserSuccessMessage: UserResetPasswordSuccessMessage
): UserAction {
  return {
    type: UserActionTypes.SET_NEW_PASSWORD_SUCCESS,
    payload: newResetPasswordUserSuccessMessage,
  };
}

export function setNewPasswordFailure(
  newUserErrorMessage: UserErrorMessage
): UserAction {
  return {
    type: UserActionTypes.SET_NEW_PASSWORD_FAILURE,
    payload: newUserErrorMessage,
  };
}

export function logout(): UserAction {
  return {
    type: UserActionTypes.LOGOUT_USER,
  };
}

export function setLanguage(newUserLanguage: UserLanguage): UserAction {
  return {
    type: UserActionTypes.SET_LANGUAGE,
    payload: newUserLanguage,
  };
}

export function checkUserTenantRequest(newTenantInfo: TenantInfo): UserAction {
  return {
    type: UserActionTypes.CHECK_USER_TENANT_REQUEST,
    payload: newTenantInfo,
  };
}

export function checkUserTenantSuccess(
  newUserSuccessMessage: UserSuccessMessage
): UserAction {
  return {
    type: UserActionTypes.CHECK_USER_TENANT_SUCCESS,
    payload: newUserSuccessMessage,
  };
}

export function checkUserTenantFailure(
  newUserErrorMessage: UserErrorMessage
): UserAction {
  return {
    type: UserActionTypes.CHECK_USER_TENANT_FAILURE,
    payload: newUserErrorMessage,
  };
}
