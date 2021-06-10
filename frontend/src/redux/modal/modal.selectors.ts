import { createSelector } from 'reselect';
import { RootState } from '../../redux/root.reducer';

const selectModal = (state: RootState) => state.modal;

export const selectModalVisible = createSelector(
  [selectModal],
  (modal) => modal.visible
);

export const selectModalType = createSelector(
  [selectModal],
  (modal) => modal.modalType
);

export const selectModalProps = createSelector(
  [selectModal],
  (modal) => modal.modalProps
);

export const selectModalContent = createSelector(
  [selectModal],
  (modal) => modal.modalContent
);
