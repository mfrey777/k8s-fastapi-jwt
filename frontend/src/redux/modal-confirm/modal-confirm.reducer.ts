import {
  ModalConfirmAction,
  ModalConfirmState,
  ModalConfirmActionTypes,
} from './modal-confirm.types';

const INITIAL_STATE = {
  modalType: '',
  modalTitle: '',
  modalText: '',
};

export function modalConfirmReducer(
  state = INITIAL_STATE,
  action: ModalConfirmAction
): ModalConfirmState {
  switch (action.type) {
    case ModalConfirmActionTypes.SET_CONFIRM_MODAL_TYPE:
      return {
        ...state,
        modalType: action.payload.modalType,
        modalTitle: action.payload.modalTitle,
        modalText: action.payload.modalType,
      };
    default:
      return state;
  }
}
