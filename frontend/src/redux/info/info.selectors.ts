import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

const selectSlice = (state: RootState) => state.info;

// export const selectProtectedMessage = () => createSelector([selectGeneral], general => general.protected_message);
export const selectModels = createSelector(
  [selectSlice],
  (slice) => slice.models
);

// export const selectPublicMessage = () => createSelector([selectGeneral], general => general.public_message);
export const selectLoading = createSelector(
  [selectSlice],
  (slice) => slice.loading
);

export const selectError = createSelector(
  [selectSlice],
  (slice) => slice.error
);
