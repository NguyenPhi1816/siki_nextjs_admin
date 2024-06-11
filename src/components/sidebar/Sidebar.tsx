import { List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAppSelector } from "../../../lib/hooks";
import React from "react";
import SidebarItem from "./SidebarItem";
import { Layers } from "@mui/icons-material";

const Sidebar = () => {
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
          <ListItem disablePadding>
            <SidebarItem href="/category" icon={<Layers />} title="Danh mục" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
