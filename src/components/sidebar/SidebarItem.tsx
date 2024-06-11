"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebarItem {
  href: string;
  icon: React.ReactNode;
  title: React.ReactNode;
}

const SidebarItem: React.FC<ISidebarItem> = ({ href, icon, title }) => {
  const pathname = usePathname();
  const selected = pathname === href;
  return (
    <Link
      style={{
        width: "100%",
        textDecoration: "none",
        color: "var(--text-grey)",
      }}
      href={href}
    >
      <Box
        sx={{
          padding: "0.75rem 1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: 1,
          backgroundColor: selected
            ? "var(--bg-light-grey)"
            : "var(--bg-white)",
          ":hover": {
            backgroundColor: "var(--bg-light-grey)",
          },
        }}
      >
        {icon}
        <Typography
          sx={{
            marginLeft: "0.5rem",
            fontSize: "0.75rem",
            color: "var(--text-black)",
          }}
          variant="body1"
        >
          {title}
        </Typography>
      </Box>
    </Link>
  );
};

export default SidebarItem;
