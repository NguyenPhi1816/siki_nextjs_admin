import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ boxShadow: "none" }}>
      <Toolbar
        variant="dense"
        sx={{
          bgcolor: "var(--bg-white)",
          borderBottom: "1px solid var(--outline-light-grey)",
        }}
      >
        <Container
          sx={{
            padding: "1rem 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Image src={"/logo.png"} alt="logo" width={50} height={30} />
            <Box sx={{ marginLeft: "0.5rem", fontWeight: 700 }}>
              For Administrator
            </Box>
          </Box>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
