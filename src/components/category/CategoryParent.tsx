"use client";
import { ICategory } from "@/types/category";
import {
  Add,
  Create,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import CategoryChildren from "./CategoryChildren";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../lib/hooks";
import { ModalType, openModal } from "../../../lib/features/modal/ModalSlice";

interface ICategoryParent {
  data: ICategory;
}

const CategoryParent: React.FC<ICategoryParent> = ({ data }) => {
  const dispatch: Dispatch = useAppDispatch();

  const [showChildren, setShowChildren] = useState<boolean>(false);

  const handleShowAddModal = () => {
    dispatch(
      openModal({
        modalType: ModalType.addCategory,
        modalProps: { parentId: data.id },
      })
    );
  };

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src={data.image} alt={data.name} width={48} height={48} />
          <Typography sx={{ marginLeft: "1rem" }}>{data.name}</Typography>
        </Box>
        <Box>
          <IconButton>
            <Create />
          </IconButton>
          <IconButton onClick={handleShowAddModal}>
            <Add />
          </IconButton>
          <IconButton onClick={() => setShowChildren((prev) => !prev)}>
            {showChildren ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </Box>
      </Box>
      {showChildren && <CategoryChildren parentName={data.name} />}
    </Box>
  );
};

export default CategoryParent;
