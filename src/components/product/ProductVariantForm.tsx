import React, { ChangeEvent, useEffect, useState } from "react";
import { TextField, Button, Box, Grid, Typography, Chip } from "@mui/material";
import OptionValueModal from "../modal/OptionValueModal";

export interface IOptionValues {
  option: string;
  values: string[];
}

interface Variant {
  [key: string]: string;
}

export interface IVariant {
  optionValue: Variant;
  price: number;
  quantity: number;
  image: File | null;
}

interface IProductVariantForm {
  onChange: (optionValues: IOptionValues[], variants: IVariant[]) => void;
}

const ProductVariantForm: React.FC<IProductVariantForm> = ({ onChange }) => {
  const [optionValues, setOptionValues] = useState<IOptionValues[]>([]);
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [showOptionValueModal, setShowOptionValueModal] =
    useState<boolean>(false);

  const handleShowOptionValueModal = () => {
    setShowOptionValueModal((prev) => !prev);
  };

  const handleSaveOptionValue = (option: string, values: string[]) => {
    const opVals: IOptionValues = { option, values };
    setOptionValues((prev) => [...prev, opVals]);
  };

  const generateVariants = () => {
    // Lấy ra tất cả các tên của options để sử dụng làm keys trong mỗi variant
    const keys = optionValues.map((optionValue) => optionValue.option);

    // Bắt đầu tạo permutations
    let variants: string[][] = [[]];

    optionValues.forEach((optionValue) => {
      const allNextVariants: string[][] = [];

      // Duyệt qua từng giá trị của mỗi option
      optionValue.values.forEach((value) => {
        // Duyệt qua các variant hiện có và thêm giá trị này vào làm variant mới
        variants.forEach((variant) => {
          allNextVariants.push([...variant, value]);
        });
      });

      // Cập nhật danh sách các variants
      variants = allNextVariants;
    });

    // Chuyển đổi mỗi variant từ mảng giá trị thành object, với keys tương ứng
    return variants.map((variant) =>
      variant.reduce<Variant>((acc, cur, index) => {
        acc[keys[index]] = cur;
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    const variants = generateVariants();

    const generatedVariants = variants.map((v) => {
      return {
        optionValue: v,
        price: 0,
        quantity: 0,
        image: null,
      } as IVariant;
    });

    if (generatedVariants.length === 0) {
      setVariants([
        {
          optionValue: {},
          price: 0,
          quantity: 0,
          image: null,
        },
      ]);
    } else {
      setVariants(generatedVariants);
    }
  }, [optionValues]);

  useEffect(() => {
    onChange(optionValues, variants);
  }, [optionValues, variants]);

  return (
    <Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <Button variant="outlined" onClick={handleShowOptionValueModal}>
          Thêm tùy chọn
        </Button>
      </Box>
      {optionValues.length > 0 && (
        <Box
          sx={{
            marginBottom: "1rem",
            padding: "1rem 1rem 0",
            border: "1px solid var(--outline-grey)",
            borderRadius: 1,
          }}
        >
          {optionValues.map((ovs) => (
            <Box
              key={ovs.option}
              sx={{
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ marginRight: "0.25rem" }}>
                {ovs.option}
              </Typography>
              {ovs.values.map((v) => (
                <Chip
                  key={v}
                  sx={{ marginRight: "0.25rem" }}
                  label={v}
                  onDelete={() => {}}
                />
              ))}
            </Box>
          ))}
        </Box>
      )}
      <Grid container spacing={2}>
        {variants.map((variant, index) => (
          <Grid item key={index} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography>
                  {Object.keys(variant.optionValue).length > 0
                    ? Object.keys(variant.optionValue)
                        .map((key) => `${key}: ${variant.optionValue[key]}`)
                        .join(", ")
                    : "Không có tùy chọn"}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Giá"
                  variant="outlined"
                  value={variant.price}
                  type="number"
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].price = Number.parseInt(e.target.value);
                    setVariants(newVariants);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Quantity"
                  variant="outlined"
                  value={variant.quantity}
                  type="number"
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].quantity = Number.parseInt(
                      e.target.value
                    );
                    setVariants(newVariants);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Box
                  sx={{
                    padding: "1rem",
                    border: "1px solid var(--outline-grey)",
                    borderRadius: 1,
                  }}
                >
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        const newVariants = [...variants];
                        newVariants[index].image = e.target.files[0];
                        setVariants(newVariants);
                      }
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <OptionValueModal
        open={showOptionValueModal}
        setOpen={handleShowOptionValueModal}
        onSave={handleSaveOptionValue}
      />
    </Box>
  );
};

export default ProductVariantForm;
