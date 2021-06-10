import { combineReducers } from 'redux';

// Reducers
import { userReducer } from './user/user.reducer';
import generalReducer from './general/general.slice';
import { currencyConversionReducer } from './currency-conversion/currency-conversion.reducer';
import reportReducer from './report/report.slice';
import cashFlowReducer from './cash-flow/cash-flow.slice';
import tenantReducer from './tenant/tenant.slice';
import { modalReducer } from './modal/modal.reducer';
import { modalConfirmReducer } from './modal-confirm/modal-confirm.reducer';
import modalBlockingReducer from '../features/modal-blocking/modal-blocking.slice';
import adminReducer from './admin/admin.slice';
import dataReducer from './data/data.slice';
import infoReducer from './info/info.slice';
import pagesReducer from './pages/pages.slice';

export const rootReducer = combineReducers({
  user: userReducer,
  general: generalReducer,
  currencyConversion: currencyConversionReducer,
  report: reportReducer,
  cashFlow: cashFlowReducer,
  tenant: tenantReducer,
  modal: modalReducer,
  modalConfirm: modalConfirmReducer,
  modalBlocking: modalBlockingReducer,
  admin: adminReducer,
  data: dataReducer,
  info: infoReducer,
  pages: pagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export default rootReducer;
