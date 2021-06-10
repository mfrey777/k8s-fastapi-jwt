import {
  takeLatest,
  put,
  call,
  select,
  PutEffect,
  CallEffect,
  ForkEffect,
  SelectEffect,
} from 'redux-saga/effects';
import {
  UserActionTypes,
  UserLoginInfo,
  UserTenantEmail,
  UserNewPassword,
  UserLanguage,
  TenantInfo,
  // RefreshTokenFailure,
  UserSuccessMessage,
} from './user.types';
import {
  loginUserSuccess,
  loginUserFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  setNewPasswordSuccess,
  setNewPasswordFailure,
  registerUserSuccess,
  registerUserFailure,
  checkUserTenantFailure,
} from './user.actions';
import { openModal } from '../modal/modal.actions';

import { api_refresh } from '../../utils/api';
import { history } from '../../index';

import i18n from '../../i18n';
import { selectCurrentTenant } from './user.selectors';

// export function* signUpWithEmail(payload: { tenant; email; password }) {
export function* signUpWithEmail({
  payload,
}: {
  type: typeof UserActionTypes.REGISTER_USER_REQUEST;
  payload: UserLoginInfo;
}): Generator<PutEffect | CallEffect, void, unknown> {
  // yield console.log('emailSignInStart saga triggered');
  // yield console.log('username: ' + email);
  // yield console.log('password: ' + password);

  console.log('sign up saga started');
  try {
    const { tenant, email, password } = payload;

    // perform login
    // const response: ReturnType<typeof api_refresh.post> = yield call(
    const response: any = yield call(
      api_refresh.post,
      '/api/auth/register-user',
      {
        username: email,
        password: password,
      }
    );
    const data = response.data;

    const msg = data['msg'];
    console.log(msg);

    if (msg) {
      yield put(registerUserSuccess({ msg: msg, tenant: tenant }));
    } else {
      yield put(registerUserFailure({ error: data['msg'] }));
    }
  } catch (error) {
    yield put(registerUserFailure(error));
  }
  console.log('sign up saga finished');
  // yield console.log('userLoginStart Saga fired');
}

export function* signInWithEmail({
  payload,
}: {
  type: typeof UserActionTypes.LOGIN_USER_REQUEST;
  payload: UserLoginInfo;
}): Generator<PutEffect | CallEffect | void, void, unknown> {
  // yield console.log('emailSignInStart saga triggered');

  console.log('login call started');
  try {
    // const { tenant, email, password } = payload;
    const { email, password } = payload;
    // console.log('signInWithEmail saga - tenant: ' + tenant);
    // console.log('signInWithEmail saga - email: ' + email);
    // console.log('signInWithEmail saga - password: ' + password);
    // perform login
    const response: any = yield call(api_refresh.post, '/api/auth/login', {
      username: email,
      password: password,
    });
    const data = response.data;

    const accessToken = data['access_token'];
    const refreshToken = data['refresh_token'];
    const tenant = data['tenant'];
    console.log(data);

    if (accessToken) {
      yield put(
        loginUserSuccess({
          email: email,
          accessToken: accessToken,
          refreshToken: refreshToken,
          tenant: tenant,
        })
      );
      // yield history.push('/');
    } else {
      yield put(loginUserFailure({ error: data['msg'] }));
    }
  } catch (error) {
    yield put(loginUserFailure(error));
  }
  // yield console.log('userLoginStart Saga fired');
}

// export function* resetPassword({ payload: { tenant, email } }) {
export function* resetPassword({
  payload,
}: {
  type: typeof UserActionTypes.RESET_PASSWORD_REQUEST;
  payload: UserTenantEmail;
}): Generator<PutEffect | CallEffect, void, unknown> {
  console.log('password reset saga started');
  try {
    const { tenant, email } = payload;
    console.log('reset password - tenant: ' + tenant);
    console.log('reset password - email: ' + email);
    //initiate password reset process
    // const response = yield fetch('/api/auth/reset-password',{
    //     method: 'post',
    //     headers: {'Content-Type':'application/json'},
    //     body: JSON.stringify({
    //         username: email,
    //     })
    // });

    const response: any = yield call(
      api_refresh.post,
      '/api/auth/reset-password',
      {
        username: email,
      }
    );

    console.log(response);
    // const data = response.data

    // yield console.log(response);
    // const data = yield response.json();
    // const accessToken = data['access_token'];
    // const refreshToken = data['refresh_token'];
    // console.log('access token: ' + accessToken);

    const a = 1;
    if (a === 1) {
      yield put(resetPasswordSuccess({ msg: 'success', tenant: tenant }));
    } else {
      yield put(resetPasswordFailure({ error: 'error' }));
    }
  } catch (error) {
    yield put(resetPasswordFailure(error));
  }
  console.log('userLoginStart Saga fired');
}

// export function* setNewPassword({ payload: { tenant, email, password, code } }) {
export function* setNewPassword({
  payload,
}: {
  type: typeof UserActionTypes.SET_NEW_PASSWORD_REQUEST;
  payload: UserNewPassword;
}): Generator<PutEffect | CallEffect, void, unknown> {
  console.log('set new password saga started');
  try {
    const { email, password, code } = payload;
    console.log(email, password, code);
    //initiate password reset process
    // const response = yield fetch('/api/auth/set-new-password',{
    //     method: 'post',
    //     headers: {'Content-Type':'application/json'},
    //     body: JSON.stringify({
    //         username: email,
    //         password: password,
    //         code: code
    //     })
    // });
    // yield console.log(response);
    // const data = yield response.json();

    const response: any = yield call(
      api_refresh.post,
      '/api/auth/set-new-password',
      {
        username: email,
        password: password,
        code: code,
      }
    );
    const data = response.data;

    console.log(data);
    // const accessToken = data['access_token'];
    // const refreshToken = data['refresh_token'];
    // console.log('access token: ' + accessToken);

    const a = 1;
    if (a === 1) {
      yield put(setNewPasswordSuccess({ msg: 'success' }));
    } else {
      yield put(setNewPasswordFailure({ error: 'error' }));
    }
  } catch (error) {
    yield put(setNewPasswordFailure(error));
  }
  console.log('userLoginStart Saga fired');
}

export function* setNewPasswordSuccessSaga({
  payload,
}: {
  type: typeof UserActionTypes.SET_NEW_PASSWORD_SUCCESS;
  payload: UserSuccessMessage;
}): Generator<PutEffect | CallEffect, void, unknown> {
  console.log('create tenant success saga started');

  const { msg } = payload;
  yield put(
    openModal({
      modalProps: { title: 'User successfully activated' },
      modalType: 'ModalDialogInfo',
      modalContent: msg,
    })
  );
  history.push('/login/');

  console.log('create tenant success saga finished');
}

// export function* setNewPassword({ payload: { tenant, email, password, code } }) {
export function* selectLanguageSaga({
  payload,
}: {
  type: typeof UserActionTypes.SET_LANGUAGE;
  payload: UserLanguage;
}): Generator<void, void, unknown> {
  yield console.log('selectLanguage saga started');
  try {
    const { language } = payload;
    i18n.changeLanguage(language);
    console.log('selectLanguage Saga language: ', language);
  } catch (error) {
    console.log('selectLanguage error');
  }
  console.log('selectLanguage Saga finished');
}

export function* checkUserTenantSaga({
  payload,
}: {
  type: typeof UserActionTypes.CHECK_USER_TENANT_REQUEST;
  payload: TenantInfo;
}): Generator<SelectEffect | PutEffect, void, unknown> {
  console.log('checkUserTenantSaga started');
  try {
    const { tenant } = payload;
    const user_tenant = yield select(selectCurrentTenant);
    console.log(tenant + ' === ' + user_tenant);
    if (tenant === user_tenant) {
      console.log('checkUserTenantSaga success');
    } else {
      console.log('checkUserTenantSaga failed');
      yield put(checkUserTenantFailure({ error: 'error' }));
    }
  } catch (error) {
    console.log('checkUserTenantSaga error');
  }
}

export function* logoutUserSaga(): Generator<void, void, unknown> {
  console.log('logoutUserStart started');
  try {
    // const { tenant } = payload;
    yield history.push('/');
    console.log('logoutUserStart finshed');
  } catch (error) {
    console.log('logoutUserStart error');
  }
}

export function* loginUserRedirectSage(): Generator<void, void, unknown> {
  // {
  // payload,
  // }: {
  // type: typeof UserActionTypes.LOGIN_USER_SUCCESS;
  // payload: RefreshTokenFailure;
  // }
  console.log('loginUserRedirectSage started');
  try {
    // const { tenant } = payload;
    yield history.push('/');
    console.log('loginUserRedirectSage finshed');
  } catch (error) {
    console.log('loginUserRedirectSage error');
  }
}

export function* emailSignUpStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(UserActionTypes.REGISTER_USER_REQUEST, signUpWithEmail);
}

export function* emailSignInStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(UserActionTypes.LOGIN_USER_REQUEST, signInWithEmail);
}

export function* resetPasswordStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(UserActionTypes.RESET_PASSWORD_REQUEST, resetPassword);
}

export function* setNewPasswordStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(UserActionTypes.SET_NEW_PASSWORD_REQUEST, setNewPassword);
}

export function* setNewPasswordSuccessStart(): Generator<
  ForkEffect,
  void,
  unknown
> {
  yield takeLatest(
    UserActionTypes.SET_NEW_PASSWORD_SUCCESS,
    setNewPasswordSuccessSaga
  );
}

export function* selectLanguageStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(UserActionTypes.SET_LANGUAGE, selectLanguageSaga);
}

export function* checkUserTenantStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(
    UserActionTypes.CHECK_USER_TENANT_REQUEST,
    checkUserTenantSaga
  );
}

export function* logoutUserStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(UserActionTypes.LOGOUT_USER, logoutUserSaga);
}

export function* loginUserRedirectStart(): Generator<
  ForkEffect,
  void,
  unknown
> {
  yield takeLatest(UserActionTypes.LOGIN_USER_SUCCESS, loginUserRedirectSage);
}
