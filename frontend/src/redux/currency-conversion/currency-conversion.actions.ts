import {
  CurrencyConversionAction,
  CurrencyConversionSetting,
  CurrencyConversionMessage,
  CurrencyConversionRequest,
  CurrencyConversionResponse,
  CurrencyConversionActionTypes,
} from './currency-conversion.types';

export function saveCurrencyConversionSettings(
  newCurrencyConversionSetting: CurrencyConversionSetting
): CurrencyConversionAction {
  return {
    type: CurrencyConversionActionTypes.SAVE_CURRENCY_CONVERSION_SETTINGS,
    payload: newCurrencyConversionSetting,
  };
}

export function currencyConversionRequest(
  newCurrencyConversionRequest: CurrencyConversionRequest
): CurrencyConversionAction {
  return {
    type: CurrencyConversionActionTypes.CURRENCY_CONVERSION_REQUEST,
    payload: newCurrencyConversionRequest,
  };
}

export function currencyConversionSuccess(
  newCurrencyConversionResponse: CurrencyConversionResponse
): CurrencyConversionAction {
  return {
    type: CurrencyConversionActionTypes.CURRENCY_CONVERSION_SUCCESS,
    payload: newCurrencyConversionResponse,
  };
}

export function currencyConversionFailure(
  newCurrencyConversionMessage: CurrencyConversionMessage
): CurrencyConversionAction {
  return {
    type: CurrencyConversionActionTypes.CURRENCY_CONVERSION_FAILURE,
    payload: newCurrencyConversionMessage,
  };
}
