import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

const selectGeneral = (state: RootState) => state.general;

// export const selectProtectedMessage = () => createSelector([selectGeneral], general => general.protected_message);
export const selectProtectedMessage = createSelector(
  [selectGeneral],
  (general) => general.protected_message
);

// export const selectPublicMessage = () => createSelector([selectGeneral], general => general.public_message);
export const selectPublicMessage = createSelector(
  [selectGeneral],
  (general) => general.public_message
);

export const selectEchoMessage = createSelector(
  [selectGeneral],
  (general) => general.echo_message
);
