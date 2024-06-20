"use client";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import WithProtectedRoute from "../hoc/WithProtectedRoute";
import { useGetCategoriesQuery } from "../../../lib/features/category/categoryApi";
import { useEffect, useState } from "react";
import { useGetBaseProducstByCategorySlugMutation } from "../../../lib/features/product/productApi";
import ProductItem from "../product/ProductItem";
import { useAppDispatch } from "../../../lib/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { ModalType, openModal } from "../../../lib/features/modal/ModalSlice";

const Product = () => {
  const dispatch: Dispatch = useAppDispatch();
  const {
    data: categories,
    error: categoryError,
    isLoading: isCategoryLoading,
    refetch: categoryRefetch,
  } = useGetCategoriesQuery();

  const [
    getBaseProducstByCategorySlug,
    { data: baseProducts, error, isLoading },
  ] = useGetBaseProducstByCategorySlugMutation();

  const [categorySlug, setCategorySlug] = useState<string>("_");

  const handleShowProductModal = () => {
    dispatch(
      openModal({
        modalType: ModalType.addProduct,
      })
    );
  };

  useEffect(() => {
    const getBaseProducts = async () => {
      await getBaseProducstByCategorySlug(categorySlug);
    };
    getBaseProducts();
  }, [categorySlug]);

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
          Danh sách Sản phẩm
        </Typography>

        <Box width={"40%"}>
          {categories && (
            <FormControl fullWidth sx={{ marginBottom: "0.5rem" }}>
              <InputLabel id="demo-simple-select-label">
                Danh mục sản phẩm
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categorySlug}
                label="Danh mục sản phẩm"
                onChange={(e) => setCategorySlug(e.target.value as string)}
              >
                <MenuItem value={"_"}>Tất cả sản phẩm</MenuItem>
                {categories.map((item) => (
                  <MenuItem key={item.Id} value={item.Slug}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "var(--text-white)",
          }}
          onClick={handleShowProductModal}
        >
          Thêm sản phẩm
        </Button>
      </Box>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            color="inherit"
            size={"2rem"}
            sx={{ marginRight: "1rem" }}
          />
        </Box>
      ) : baseProducts && baseProducts.length > 0 ? (
        <List
          sx={{
            overflow: "scroll",
          }}
        >
          {baseProducts.map((item) => (
            <ListItem key={item.Id}>
              <ProductItem data={item} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Không có sản phẩm nào được tìm thấy</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WithProtectedRoute(Product);
