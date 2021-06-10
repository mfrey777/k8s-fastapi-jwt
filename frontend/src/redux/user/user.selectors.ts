import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsAuthenticated = createSelector(
  [selectUser],
  (user) => user.isAuthenticated
);

export const selectLanguage = createSelector(
  [selectUser],
  (user) => user.language
);

export const selectCurrentTenant = createSelector(
  [selectUser],
  (user) => user.tenant
);

export const selectAccessToken = createSelector(
  [selectUser],
  (user) => user.accessToken
);

export const selectSignInError = createSelector(
  [selectUser],
  (user) => user.signInError
);
