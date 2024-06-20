import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useGetCategoriesQuery } from "../../../lib/features/category/categoryApi";

interface IBaseProductForm {
  onChange: (
    categoryId: number,
    baseProductName: string,
    baseProductImages: File[],
    baseProductDesc: string
  ) => void;
}

const BaseProductForm: React.FC<IBaseProductForm> = ({ onChange }) => {
  const {
    data: categories,
    error: categoryError,
    isLoading: isCategoryLoading,
    refetch: categoryRefetch,
  } = useGetCategoriesQuery();

  const [categoryId, setCategoryId] = useState<number>(-1);
  const [baseProductName, setBaseProductName] = useState<string>("");
  const [baseProductImages, setBaseProductImages] = useState<File[]>([]);
  const [baseProductDesc, setBaseProductDesc] = useState<string>("");

  const handleBaseProductImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBaseProductImages(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    if (categoryId && baseProductName && baseProductImages && baseProductDesc)
      onChange(categoryId, baseProductName, baseProductImages, baseProductDesc);
  }, [categoryId, baseProductName, baseProductImages, baseProductDesc]);

  return (
    <Box sx={{ paddingTop: "0.5rem" }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {categories && (
              <FormControl fullWidth sx={{ marginBottom: "0.5rem" }}>
                <InputLabel id="demo-simple-select-label">
                  Danh mục sản phẩm
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoryId}
                  label="Danh mục sản phẩm"
                  onChange={(e) => setCategoryId(e.target.value as number)}
                >
                  <MenuItem value={-1}>Chọn danh mục</MenuItem>
                  {categories.map((item) => (
                    <MenuItem key={item.Id} value={item.Id}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              label="Tên sản phẩm"
              value={baseProductName}
              onChange={(e) => setBaseProductName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                padding: "1rem",
                border: "1px solid var(--outline-grey)",
                borderRadius: 1,
              }}
            >
              <input
                required
                type="file"
                multiple
                id="images"
                name="images"
                onChange={handleBaseProductImagesChange}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="description"
              name="description"
              label="Product Description"
              value={baseProductDesc}
              onChange={(e) => setBaseProductDesc(e.target.value)}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default BaseProductForm;
