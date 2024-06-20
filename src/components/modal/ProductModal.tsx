import React from "react";
import ProductForm from "../product/ProductForm";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";

interface IProductModal {
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<IProductModal> = ({ open, onClose }) => {
  const handleClose = () => {
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
          position: "relative",
          padding: "1rem",
          width: "80vw",
          height: "90vh",
          bgcolor: "var(--bg-white)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: "1rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--outline-grey)",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "1.25rem" }}>
            Thêm sản phẩm mới
          </Typography>
          <IconButton onClick={handleClose}>
            <Clear />
          </IconButton>
        </Box>
        <Box sx={{ height: "100%", paddingTop: "72px" }}>
          <ProductForm onClose={onClose} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
