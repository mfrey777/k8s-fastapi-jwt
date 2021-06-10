import {
  takeLatest,
  put,
  call,
  ForkEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';

import {
  reportRequest,
  reportSuccess,
  reportFailure,
  createReportRequest,
  createReportSuccess,
  createReportFailure,
} from './report.slice';

import { api } from '../../utils/api';

export function* Report(
  action: ReturnType<typeof reportRequest>
): Generator<ForkEffect | CallEffect | PutEffect, void, unknown> {
  // const { tenant, formData } = payload;
  const { formData } = action.payload;
  console.log('Report saga started');
  try {
    const response: any = yield call(api.post, '/api/report/query', formData);
    // yield console.log(response);
    const json: any = yield response.data;
    console.log('json object:');
    console.log(json);
    if (response.status === 200) {
      yield put(reportSuccess(json));
    } else {
      yield put(reportFailure({ msg: json.msg }));
    }
  } catch (error) {
    yield put(reportFailure({ msg: error }));
  }
  // yield console.log('userLoginStart Saga fired');
}

export function* CreateReport(
  action: ReturnType<typeof createReportRequest>
): Generator<ForkEffect | CallEffect | PutEffect, void, unknown> {
  // const { tenant, formData } = payload;
  const { formData } = action.payload;
  console.log('Report saga started');
  try {
    const response: any = yield call(
      api.post,
      '/api/report/create-report',
      formData
    );
    // yield console.log(response);
    const json: any = yield response.data;
    console.log('json object:');
    console.log(json);
    yield put(createReportSuccess(json));
  } catch (error) {
    yield put(createReportFailure(error));
  }
  // yield console.log('userLoginStart Saga fired');
}

export function* ReportStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(reportRequest.type, Report);
}

export function* CreateReportStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(createReportRequest.type, CreateReport);
}
