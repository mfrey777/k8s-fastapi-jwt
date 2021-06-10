import { all, call, AllEffect, CallEffect } from 'redux-saga/effects';

import {
  emailSignInStart,
  resetPasswordStart,
  setNewPasswordStart,
  setNewPasswordSuccessStart,
  emailSignUpStart,
  selectLanguageStart,
  checkUserTenantStart,
  loginUserRedirectStart,
} from './user/user.sagas';
import {
  publicApiStartSaga,
  protectedApiStartSaga,
  protectedApiCheckProfileStartSaga,
  echoApiStartSaga,
  formUploadStartSaga,
  // protectedApiSuccessSaga,
} from './general/general.sagas';
import { currencyConversionStart } from './currency-conversion/currency-conversion.sagas';
import { ReportStart, CreateReportStart } from './report/report.sagas';
import { CashFlowStart } from './cash-flow/cash-flow.sagas';
import {
  createTenantStart,
  createGlobalTenantStart,
  deleteTenantStart,
  checkTenantStart,
  // checkGlobalTenantStart,
} from './tenant/tenant.sagas';
import {
  adminProcessStartSaga,
  createFromExcelStartSaga,
} from './admin/admin.sagas';
import { dataImportFromCsvStartSaga } from './data/data.sagas';
import { modelInfosStartSaga } from './info/info.sagas';

export default function* rootSaga(): Generator<
  AllEffect<CallEffect<void>>,
  void,
  unknown
> {
  yield all([
    call(emailSignUpStart),
    call(emailSignInStart),
    call(protectedApiStartSaga),
    call(protectedApiCheckProfileStartSaga),
    call(publicApiStartSaga),
    call(echoApiStartSaga),
    call(formUploadStartSaga),
    call(createGlobalTenantStart),
    call(resetPasswordStart),
    call(setNewPasswordStart),
    call(setNewPasswordSuccessStart),
    call(selectLanguageStart),
    call(currencyConversionStart),
    call(ReportStart),
    call(CreateReportStart),
    call(CashFlowStart),
    call(createTenantStart),
    // call(createTenantSuccessStart),
    call(deleteTenantStart),
    call(checkTenantStart),
    // call(checkGlobalTenantStart),
    call(checkUserTenantStart),
    call(loginUserRedirectStart),
    call(adminProcessStartSaga),
    call(createFromExcelStartSaga),
    call(dataImportFromCsvStartSaga),
    call(modelInfosStartSaga),
  ]);
}
