import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export interface TenantState {
  tenant_id: string;
  validated: boolean;
  timestamp: number;
  status: string;
  global_exists: boolean;
}

export interface TenantCreateRequest {
  tenant_id: string;
  tenant_desc: string;
  email: string;
}

export interface TenantGlobalCreateRequest {
  password: string;
  email: string;
}

export interface TenantDeleteRequest {
  tenant_id: string;
}

export interface TenantMessage {
  message: string;
}

export interface TenantCheckRequest {
  tenant_id: string;
}

export interface TenantCheckSuccess {
  tenant_id: string;
  status: string;
}

const initialState = {
  tenant_id: '',
  validated: false,
  timestamp: 0,
  status: '',
  global_exists: false,
};

const tenant = createSlice({
  name: 'general',
  initialState,
  reducers: {
    createTenantSuccess(state, action: PayloadAction<TenantMessage>) {
      state.status = action.payload.message;
    },
    createTenantFailure(state, action: PayloadAction<TenantMessage>) {
      state.status = action.payload.message;
    },
    createGlobalTenantSuccess(state, action: PayloadAction<TenantMessage>) {
      state.status = action.payload.message;
    },
    createGlobalTenantFailure(state, action: PayloadAction<TenantMessage>) {
      state.status = action.payload.message;
    },
    deleteTenantSuccess(state, action: PayloadAction<TenantMessage>) {
      state.status = action.payload.message;
    },
    deleteTenantFailure(state, action: PayloadAction<TenantMessage>) {
      state.status = action.payload.message;
    },
    checkTenantSuccess(state, action: PayloadAction<TenantCheckSuccess>) {
      state.status = action.payload.status;
      state.tenant_id = action.payload.tenant_id;
      state.validated = true;
      state.timestamp = Date.now();
    },
    checkTenantFailure(state, action: PayloadAction<TenantMessage>) {
      state.status = action.payload.message;
      state.tenant_id = '';
      state.validated = false;
      state.timestamp = 0;
    },
    checkGlobalTenantSuccess(state) {
      state.global_exists = true;
    },
    checkGlobalTenantFailure(state) {
      state.global_exists = false;
    },
  },
});

export const {
  createTenantSuccess,
  createTenantFailure,
  createGlobalTenantSuccess,
  createGlobalTenantFailure,
  deleteTenantSuccess,
  deleteTenantFailure,
  checkTenantSuccess,
  checkTenantFailure,
  checkGlobalTenantSuccess,
  checkGlobalTenantFailure,
} = tenant.actions;

// Actions without reducer (triggering sagas)
export const createTenantRequest = createAction<TenantCreateRequest>(
  'tenant/createTenantRequest'
);

export const createGlobalTenantRequest = createAction<TenantGlobalCreateRequest>(
  'tenant/createGlobalTenantRequest'
);

export const deleteTenantRequest = createAction<TenantDeleteRequest>(
  'tenant/deleteTenantRequest'
);

export const checkTenantRequest = createAction<TenantCheckRequest>(
  'tenant/checkTenantRequest'
);

export const checkGlobalTenantRequest = createAction(
  'tenant/checkGlobalTenantRequest'
);

// export reducer
export default tenant.reducer;
