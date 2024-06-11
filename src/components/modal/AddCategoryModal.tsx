"use client";
import { Clear } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useSaveCategoryMutation,
} from "../../../lib/features/category/categoryApi";
import { useAppSelector } from "../../../lib/hooks";
import { selectModalProps } from "../../../lib/features/modal/ModalSlice";
import { CategoryRequest, ICategory } from "@/types/category";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { headers } from "next/headers";
import { selectTokens } from "../../../lib/features/auth/authSlice";

interface IAddCategoryModal {
  open: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<IAddCategoryModal> = ({ open, onClose }) => {
  // const { data, error, refetch, isLoading } = useGetCategoriesQuery();
  const [
    saveCategory,
    { isLoading: saveLoading, data: saveData, error: saveError },
  ] = useSaveCategoryMutation();
  const modalProps = useAppSelector(selectModalProps);
  const tokens = useAppSelector(selectTokens);

  const [parentId, setParentId] = useState<string>("");

  const { data, isLoading, isError, isSuccess } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:8090/api/products/category/parents").then((res) =>
        res.json()
      ),
  });

  // const mutation = useMutation({
  //   mutationFn: (newCategory: CategoryRequest) => {
  //     return axios.post(
  //       "http://localhost:8090/api/products/backoffice/category",
  //       { mode: "no-cors", body: newCategory }
  //     );
  //   },
  // });

  useEffect(() => {
    if (modalProps) {
      const parentIdProp: string = modalProps.parentId;
      if (parentIdProp) {
        setParentId(parentIdProp);
      } else {
        setParentId("");
      }
    }
  }, [modalProps]);

  const handleSaveCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const image = formData.get("image");
    const desc = formData.get("desc");

    if (name && image && desc) {
      const categoryRequest: CategoryRequest = {
        name: name.toString(),
        image: image.toString(),
        desc: desc.toString(),
        parentId: parentId === "" ? null : parentId,
      };
      await saveCategory(categoryRequest);
    }
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
            Thêm danh mục
          </Typography>
          <IconButton onClick={onClose}>
            <Clear />
          </IconButton>
        </Box>
        <form onSubmit={handleSaveCategory}>
          <TextField
            required
            fullWidth
            id="name"
            label="Tên danh mục"
            name="name"
            sx={{ marginBottom: "0.5rem" }}
          />
          <TextField
            required
            fullWidth
            id="image"
            label="Liên kết hình ảnh"
            name="image"
            sx={{ marginBottom: "0.5rem" }}
          />
          <TextField
            required
            fullWidth
            id="desc"
            label="Mô tả"
            name="desc"
            sx={{ marginBottom: "0.5rem" }}
          />
          {data && (
            <FormControl fullWidth sx={{ marginBottom: "0.5rem" }}>
              <InputLabel id="demo-simple-select-label">
                Danh mục cha
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parentId}
                label="Danh mục cha"
                onChange={(e) => setParentId(e.target.value as string)}
              >
                {data.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            variant="contained"
            sx={{
              padding: "0.5rem",
              width: "100%",
              color: "var(--text-white)",
            }}
            type="submit"
          >
            {/* {saveLoading && (
              <CircularProgress
                color="inherit"
                size={"1.5rem"}
                sx={{ marginRight: "1rem" }}
              />
            )} */}
            Thêm
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
