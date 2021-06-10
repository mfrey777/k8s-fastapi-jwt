import {
  takeLatest,
  put,
  call,
  PutEffect,
  CallEffect,
  ForkEffect,
} from 'redux-saga/effects';
import {
  createTenantRequest,
  createTenantSuccess,
  createTenantFailure,
  createGlobalTenantRequest,
  createGlobalTenantSuccess,
  createGlobalTenantFailure,
  deleteTenantRequest,
  deleteTenantSuccess,
  deleteTenantFailure,
  checkTenantRequest,
  checkTenantSuccess,
  checkTenantFailure,
  checkGlobalTenantSuccess,
  checkGlobalTenantFailure,
} from './tenant.slice';
import { openModal } from '../modal/modal.actions';

import { checkUserTenantRequest } from '../user/user.actions';

import { api_refresh } from '../../utils/api';

import { history } from '../../index';
import { confirmSaga } from '../modal-confirm/modal-confirm-sagas';
import { modalBlockingSaga } from '../../features/modal-blocking/modal-blocking.sagas';
import { redirectSubdomain } from '../../utils/utils';

// export const redirectToSubdomain = () =>
//   (window.location.href = 'https://www.google.com');

export function* createTenant(
  action: ReturnType<typeof createTenantRequest>
): Generator<PutEffect | CallEffect, void, unknown> {
  // yield console.log('emailSignInStart saga triggered');
  // yield console.log('username: ' + email);
  // yield console.log('password: ' + password);

  console.log('create tenant saga started');
  try {
    const isConfirm = yield call(confirmSaga, {
      modalType: 'confirm',
      modalTitle: 'Tenant creation',
      modalText: 'Please confirm tenant creation',
    });

    if (isConfirm) {
      // const { tenant_id, tenant_desc, email, password } = payload;
      const { tenant_id, tenant_desc, email } = action.payload;

      // perform login
      const response: any = yield call(
        api_refresh.post,
        '/api/admin/create-tenant',
        {
          tenant_id: tenant_id,
          tenant_desc: tenant_desc,
          email: email,
          // password: password,
        }
      );
      const data = response.data;

      const msg = data['msg'];
      console.log(msg);

      if (msg) {
        yield put(createTenantSuccess({ message: msg }));
        yield put(
          openModal({
            modalProps: { title: 'Success' },
            modalType: 'ModalDialogInfo',
            modalContent: msg,
          })
        );
        history.push('/');
      } else {
        yield put(createTenantFailure({ message: data['msg'] }));
      }
    }
  } catch (error) {
    yield put(createTenantFailure(error));
  }
  console.log('create tenant saga finished');
}

export function* createGlobalTenant(
  action: ReturnType<typeof createGlobalTenantRequest>
): Generator<PutEffect | CallEffect, void, unknown> {
  // yield console.log('emailSignInStart saga triggered');
  // yield console.log('username: ' + email);
  // yield console.log('password: ' + password);

  console.log('create global tenant saga started');
  try {
    const isConfirm = yield call(confirmSaga, {
      modalType: 'confirm',
      modalTitle: 'Tenant creation',
      modalText: 'Please confirm global tenant creation',
    });

    if (isConfirm) {
      // const { tenant_id, tenant_desc, email, password } = payload;
      const { password, email } = action.payload;

      // perform login
      const response: any = yield call(
        api_refresh.post,
        '/api/admin/create-global-tenant',
        {
          password: password,
          email: email,
        }
      );
      const data = response.data;

      const msg = data['msg'];
      console.log(msg);

      if (msg) {
        yield put(createGlobalTenantSuccess({ message: msg }));
        yield put(
          openModal({
            modalProps: { title: 'Success' },
            modalType: 'ModalDialogInfo',
            modalContent: msg,
          })
        );
        // history.push('/global/');
        yield call(redirectSubdomain, 'global');
      } else {
        yield put(createGlobalTenantFailure({ message: data['msg'] }));
      }
    }
  } catch (error) {
    yield put(createGlobalTenantFailure(error));
  }
  console.log('create global tenant saga finished');
}

export function* deleteTenant(
  action: ReturnType<typeof deleteTenantRequest>
): Generator<PutEffect | CallEffect, void, unknown> {
  console.log('delete tenant saga started');
  try {
    const { tenant_id } = action.payload;

    // perform login
    const response: any = yield call(
      api_refresh.post,
      '/api/auth/delete-tenant',
      {
        tenant_id: tenant_id,
      }
    );
    const data = response.data;

    const msg = data['msg'];
    console.log(msg);

    if (msg) {
      yield put(deleteTenantSuccess({ message: msg }));
    } else {
      yield put(deleteTenantFailure({ message: data['msg'] }));
    }
  } catch (error) {
    yield put(deleteTenantFailure(error));
  }
  console.log('delete tenant saga finished');
}

export function* checkTenant(
  action: ReturnType<typeof checkTenantRequest>
): Generator<PutEffect | CallEffect, void, unknown> {
  // console.log('check tenant saga started');
  try {
    const { tenant_id } = action.payload;

    // perform login
    const response: any = yield call(
      api_refresh.post,
      '/api/admin/check-tenant-exists',
      {
        tenant_id: tenant_id,
      }
    );
    const data = response.data;

    const tenant_exists = data['tenant_exists'];
    const global_tenant_exists = data['global_tenant_exists'];
    // console.log(msg);

    if (tenant_exists) {
      yield put(checkTenantSuccess({ tenant_id: tenant_id, status: 'true' }));
      yield put(checkUserTenantRequest({ tenant: tenant_id }));
    } else {
      if (global_tenant_exists) {
        yield put(checkGlobalTenantSuccess());
        // history.push('https://www.google.com');
        const isConfirm = yield call(modalBlockingSaga, {
          modalType: 'blocking',
          modalTitle: 'Tenant does not exist',
          modalText:
            'This tenant does not exist, you will be forwarded to the main page',
        });
        if (isConfirm) {
          yield call(redirectSubdomain, 'app', '/select-tenant');
        }
      } else {
        yield put(checkGlobalTenantFailure());
        const isConfirm = yield call(modalBlockingSaga, {
          modalType: 'blocking',
          modalTitle: 'System has not been initialized',
          modalText:
            'This System has not been initialized, please contact your administrator',
        });
        if (isConfirm) {
          yield call(redirectSubdomain, 'app', '/initialize-system');
        }
      }
      // history.push('/');
      // yield put(push('/missing'));
    }
  } catch (error) {
    yield put(checkTenantFailure(error));
  }
  // console.log('check tenant saga finished');
}

export function* createTenantStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(createTenantRequest.type, createTenant);
}

export function* createGlobalTenantStart(): Generator<
  ForkEffect,
  void,
  unknown
> {
  yield takeLatest(createGlobalTenantRequest.type, createGlobalTenant);
}

export function* deleteTenantStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(deleteTenantRequest.type, deleteTenant);
}

export function* checkTenantStart(): Generator<ForkEffect, void, unknown> {
  yield takeLatest(checkTenantRequest.type, checkTenant);
}
