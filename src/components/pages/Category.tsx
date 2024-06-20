"use client";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useGetCategoriesQuery } from "../../../lib/features/category/categoryApi";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../lib/hooks";
import { ModalType, openModal } from "../../../lib/features/modal/ModalSlice";
import WithProtectedRoute from "../hoc/WithProtectedRoute";
import CategoryItem from "../category/CategoryItem";

const Category = () => {
  const dispatch: Dispatch = useAppDispatch();
  const { data, error, isLoading, refetch } = useGetCategoriesQuery();

  const handleShowAddModal = () => {
    dispatch(
      openModal({
        modalType: ModalType.addCategory,
      })
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Typography sx={{ fontSize: "1.25rem", fontWeight: 700 }}>
          Danh sách Danh mục
        </Typography>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "var(--text-white)",
          }}
          onClick={handleShowAddModal}
        >
          Thêm danh mục
        </Button>
      </Box>
      <List
        sx={{
          overflow: "scroll",
        }}
      >
        {data &&
          data.map((item) => (
            <ListItem key={item.Id}>
              <CategoryItem data={item} />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default WithProtectedRoute(Category);
