import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

const reportState = (state: RootState) => state.report;

export const selectReport = createSelector([reportState], (report) => report);

// export const selectTenantTenantId = createSelector(
//   [selectTenant],
//   (tenant) => tenant.tenant_id
// );

// export const selectTenantValidated = createSelector(
//   [selectTenant],
//   (tenant) => tenant.validated
// );

// export const selectTenantTimestamp = createSelector(
//   [selectTenant],
//   (tenant) => tenant.timestamp
// );

// export const selectTenantStatus = createSelector(
//   [selectTenant],
//   (tenant) => tenant.status
// );
