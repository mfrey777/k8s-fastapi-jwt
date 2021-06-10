import {
  takeLatest,
  put,
  call,
  ForkEffect,
  PutEffect,
  CallEffect,
} from 'redux-saga/effects';

// import { CashFlowRequest, CashFlowActionTypes } from './cash-flow.slice';
import {
  cashFlowRequest,
  cashFlowSuccess,
  cashFlowFailure,
} from './cash-flow.slice';

import { api } from '../../utils/api';

export function* CashFlow(
  action: ReturnType<typeof cashFlowRequest>
): Generator<
  PutEffect | CallEffect | string | HTMLAnchorElement,
  void,
  unknown
> {
  // const { tenant, formData, output } = payload;
  const { formData, output } = action.payload;
  console.log('CashFlow saga started');
  if (output === 'html') {
    try {
      const response: any = yield call(
        api.post,
        // '/' + tenant + '/api/calc/visual-cash-flow',
        '/api/calc/visual-cash-flow',
        formData
      );
      // yield console.log(response);
      const json = response.data;
      console.log('json object:');
      console.log(json);
      yield put(cashFlowSuccess(json));
    } catch (error) {
      yield put(cashFlowFailure(error));
    }
  } else {
    try {
      console.log('excel object:');
      api.defaults.responseType = 'blob';
      const response: any = yield call(
        api.post,
        // '/' + tenant + '/api/calc/visual-cash-flow-excel',
        '/api/calc/visual-cash-flow-excel',
        formData
      );
      console.log('response received:');
      // 1. Read blob from data
      const blob = response.data;
      // 2. Create blob link to download
      const url = yield window.URL.createObjectURL(new Blob([blob]));
      const link: any = yield document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sample.xlsx`);
      // 3. Append to html page
      document.body.appendChild(link);
      // 4. Force download
      link.click();
      // 5. Clean up and remove the link
      link.parentNode.removeChild(link);
      // yield console.log(response);
      const json = response.data;
      console.log('json object:');
      console.log(json);
      yield put(cashFlowSuccess(json));
    } catch (error) {
      yield put(cashFlowFailure(error));
    }
  }

  // yield console.log('userLoginStart Saga fired');
}

export function* CashFlowStart(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(cashFlowRequest.type, CashFlow);
}
