"use client";
import { Dispatch } from "@reduxjs/toolkit";
import {
  CloseAction,
  ModalType,
  closeModal,
  selectModalType,
  selectShowModal,
} from "../../../lib/features/modal/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import CategoryModal from "./CategoryModal";
import ProductModal from "./ProductModal";
import OptionValueModal from "./OptionValueModal";
const ModalManager = () => {
  const dispatch: Dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectShowModal);
  const modalType = useAppSelector(selectModalType);

  const handleCloseAddCategoryModal = () => {
    dispatch(closeModal({ closeAction: CloseAction.doNothing }));
  };

  const handleCloseProductModal = () => {
    dispatch(closeModal({ closeAction: CloseAction.doNothing }));
  };

  return (
    <>
      <CategoryModal
        open={
          isOpen &&
          (modalType === ModalType.addCategory ||
            modalType === ModalType.editCategory)
        }
        onClose={handleCloseAddCategoryModal}
      />

      <ProductModal
        open={isOpen && modalType === ModalType.addProduct}
        onClose={handleCloseProductModal}
      />
    </>
  );
};

export default ModalManager;
