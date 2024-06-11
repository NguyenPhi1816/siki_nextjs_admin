"use client";
import { Dispatch } from "@reduxjs/toolkit";
import {
  CloseAction,
  closeModal,
  selectShowModal,
} from "../../../lib/features/modal/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import AddCategoryModal from "./AddCategoryModal";

const ModalManager = () => {
  const dispatch: Dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectShowModal);

  const handleCloseAddCategoryModal = () => {
    dispatch(closeModal({ closeAction: CloseAction.doNothing }));
  };

  return (
    <>
      <AddCategoryModal open={isOpen} onClose={handleCloseAddCategoryModal} />
    </>
  );
};

export default ModalManager;
