import { List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../lib/hooks";
import React from "react";
import SidebarItem from "./SidebarItem";
import { Category, Widgets } from "@mui/icons-material";

const Sidebar = () => {
  const categories = [
    { id: 1, name: "Danh mục", href: "/category", icon: <Category /> },
    { id: 2, name: "Sản phẩm", href: "/products", icon: <Widgets /> },
  ];

  return (
    <Box
      sx={{
        width: "var(--side-bar-width)",
        height: "100%",
        overflowY: "scroll",
        msOverflowStyle: "none",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box sx={{ bgcolor: "var(--bg-white)", height: "100%", borderRadius: 1 }}>
        <List sx={{ padding: "1rem" }}>
          {categories.map((item) => (
            <ListItem
              disablePadding
              sx={{ marginBottom: "0.5rem" }}
              key={item.id}
            >
              <SidebarItem
                href={item.href}
                icon={item.icon}
                title={item.name}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
