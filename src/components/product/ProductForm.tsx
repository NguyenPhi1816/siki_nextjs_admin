import { Box, Button, CircularProgress } from "@mui/material";
import BaseProductForm from "./BaseProductForm";
import ProductVariantForm, {
  IOptionValues,
  IVariant,
} from "./ProductVariantForm";
import React, { useState } from "react";
import { useCreateMediaMutation } from "../../../lib/features/media/mediaApi";
import { useAppSelector } from "../../../lib/hooks";
import { selectTokens } from "../../../lib/features/auth/authSlice";
import {
  AddProductRequest,
  ProductOptionValueRequest,
  ProductVariantRequest,
} from "@/types/product";
import { useSaveProductMutation } from "../../../lib/features/product/productApi";

interface IProductForm {
  onClose: () => void;
}

const ProductForm: React.FC<IProductForm> = ({ onClose }) => {
  const tokens = useAppSelector(selectTokens);
  const [createMedia] = useCreateMediaMutation();
  const [saveProduct] = useSaveProductMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [baseProductName, setBaseProductName] = useState<string>("");
  const [baseProductImages, setBaseProductImages] = useState<File[]>([]);
  const [baseProductDesc, setBaseProductDesc] = useState<string>("");
  const [optionValues, setOptionValues] = useState<IOptionValues[]>([]);
  const [variants, setVariants] = useState<IVariant[]>([]);

  const getBaseProduct = (
    categoryId: number,
    baseProductName: string,
    baseProductImages: File[],
    baseProductDesc: string
  ) => {
    setCategoryId(categoryId);
    setBaseProductName(baseProductName);
    setBaseProductImages(baseProductImages);
    setBaseProductDesc(baseProductDesc);
  };

  const getProductVariants = (
    optionValues: IOptionValues[],
    variants: IVariant[]
  ) => {
    setOptionValues(optionValues);
    setVariants(variants);
  };

  const handleClose = () => {
    setIsLoading(false);
    setCategoryId(undefined);
    setBaseProductName("");
    setBaseProductImages([]);
    setBaseProductDesc("");
    setOptionValues([]), setVariants([]);
    onClose();
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const { data: baseProductImagePaths, error } = await createMedia(
      baseProductImages
    );

    const imagePromises = variants.map((variant) => {
      if (variant.image) return createMedia([variant.image]);
    });

    const responses = await Promise.all(imagePromises);

    const variantImages = responses.map((item) => {
      if (item && item.data) return item.data.paths[0];
    });

    if (baseProductImagePaths && categoryId && tokens.accessToken) {
      const myVariants: ProductVariantRequest[] = variants.map(
        (variant, index) => {
          const myOptionValues: ProductOptionValueRequest[] = Object.keys(
            variant.optionValue
          ).map((key) => ({
            option: key,
            value: variant.optionValue[key],
          }));

          const image = variantImages[index] as string;

          return {
            price: variant.price,
            quantity: variant.quantity,
            image: image,
            optionValues: myOptionValues,
          };
        }
      );

      const addProductRequest: AddProductRequest = {
        token: tokens.accessToken,
        name: baseProductName,
        description: baseProductDesc,
        categoryId: categoryId,
        images: baseProductImagePaths.paths,
        options: optionValues.map((optionValue) => ({
          name: optionValue.option,
          values: optionValue.values,
        })),
        variants: myVariants,
      };

      await saveProduct(addProductRequest);
    }
    setIsLoading(false);
    handleClose();
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ height: "100%", overflow: "scroll" }}>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ marginBottom: "1rem" }}>
            <BaseProductForm onChange={getBaseProduct} />
          </Box>
          <ProductVariantForm onChange={getProductVariants} />
        </Box>
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "var(--text-white)" }}
            onClick={handleSubmit}
          >
            {isLoading && (
              <CircularProgress
                color="inherit"
                size={"1.5rem"}
                sx={{ marginRight: "1rem" }}
              />
            )}
            Thêm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductForm;
