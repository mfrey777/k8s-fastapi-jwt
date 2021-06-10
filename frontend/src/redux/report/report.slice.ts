import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export interface ReportState {
  selection: string;
  is_running: boolean;
  is_succesfull: boolean;
  status_text: string;
  report_data: any[];
  // report_info: {};
  // report_info: Record<string, unknown>;
  report_info: string;
  error_message: string;
}

export interface ReportMessage {
  msg: string;
}

export interface ReportSetting {
  name: string;
  value: string;
}

export interface ReportRequest {
  formData: FormData;
}

export interface CreateReportRequest {
  formData: FormData;
}

export interface ReportResponse {
  report: any[];
  report_info: string;
}

const initialState: ReportState = {
  selection: '',
  is_running: false,
  is_succesfull: false,
  status_text: '',
  report_data: [[{ va: 'Empty', fo: 'std', st: '', ed: 'False' }]],
  // report_info: {},
  report_info: '',
  error_message: '',
};

const report = createSlice({
  name: 'report',
  initialState,
  reducers: {
    reportRequest(state, action: PayloadAction<ReportRequest>) {
      state.is_running = true;
    },
    reportSuccess(state, action: PayloadAction<ReportResponse>) {
      state.is_running = false;
      state.is_succesfull = true;
      state.report_data = action.payload.report;
      state.report_info = action.payload.report_info;
    },
    reportFailure(state, action: PayloadAction<ReportMessage>) {
      state.is_running = false;
      state.is_succesfull = false;
      state.error_message = action.payload.msg;
    },
    // saveReportSettings(state, action: PayloadAction<ReportSetting>) {
    //   state.[action.payload.name]= action.payload.value,
    //   state.
    // },
  },
});

export const createReportRequest = createAction<CreateReportRequest>(
  'report/createReportRequest'
);

export const createReportSuccess = createAction<string>(
  'report/createReportSuccess'
);

export const createReportFailure = createAction<string>(
  'report/createReportFailure'
);

export const { reportRequest, reportSuccess, reportFailure } = report.actions;

export default report.reducer;
