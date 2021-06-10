import {
  takeLatest,
  put,
  call,
  ForkEffect,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';

import {
  modelInfosStart,
  modelInfosSuccess,
  modelInfosFailure,
} from './info.slice';

import { api } from '../../utils/api';

export function* modelInfos(): Generator<
  // action: ReturnType<typeof modelInfosStart>
  ForkEffect | CallEffect | PutEffect,
  void,
  unknown
> {
  try {
    // const { model } = action.payload;
    // const data: any = yield call(api.get, 'api/info/model-infos/' + model);
    const data: any = yield call(api.get, 'api/info/model-infos');
    const json = data.data;
    if (data && !data.err && data.status === 200) {
      // if (data) {
      console.log('modelInfos api response json.data: ');
      console.log(json.data);
      yield put(modelInfosSuccess({ modelInfos: json.data }));
    } else {
      yield put(modelInfosFailure(data.err));
    }
  } catch (err) {
    console.log('error occured');
  }
}

export function* modelInfosStartSaga(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(modelInfosStart.type, modelInfos);
}
