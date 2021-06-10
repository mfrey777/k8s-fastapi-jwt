import {
  takeLatest,
  put,
  call,
  PutEffect,
  CallEffect,
  ForkEffect,
} from 'redux-saga/effects';

import {
  CurrencyConversionRequest,
  CurrencyConversionActionTypes,
} from './currency-conversion.types';
import {
  currencyConversionSuccess,
  currencyConversionFailure,
} from './currency-conversion.actions';

import { api } from '../../utils/api';

export function* currencyConversion({
  payload,
}: {
  type: CurrencyConversionActionTypes.CURRENCY_CONVERSION_REQUEST;
  payload: CurrencyConversionRequest;
}): Generator<
  PutEffect | CallEffect | string | HTMLAnchorElement,
  void,
  unknown
> {
  // const { tenant, formData } = payload;
  const { formData } = payload;
  // export function* currencyConversion({payload : { tenant, formData }}) {
  console.log('Currency conversion saga started');
  try {
    const response: any = yield call(
      api.post,
      // '/' + tenant + '/api/calc/convert',
      '/api/calc/convert',
      formData
    );
    // yield console.log(response);
    const json: any = yield response.data;
    console.log(json);
    yield put(currencyConversionSuccess(json));
  } catch (error) {
    yield put(currencyConversionFailure(error));
  }
}

export function* currencyConversionStart(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(
    CurrencyConversionActionTypes.CURRENCY_CONVERSION_REQUEST,
    currencyConversion
  );
}
