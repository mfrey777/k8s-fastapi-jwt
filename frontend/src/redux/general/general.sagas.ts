import {
  takeLatest,
  put,
  call,
  ForkEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';

import {
  protectedApiStart,
  protectedApiSuccess,
  protectedApiFailure,
  publicApiStart,
  publicApiSuccess,
  publicApiFailure,
  protectedApiCheckProfileStart,
  protectedApiCheckProfileFailure,
  protectedApiCheckProfileSuccess,
  echoApiStart,
  echoApiSuccess,
  echoApiFailure,
  formUploadStart,
} from './general.slice';

import { api } from '../../utils/api';

export function* getProtectedApi(): Generator<
  // action: ReturnType<typeof protectedApiStart>
  ForkEffect | CallEffect | PutEffect,
  void,
  unknown
> {
  // console.log('getProtectedApi saga started');
  // console.log('action: ');
  // console.log(action);

  try {
    // const { tenant } = action.payload;
    // console.log('getProtectedApi() saga 1');
    const data: any = yield call(api.get, '/api/test/protected');
    // const data: any = yield call(api.get, '/' + tenant + '/api/test/protected');
    // const data: any = yield call(generalApi.getPublicMessage);
    // console.log('getProtectedApi() saga 2');
    // console.log('data:');
    // console.log(typeof data);
    // console.log(data);
    const json = data.data;
    if (data && !data.err && data.status === 200) {
      // if (data) {
      yield put(protectedApiSuccess(json));
    } else {
      yield put(protectedApiFailure(json));
    }
  } catch (err) {
    console.log('error occured');
  }
}

export function* getProtectedApiCheckProfile(
  action: ReturnType<typeof protectedApiCheckProfileStart>
): Generator<ForkEffect | CallEffect | PutEffect, void, unknown> {
  console.log('getProtectedApiCheckProfile saga started');
  console.log('action: ');
  console.log(action);

  try {
    // const { tenant } = action.payload;
    // console.log('getProtectedApi() saga 1');
    const data: any = yield call(
      api.get,
      // '/' + tenant + '/api/test/protected-check-profile'
      '/api/test/protected-check-profile'
    );
    // const data: any = yield call(generalApi.getPublicMessage);
    // console.log('getProtectedApi() saga 2');
    // console.log('data:');
    // console.log(typeof data);
    // console.log(data);
    const json = data.data;
    if (data && !data.err && data.status === 200) {
      // if (data) {
      yield put(protectedApiCheckProfileSuccess(json));
    } else {
      yield put(protectedApiCheckProfileFailure(json));
      // console.log('protectedApiCheckProfileFailure: ');
      // console.log(json);
    }
  } catch (err) {
    console.log('error occured');
    const { tenant } = action.payload;
    yield put(
      protectedApiCheckProfileFailure({
        msg: 'api called failed',
        user: '',
        tenant: tenant,
      })
    );
  }
}

export function* getPublicApi(): Generator<
  CallEffect | PutEffect,
  void,
  unknown
> {
  // console.log('getPublicApi saga started');
  // console.log('action: ');
  // console.log(action);

  try {
    // const data = yield call(api.get, '/api/test/public');
    // console.log('getPublicApi() saga 1');

    // const data: any = yield call(generalApi.getPublicMessage);
    // console.log('getPublicApi() saga 2');
    // console.log('data:');
    // console.log(typeof data);
    // console.log(data);
    // console.log('getPublicApi() saga started');
    const data: any = yield call(api.get, '/api/test/public');

    // console.log('data:');
    // console.log(typeof data);
    // console.log(data);
    const json = data.data;
    // console.log('json:');
    // console.log(json);

    if (data && !data.err && data.status === 200) {
      yield put(publicApiSuccess(json));
    } else {
      yield put(publicApiFailure(json));
    }
  } catch (err) {
    // console.log('error occured');
  }
  // console.log('getPublicApi() saga finsshed');
}

export function* echoApi(
  action: ReturnType<typeof echoApiStart>
): Generator<CallEffect | PutEffect, void, unknown> {
  try {
    // console.log('echoApi() saga started');
    const { msg } = action.payload;
    const data: any = yield call(api.post, '/api/test/echo', { msg });
    const json = data.data;

    if (data && !data.err && data.status === 200) {
      yield put(echoApiSuccess(json));
    } else {
      yield put(echoApiFailure(json));
    }
  } catch (err) {
    // console.log('error occured');
  }
  // console.log('getPublicApi() saga finsshed');
}

export function* formUpload(
  action: ReturnType<typeof formUploadStart>
): Generator<
  PutEffect | CallEffect | string | HTMLAnchorElement,
  void,
  unknown
> {
  // const { tenant, formData } = payload;
  const { formData } = action.payload;
  // export function* currencyConversion({payload : { tenant, formData }}) {
  console.log('Form Uplaod saga started');
  try {
    const response: any = yield call(
      api.post,
      // '/' + tenant + '/api/calc/convert',
      '/api/test/form-upload',
      formData
    );
    // yield console.log(response);
    const json: any = yield response.data;
    console.log(json);
    // yield put(currencyConversionSuccess(json));
  } catch (error) {
    console.log(error);
    // yield put(currencyConversionFailure(error));
  }
}

export function* protectedApiStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(protectedApiStart.type, getProtectedApi);
}

export function* protectedApiCheckProfileStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    protectedApiCheckProfileStart.type,
    getProtectedApiCheckProfile
  );
}

export function* publicApiStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(publicApiStart.type, getPublicApi);
}

export function* echoApiStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(echoApiStart.type, echoApi);
}

export function* formUploadStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(formUploadStart.type, formUpload);
}
