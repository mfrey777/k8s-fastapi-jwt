export interface ModalConfirmState {
  modalType: string;
  modalTitle: string;
  modalText: string;
}

export interface ModalConfirmRequest {
  modalType: string;
  modalTitle: string;
  modalText: string;
}

export enum ModalConfirmActionTypes {
  SET_CONFIRM_MODAL_TYPE = 'SET_CONFIRM_MODAL_TYPE',
  MODAL_CONFIRM = 'MODAL_CONFIRM',
  MODAL_CANCEL = 'MODAL_CANCEL',
}

export interface setConfirmModalTypeAction {
  type: ModalConfirmActionTypes.SET_CONFIRM_MODAL_TYPE;
  payload: ModalConfirmRequest;
}

export interface modalConfirmAction {
  type: ModalConfirmActionTypes.MODAL_CONFIRM;
}

export interface modalCancelAction {
  type: ModalConfirmActionTypes.MODAL_CANCEL;
}

export type ModalConfirmAction =
  | setConfirmModalTypeAction
  | modalConfirmAction
  | modalCancelAction;
