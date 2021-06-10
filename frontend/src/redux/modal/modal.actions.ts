import { ModalAction, ModalActionTypes, ModalInfos } from './modal.types';

export function openModal(newModalInfos: ModalInfos): ModalAction {
  return {
    type: ModalActionTypes.MODAL_OPEN,
    payload: newModalInfos,
  };
}

export function closeModal(): ModalAction {
  return {
    type: ModalActionTypes.MODAL_CLOSE,
  };
}
