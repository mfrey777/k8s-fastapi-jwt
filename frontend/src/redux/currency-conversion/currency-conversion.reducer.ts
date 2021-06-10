import {
  CurrencyConversionActionTypes,
  CurrencyConversionAction,
  CurrencyConversionState,
} from './currency-conversion.types';

const INITIAL_STATE = {
  measure: 'ytd',
  currency: 'global',
  masterdata: 'online',
  masterdata_file: new File([''], 'filename'),
  masterdata_filename: '',
  rules: 'online',
  rules_file: new File([''], 'filename'),
  rules_filename: '',
  rates: 'online',
  rates_file: new File([''], 'filename'),
  rates_filename: '',
  data: 'online',
  data_file: new File([''], 'filename'),
  data_filename: '',
  data_selection: 'CATEGORY=ACTUAL;TIME=2019.09;ENTITY=2000,2200',
  is_running: false,
  is_succesfull: false,
  status_text: '',
  converted_data: [{ msg: '' }],
};

export function currencyConversionReducer(
  state = INITIAL_STATE,
  action: CurrencyConversionAction
): CurrencyConversionState {
  switch (action.type) {
    case CurrencyConversionActionTypes.SAVE_CURRENCY_CONVERSION_SETTINGS:
      return {
        ...state,
        // [action.payload['name']]: action.payload['value']
        [action.payload.name]: action.payload.value,
        [action.payload.name + 'name']: action.payload.filename,
        // measure: action.payload.measure,
        // currency: action.payload.currency,
        // masterdata: action.payload.masterdata,
        // masterdata_file: action.payload.masterdata_file,
        // rules: action.payload.rules,
        // rules_file: action.payload.rules_file,
        // rates: action.payload.rates,
        // rates_file: action.payload.rates_file,
        // data_file: action.payload.data_file
      };
    case CurrencyConversionActionTypes.CURRENCY_CONVERSION_REQUEST:
      return {
        ...state,
        is_running: true,
      };
    case CurrencyConversionActionTypes.CURRENCY_CONVERSION_SUCCESS:
      return {
        ...state,
        is_running: false,
        is_succesfull: true,
        // json parse required as dataframe json is returned as string
        converted_data: JSON.parse(action.payload.tableData.toString()),
      };
    case CurrencyConversionActionTypes.CURRENCY_CONVERSION_FAILURE:
      return {
        ...state,
        is_running: false,
        is_succesfull: false,
      };
    default:
      return state;
  }
}

export default currencyConversionReducer;
