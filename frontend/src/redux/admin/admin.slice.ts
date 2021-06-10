import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
  started: boolean;
  success: boolean;
  errorMessage: string;
  createFromExcelStarted: boolean;
  createFromExcelSuccess: boolean;
  createFromExcelErrorMessage: string;
}

export interface BasicMessage {
  msg: string;
}

export interface FormUploadRequest {
  formData: FormData;
}

const initialState: AdminState = {
  started: false,
  success: false,
  errorMessage: '',
  createFromExcelStarted: false,
  createFromExcelSuccess: false,
  createFromExcelErrorMessage: '',
};

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    adminProcessStart(state, action: PayloadAction<FormUploadRequest>) {
      state.started = true;
      state.success = false;
      state.errorMessage = '';
    },
    adminProcessSuccess(state) {
      state.started = false;
      state.success = true;
      state.errorMessage = '';
    },
    adminProcessFailure(state, action: PayloadAction<BasicMessage>) {
      state.started = false;
      state.success = false;
      state.errorMessage = action.payload.msg;
    },
    createFromExcelStart(state, action: PayloadAction<FormUploadRequest>) {
      state.createFromExcelStarted = true;
      state.createFromExcelSuccess = false;
      state.createFromExcelErrorMessage = '';
    },
    createFromExcelSuccess(state) {
      state.createFromExcelStarted = false;
      state.createFromExcelSuccess = true;
      state.createFromExcelErrorMessage = '';
    },
    createFromExcelFailure(state, action: PayloadAction<BasicMessage>) {
      state.createFromExcelStarted = false;
      state.createFromExcelSuccess = false;
      state.createFromExcelErrorMessage = action.payload.msg;
    },
  },
});

export const {
  adminProcessStart,
  adminProcessSuccess,
  adminProcessFailure,
  createFromExcelStart,
  createFromExcelSuccess,
  createFromExcelFailure,
} = admin.actions;

export default admin.reducer;
