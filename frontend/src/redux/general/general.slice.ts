import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export interface GeneralState {
  public_message: string;
  protected_message: string;
  echo_message: string;
  user: string;
  status: string;
}

export interface BasicMessage {
  msg: string;
}

export interface ExtendedMessage {
  msg: string;
  user: string;
  tenant: string;
}

export interface FormUploadnRequest {
  formData: FormData;
}

const initialState: GeneralState = {
  public_message: 'initial',
  protected_message: 'initial',
  echo_message: 'initial',
  status: '',
  user: '',
};

const general = createSlice({
  name: 'general',
  initialState,
  reducers: {
    protectedApiSuccess(state, action: PayloadAction<ExtendedMessage>) {
      state.status = 'success';
      state.protected_message = action.payload.msg;
      state.user = action.payload.user;
    },
    protectedApiFailure(state, action: PayloadAction<ExtendedMessage>) {
      state.status = 'failure';
      state.protected_message = action.payload.msg;
      state.user = action.payload.user;
    },
    protectedApiCheckProfileSuccess(
      state,
      action: PayloadAction<ExtendedMessage>
    ) {
      state.status = 'success';
      state.protected_message = action.payload.msg;
      state.user = action.payload.user;
    },
    protectedApiCheckProfileFailure(
      state,
      action: PayloadAction<ExtendedMessage>
    ) {
      state.status = 'failure';
      state.protected_message = action.payload.msg;
      state.user = action.payload.user;
    },
    publicApiSuccess(state, action: PayloadAction<BasicMessage>) {
      state.status = 'success';
      state.public_message = action.payload.msg;
    },
    publicApiFailure(state, action: PayloadAction<BasicMessage>) {
      state.status = 'failure';
      state.public_message = action.payload.msg;
    },
    echoApiSuccess(state, action: PayloadAction<BasicMessage>) {
      state.status = 'success';
      state.public_message = action.payload.msg;
    },
    echoApiFailure(state, action: PayloadAction<BasicMessage>) {
      state.status = 'failure';
      state.public_message = action.payload.msg;
    },
  },
});

export const protectedApiStart = createAction<ExtendedMessage>(
  'general/protectedApiStart'
);

export const protectedApiCheckProfileStart = createAction<ExtendedMessage>(
  'general/protectedApiCheckProfileStart'
);

export const publicApiStart = createAction('general/publicApiStart');

export const echoApiStart = createAction<BasicMessage>('general/echoApiStart');

export const formUploadStart = createAction<FormUploadnRequest>(
  'general/formUpload'
);

export const {
  protectedApiSuccess,
  protectedApiFailure,
  protectedApiCheckProfileSuccess,
  protectedApiCheckProfileFailure,
  publicApiSuccess,
  publicApiFailure,
  echoApiSuccess,
  echoApiFailure,
} = general.actions;

export default general.reducer;
