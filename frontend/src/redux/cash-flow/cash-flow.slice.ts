import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createAction } from '@reduxjs/toolkit';

export interface CashFlowState {
  selection: string;
  is_running: boolean;
  is_succesfull: boolean;
  status_text: string;
  data: any[];
  data_html: string;
  // info: {};
  // info: Record<string, unknown>;
  info: string;
}

export interface CashFlowMessage {
  msg: string;
}

// export interface CashFlowSetting {
//   name: string;
//   value: string;
// }

export interface CashFlowRequest {
  // tenant: string;
  formData: FormData;
  output: string;
}

export interface CashFlowResponse {
  report: string;
  data: any[];
  data_html: string;
  info: string;
}

const initialState = {
  selection: '',
  is_running: false,
  is_succesfull: false,
  status_text: '',
  data: [[{ va: 'Empty', fo: 'std', st: '', ed: 'False' }]],
  data_html: '',
  // info: {},
  info: '',
};

const general = createSlice({
  name: 'general',
  initialState,
  reducers: {
    cashFlowRequest(state, action: PayloadAction<CashFlowRequest>) {
      (state.is_running = true), (state.is_succesfull = false);
    },
    cashFlowSuccess(state, action: PayloadAction<CashFlowResponse>) {
      (state.is_running = false),
        (state.is_succesfull = true),
        (state.data = action.payload.data),
        (state.data_html = action.payload.data_html),
        (state.info = action.payload.info);
    },
    cashFlowFailure(state, action: PayloadAction<CashFlowMessage>) {
      (state.is_running = false), (state.is_succesfull = false);
    },
    // saveCashFlowSettings(state, action: PayloadAction<CashFlowSetting>) {
    //   state[action.payload.name] = action.payload.value;
    // },
  },
});

// export const protectedApiStart = createAction<ExtendedMessage>(
//   'general/protectedApiStart'
// );

// export const protectedApiCheckProfileStart = createAction<ExtendedMessage>(
//   'general/protectedApiCheckProfileStart'
// );

// export const publicApiStart = createAction('general/publicApiStart');

// export const echoApiStart = createAction<BasicMessage>('general/echoApiStart');

// export const formUploadStart = createAction<FormUploadnRequest>(
//   'general/formUpload'
// );

export const {
  cashFlowRequest,
  cashFlowSuccess,
  cashFlowFailure,
  // saveCashFlowSettings,
} = general.actions;

export default general.reducer;
