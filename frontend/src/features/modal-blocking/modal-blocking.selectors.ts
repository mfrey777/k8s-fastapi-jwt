import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

const selectSlice = (state: RootState) => state.modalBlocking;

export const selectModalBlockingType = createSelector(
  [selectSlice],
  (modalBlocking) => modalBlocking.modalType
);

export const selectModalBlockingTitle = createSelector(
  [selectSlice],
  (modalBlocking) => modalBlocking.modalTitle
);

export const selectModalBlockingText = createSelector(
  [selectSlice],
  (modalBlocking) => modalBlocking.modalText
);
