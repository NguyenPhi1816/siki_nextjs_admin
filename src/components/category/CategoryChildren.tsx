"use client";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useGetByNameQuery } from "../../../lib/features/category/categoryApi";
import Image from "next/image";
import { Add, Create } from "@mui/icons-material";

interface ICategoryChildren {
  parentName: string;
}

const CategoryChildren: React.FC<ICategoryChildren> = ({ parentName }) => {
  const { data, error, isLoading, refetch } = useGetByNameQuery(parentName);
  return (
    <Box
      sx={{
        padding: "0.5rem 1rem",
        border: "1px solid var(--outline-light-grey)",
      }}
    >
      {data &&
        data.categoryChildrens.map((item) => (
          <Box
            key={item.id}
            sx={{
              padding: "0.5rem 1rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "var(--bg-white)",
              ":hover": {
                bgcolor: "var(--bg-light-grey)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image src={item.image} alt={item.name} width={48} height={48} />
              <Typography sx={{ marginLeft: "1rem" }}>{item.name}</Typography>
            </Box>
            <Box>
              <IconButton>
                <Create />
              </IconButton>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default CategoryChildren;
