import {
  ModalConfirmAction,
  ModalConfirmActionTypes,
  ModalConfirmRequest,
} from './modal-confirm.types';

export function setConfirmModalType(
  newModalConfirmRequest: ModalConfirmRequest
): ModalConfirmAction {
  return {
    type: ModalConfirmActionTypes.SET_CONFIRM_MODAL_TYPE,
    payload: newModalConfirmRequest,
  };
}

export function modalConfirm(): ModalConfirmAction {
  return {
    type: ModalConfirmActionTypes.MODAL_CONFIRM,
  };
}

export function modalCancel(): ModalConfirmAction {
  return {
    type: ModalConfirmActionTypes.MODAL_CANCEL,
  };
}
