import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createAction } from '@reduxjs/toolkit';

// export interface modelMessageRequest {
//   model: string;
// }

export interface modelMessageSuccess {
  modelInfos: Record<string, modelInfo>[];
}

export interface modelMessageError {
  error: string;
}

export interface dimensionInfo {
  dimension_name: string;
  hierarchy_list: string[];
}

export interface modelInfo {
  model_name: string;
  dimension_list: Record<string, dimensionInfo>[] | undefined;
}

export interface InfoState {
  models: Record<string, modelInfo>[] | undefined;
  loading: boolean;
  error: boolean;
  error_message: string;
}

const initialState: InfoState = {
  models: undefined,
  loading: false,
  error: false,
  error_message: '',
};

const info = createSlice({
  name: 'info',
  initialState,
  reducers: {
    // modelInfosStart(state, action: PayloadAction<modelMessageRequest>) {
    modelInfosStart(state) {
      state.loading = true;
      state.error = false;
      state.error_message = '';
    },
    modelInfosSuccess(state, action: PayloadAction<modelMessageSuccess>) {
      state.loading = false;
      state.error = false;
      state.models = action.payload.modelInfos;
    },
    modelInfosFailure(state, action: PayloadAction<modelMessageError>) {
      state.loading = false;
      state.error = true;
      state.error_message = action.payload.error;
    },
  },
});

// export const protectedApiStart = createAction<ExtendedMessage>(
//   'general/protectedApiStart'
// );

export const {
  modelInfosStart,
  modelInfosSuccess,
  modelInfosFailure,
} = info.actions;

export default info.reducer;
