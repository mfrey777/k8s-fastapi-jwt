import {
  takeLatest,
  put,
  call,
  ForkEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';

import {
  dataImportFromCsvStart,
  dataImportFromCsvSuccess,
  dataImportFromCsvFailure,
} from './data.slice';

import { api } from '../../utils/api';

export function* dataImportFromCsv(
  action: ReturnType<typeof dataImportFromCsvStart>
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
      '/api/data/import-data-from-csv',
      formData
    );
    // yield console.log(response);
    const json: any = yield response.data;
    console.log(json);
    yield put(dataImportFromCsvSuccess());
  } catch (error) {
    console.log(error);
    yield put(dataImportFromCsvFailure({ msg: error }));
  }
}

export function* dataImportFromCsvStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(dataImportFromCsvStart.type, dataImportFromCsv);
}
