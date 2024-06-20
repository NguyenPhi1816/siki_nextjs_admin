"use client";
import { Clear } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import {
  useSaveCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../lib/features/category/categoryApi";
import { useAppSelector } from "../../../lib/hooks";
import {
  ModalType,
  selectModalProps,
  selectModalType,
} from "../../../lib/features/modal/ModalSlice";
import { CategoryRequest, UpdateCategoryRequest } from "@/types/category";
import { selectTokens } from "../../../lib/features/auth/authSlice";
import { useCreateMediaMutation } from "../../../lib/features/media/mediaApi";
import UploadImage from "./UploadImage";

interface ICategoryModal {
  open: boolean;
  onClose: () => void;
}

const CategoryModal: React.FC<ICategoryModal> = ({ open, onClose }) => {
  const [
    saveCategory,
    { isLoading: saveLoading, data: saveData, error: saveError, isSuccess },
  ] = useSaveCategoryMutation();

  const [
    updateCategory,
    {
      isLoading: updateLoading,
      data: updateData,
      error: updateError,
      isSuccess: isUpdateSucess,
    },
  ] = useUpdateCategoryMutation();

  const [createMedia] = useCreateMediaMutation();
  const modalProps = useAppSelector(selectModalProps);
  const modalType = useAppSelector(selectModalType);
  const tokens = useAppSelector(selectTokens);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [defaultName, setDefaultName] = useState<string>("");
  const [defaultDesc, setDefaultDesc] = useState<string>("");

  const [defaultImage, setDefaultImage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (modalProps) {
      const categoryIdProp: number = modalProps.id;
      if (categoryIdProp) {
        setCategoryId(categoryIdProp);
      }
    }
  }, [modalProps]);

  useEffect(() => {
    if (modalType === ModalType.editCategory) {
      const nameProp: string = modalProps.name;
      const imageProp: string = modalProps.image;
      const descProp: string = modalProps.desc;

      setDefaultName(nameProp);
      setDefaultImage(imageProp);
      setDefaultDesc(descProp);
    }
  }, [modalType]);

  const handleSaveCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const desc = formData.get("desc");

    switch (modalType) {
      case ModalType.addCategory:
        if (name && image && desc) {
          const { data: mediaData, error } = await createMedia([image as File]);
          if (error) {
            console.log(error);
          } else if (mediaData) {
            const categoryRequest: CategoryRequest = {
              token: tokens.accessToken as string,
              name: name.toString(),
              image: mediaData.paths[0],
              desc: desc.toString(),
            };
            await saveCategory(categoryRequest);
          }
        }
        break;
      case ModalType.editCategory:
        let imageUrl = defaultImage;
        if (image && isImageChanged) {
          const { data: mediaData, error } = await createMedia([image as File]);
          if (error) {
            console.log(error);
            break;
          }
          if (mediaData) {
            setIsImageChanged(false);
            setDefaultImage(mediaData.paths[0]);
            imageUrl = mediaData.paths[0];
          }
        }
        if (categoryId && name && imageUrl && desc) {
          const categoryRequest: UpdateCategoryRequest = {
            token: tokens.accessToken as string,
            id: categoryId,
            name: name.toString(),
            image: imageUrl,
            desc: desc.toString(),
          };

          await updateCategory(categoryRequest);
        }
        break;
      default:
        break;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdateSucess) {
      onClose();
    }
  }, [isUpdateSucess]);

  const handleClose = () => {
    setDefaultName("");
    setDefaultImage("");
    setDefaultDesc("");
    setCategoryId(null);
    setImage(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-add-category"
      aria-describedby="modal-modal-add-category-to-db"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          padding: "1rem",
          maxWidth: "30rem",
          bgcolor: "var(--bg-white)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
            {modalType === ModalType.addCategory && "Thêm danh mục"}
            {modalType === ModalType.editCategory && "Chỉnh sửa danh mục"}
          </Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <UploadImage
            value={defaultImage}
            onChange={(file) => {
              setIsImageChanged(true);
              setImage(file);
            }}
          />
        </Box>
        <form onSubmit={handleSaveCategory}>
          <TextField
            required
            fullWidth
            id="name"
            label="Tên danh mục"
            name="name"
            defaultValue={defaultName}
            sx={{ marginBottom: "0.5rem" }}
          />
          <TextField
            required
            fullWidth
            id="desc"
            label="Mô tả"
            name="desc"
            defaultValue={defaultDesc}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Button
            variant="contained"
            sx={{
              padding: "0.5rem",
              width: "100%",
              color: "var(--text-white)",
            }}
            type="submit"
          >
            {isLoading && (
              <CircularProgress
                color="inherit"
                size={"1.5rem"}
                sx={{ marginRight: "1rem" }}
              />
            )}
            {modalType === ModalType.addCategory && "Thêm"}
            {modalType === ModalType.editCategory && "Lưu"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
