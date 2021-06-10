// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { modalComponentLookupTable } from '../../components/modal-dialog/modal-manager.components';

// import { Modal } from 'antd';

// export interface ModalInfos {
//   modalType: keyof typeof modalComponentLookupTable;
//   modalProps: React.ComponentProps<typeof Modal>;
//   modalContent: string;
// }
// export interface ModalState extends ModalInfos {
//   visible: boolean;
// }

// // removed typing of initalState, is that OK ?
// const initialState: ModalState = {
//   modalType: 'ModalDialogSimple' as keyof typeof modalComponentLookupTable,
//   modalProps: {},
//   visible: false,
//   modalContent: '',
// };

// const modal = createSlice({
//   name: 'modal',
//   initialState,
//   reducers: {
//     openModal(state, action: PayloadAction<ModalInfos>) {
//       state.modalType = action.payload.modalType;
//       state.modalProps = action.payload.modalProps;
//       state.modalContent = action.payload.modalContent;
//       state.visible = true;
//     },
//     closeModal(state) {
//       state.visible = false;
//     },
//   },
// });

// export const { openModal, closeModal } = modal.actions;

// export default modal.reducer;
export default console.log('empty file');
