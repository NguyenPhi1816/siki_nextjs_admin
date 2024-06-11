import { createSlice } from "@reduxjs/toolkit";

export enum ModalType {
  addCategory,
}

export enum CloseAction {
  doNothing,
  refetchData,
}

interface IModalSliceState {
  showModal: boolean;
  modalType: ModalType | null;
  modalProps: any | null;
  closeAction: CloseAction;
}

const initialState: IModalSliceState = {
  showModal: false,
  modalType: null,
  modalProps: null,
  closeAction: CloseAction.doNothing,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state, action) => {
      state.showModal = false;
      state.modalType = null;
      state.modalProps = null;
      state.closeAction = action.payload.closeAction;
    },
    resetCloseAction: (state) => {
      state.closeAction = CloseAction.doNothing;
    },
  },
  selectors: {
    selectShowModal: (modal) => modal.showModal,
    selectModalType: (modal) => modal.modalType,
    selectModalProps: (modal) => modal.modalProps,
    selectCloseAction: (modal) => modal.closeAction,
  },
});

export const { openModal, closeModal, resetCloseAction } = modalSlice.actions;

export const {
  selectShowModal,
  selectModalProps,
  selectModalType,
  selectCloseAction,
} = modalSlice.selectors;

export default modalSlice.reducer;
