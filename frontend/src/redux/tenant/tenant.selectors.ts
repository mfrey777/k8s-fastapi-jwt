import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

const selectTenant = (state: RootState) => state.tenant;

export const selectTenantTenantId = createSelector(
  [selectTenant],
  (tenant) => tenant.tenant_id
);

export const selectTenantValidated = createSelector(
  [selectTenant],
  (tenant) => tenant.validated
);

export const selectTenantTimestamp = createSelector(
  [selectTenant],
  (tenant) => tenant.timestamp
);

export const selectTenantStatus = createSelector(
  [selectTenant],
  (tenant) => tenant.status
);

export const selectTenantGlobalExists = createSelector(
  [selectTenant],
  (tenant) => tenant.global_exists
);
