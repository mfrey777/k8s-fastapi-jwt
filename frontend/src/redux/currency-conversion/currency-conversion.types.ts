export interface CurrencyConversionState {
  measure: string;
  currency: string;
  masterdata: string;
  masterdata_file: File;
  masterdata_filename: string;
  rules: string;
  rules_file: File;
  rules_filename: string;
  rates: string;
  rates_file: File;
  rates_filename: string;
  data: string;
  data_file: File;
  data_filename: string;
  data_selection: string;
  is_running: boolean;
  is_succesfull: boolean;
  status_text: string;
  converted_data: any[];
}

export interface CurrencyConversionMessage {
  msg: string;
}

export interface CurrencyConversionRequest {
  tenant: string;
  formData: FormData;
}

export interface CurrencyConversionSetting {
  name: string;
  filename: string;
  value: File;
}

export interface CurrencyConversionResponse {
  tableData: any[];
}

export enum CurrencyConversionActionTypes {
  SAVE_CURRENCY_CONVERSION_SETTINGS = 'SAVE_CURRENCY_CONVERSION_SETTINGS',
  CURRENCY_CONVERSION_REQUEST = 'CURRENCY_CONVERSION_REQUEST',
  CURRENCY_CONVERSION_SUCCESS = 'CURRENCY_CONVERSION_SUCCESS',
  CURRENCY_CONVERSION_FAILURE = 'CURRENCY_CONVERSION_FAILURE',
}

export interface saveCurrencyConversionSettingsAction {
  type: CurrencyConversionActionTypes.SAVE_CURRENCY_CONVERSION_SETTINGS;
  payload: CurrencyConversionSetting;
}

export interface currencyConversionRequestAction {
  type: CurrencyConversionActionTypes.CURRENCY_CONVERSION_REQUEST;
  payload: CurrencyConversionRequest;
}

export interface currencyConversionSuccessAction {
  type: CurrencyConversionActionTypes.CURRENCY_CONVERSION_SUCCESS;
  payload: CurrencyConversionResponse;
}

export interface currencyConversionFailureAction {
  type: CurrencyConversionActionTypes.CURRENCY_CONVERSION_FAILURE;
  payload: CurrencyConversionMessage;
}

export type CurrencyConversionAction =
  | saveCurrencyConversionSettingsAction
  | currencyConversionRequestAction
  | currencyConversionSuccessAction
  | currencyConversionFailureAction;
