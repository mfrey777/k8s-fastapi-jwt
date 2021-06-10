// import ModalDialogSimple from '../../components/modal-dialog/modal-dialog-simple.components';
import { modalComponentLookupTable } from '../../components/modal-dialog/modal-manager.components';
import { Modal } from 'antd';

// export const modalComponentLookupTable = {
//   ModalDialogSimple: ModalDialogSimple,
// };

export interface ModalState {
  modalType: keyof typeof modalComponentLookupTable;
  modalProps: React.ComponentProps<typeof Modal>;
  visible: boolean;
  modalContent: string;
}

export interface ModalInfos {
  modalType: keyof typeof modalComponentLookupTable;
  modalProps: React.ComponentProps<typeof Modal>;
  modalContent: string;
}

export enum ModalActionTypes {
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',
}

export interface openModalAction {
  type: ModalActionTypes.MODAL_OPEN;
  payload: ModalInfos;
}

export interface closeModalAction {
  type: ModalActionTypes.MODAL_CLOSE;
}

export type ModalAction = openModalAction | closeModalAction;
