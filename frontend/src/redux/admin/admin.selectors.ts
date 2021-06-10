import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';

const selectSlice = (state: RootState) => state.admin;

export const selectStarted = createSelector(
  [selectSlice],
  (slice) => slice.started
);

export const selectSuccess = createSelector(
  [selectSlice],
  (slice) => slice.success
);

export const selectErrorMessage = createSelector(
  [selectSlice],
  (slice) => slice.errorMessage
);
