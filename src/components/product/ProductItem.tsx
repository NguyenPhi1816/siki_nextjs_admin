import { IProduct } from "@/types/product";
import { Create } from "@mui/icons-material";
import { Box, IconButton, Switch, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface IProductItem {
  data: IProduct;
}

const ProductItem: React.FC<IProductItem> = ({ data }) => {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          padding: "0.5rem 1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "var(--bg-white)",
          border: "1px solid var(--outline-light-grey)",
          ":hover": {
            bgcolor: "var(--bg-light-grey)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "3rem",
            height: "3rem",
          }}
        >
          <Image
            src={data.image}
            alt={data.Name}
            width={48}
            height={48}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ maxWidth: "80%" }}>
            <Typography sx={{ marginLeft: "1rem", fontWeight: 700 }}>
              {data.Name}
            </Typography>
            <Typography
              sx={{
                marginLeft: "1rem",
                fontSize: "0.875rem",
                color: "var(--text-grey)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {data.Description}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton
          // onClick={handleShowEditModal}
          >
            <Create />
          </IconButton>
          <Switch checked={data.Status === "ACTIVE"} />
        </Box>
      </Box>
    </Box>
  );
};
export default ProductItem;
