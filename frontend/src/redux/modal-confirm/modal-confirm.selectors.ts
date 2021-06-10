import { createSelector } from 'reselect';
import { RootState } from '../root.reducer';

const selectModalConfirm = (state: RootState) => state.modalConfirm;

export const selectModalType = createSelector(
  [selectModalConfirm],
  (modalConfirm) => modalConfirm.modalType
);

export const selectModalTitle = createSelector(
  [selectModalConfirm],
  (modalConfirm) => modalConfirm.modalTitle
);

export const selectModalText = createSelector(
  [selectModalConfirm],
  (modalConfirm) => modalConfirm.modalText
);
