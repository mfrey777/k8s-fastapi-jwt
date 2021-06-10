import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export interface ModalBlockingState {
  modalType: string;
  modalTitle: string;
  modalText: string;
}

export interface ModalBlockingRequest {
  modalType: string;
  modalTitle: string;
  modalText: string;
}

const initialState: ModalBlockingState = {
  modalType: '',
  modalTitle: '',
  modalText: '',
};

const modalBlocking = createSlice({
  name: 'modalBlocking',
  initialState,
  reducers: {
    setModalBlockingInfo(state, action: PayloadAction<ModalBlockingRequest>) {
      state.modalType = action.payload.modalType;
      state.modalTitle = action.payload.modalTitle;
      state.modalText = action.payload.modalText;
    },
  },
});

export const modalBlockingConfirm = createAction(
  'modalBlocking/modalBlockingConfirm'
);

export const { setModalBlockingInfo } = modalBlocking.actions;

export default modalBlocking.reducer;
