import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
  started: boolean;
  success: boolean;
  errorMessage: string;
}

export interface BasicMessage {
  msg: string;
}

export interface FormUploadRequest {
  formData: FormData;
}

const initialState: DataState = {
  started: false,
  success: false,
  errorMessage: '',
};

const data = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataImportFromCsvStart(state, action: PayloadAction<FormUploadRequest>) {
      state.started = true;
      state.success = false;
      state.errorMessage = '';
    },
    dataImportFromCsvSuccess(state) {
      state.started = false;
      state.success = true;
      state.errorMessage = '';
    },
    dataImportFromCsvFailure(state, action: PayloadAction<BasicMessage>) {
      state.started = false;
      state.success = false;
      state.errorMessage = action.payload.msg;
    },
  },
});

export const {
  dataImportFromCsvStart,
  dataImportFromCsvSuccess,
  dataImportFromCsvFailure,
} = data.actions;

export default data.reducer;
