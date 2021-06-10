import {
  takeLatest,
  put,
  call,
  ForkEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';

import {
  adminProcessStart,
  adminProcessSuccess,
  adminProcessFailure,
  createFromExcelStart,
  createFromExcelSuccess,
  createFromExcelFailure,
} from './admin.slice';

import { api } from '../../utils/api';

export function* adminProcess(
  action: ReturnType<typeof adminProcessStart>
): Generator<
  PutEffect | CallEffect | string | HTMLAnchorElement,
  void,
  unknown
> {
  const { formData } = action.payload;
  console.log('adminProcess saga started');
  try {
    const response: any = yield call(
      api.post,
      '/api/admin/import-xml',
      formData
    );
    // yield console.log(response);
    const json: any = yield response.data;
    console.log(json);
    yield put(adminProcessSuccess());
  } catch (error) {
    console.log(error);
    yield put(adminProcessFailure({ msg: error }));
  }
}

export function* createFromExcel(
  action: ReturnType<typeof createFromExcelStart>
): Generator<
  PutEffect | CallEffect | string | HTMLAnchorElement,
  void,
  unknown
> {
  const { formData } = action.payload;
  console.log('createFromExcel saga started');
  try {
    const response: any = yield call(
      api.post,
      '/api/admin/import-excel',
      formData
    );
    // yield console.log(response);
    const json: any = yield response.data;
    console.log(json);
    yield put(createFromExcelSuccess());
  } catch (error) {
    console.log(error);
    yield put(createFromExcelFailure({ msg: error }));
  }
}

export function* adminProcessStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(adminProcessStart.type, adminProcess);
}

export function* createFromExcelStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(createFromExcelStart.type, createFromExcel);
}
