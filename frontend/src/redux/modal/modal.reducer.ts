import { ModalAction, ModalState, ModalActionTypes } from './modal.types';
import { modalComponentLookupTable } from '../../components/modal-dialog/modal-manager.components';

const INITIAL_STATE = {
  // modalType: 'ModalDialogSimple' as const,
  modalType: 'ModalDialogSimple' as keyof typeof modalComponentLookupTable,
  modalProps: {},
  visible: false,
  modalContent: '',
};

export function modalReducer(
  state = INITIAL_STATE,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case ModalActionTypes.MODAL_OPEN:
      return {
        ...state,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
        modalContent: action.payload.modalContent,
        visible: true,
      };
    case ModalActionTypes.MODAL_CLOSE:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
}
