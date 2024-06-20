"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { useSignInMutation } from "../../../lib/features/auth/authApi";
import { SignInError, SignInResponse } from "@/types/auth";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { redirect } from "next/navigation";
import { setCookies } from "@/services/cookie";
import { setTokens } from "../../../lib/features/auth/authSlice";

const SignInForm = () => {
  const url = process.env.NEXT_PUBLIC_SIGN_IN_BACKGROUND_IMAGE_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch: Dispatch = useAppDispatch();
  const [signIn, { isLoading, data, error }] = useSignInMutation();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phoneNumber");
    const password = formData.get("password");
    if (phoneNumber && password) {
      await signIn({
        phoneNumber: phoneNumber.toString(),
        password: password.toString(),
      });
    }
  };

  useEffect(() => {
    if (data) {
      const storeData = async () => {
        const myRes = data as SignInResponse;
        if (isRemember) {
          await setCookies(myRes);
        }
        dispatch(
          setTokens({
            isLoaded: true,
            accessToken: myRes.access_token,
            refreshToken: myRes.refresh_token,
          })
        );
      };
      storeData();
      redirect("/");
    } else if (error) {
      const myErr = error as FetchBaseQueryError;
      const myErrData = myErr.data as SignInError;
      console.log(myErrData);
      setErrorMessage(myErrData.message);
    }
  }, [data, error]);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClearMessage = () => {
    setErrorMessage("");
  };

  return (
    <Container
      component="section"
      sx={{
        p: 0,
        m: 0,
        position: "relative",
        maxWidth: "100vw!important",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('${url}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "var(--bg-overlay)",
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "var(--bg-white)",
            borderRadius: 1,
          }}
        >
          <Typography component="h1" variant="h2" sx={{ fontWeight: 700 }}>
            Đăng nhập
          </Typography>
          <form onSubmit={handleLogin} style={{ marginTop: "2rem" }}>
            <TextField
              error={errorMessage !== ""}
              required
              fullWidth
              id="phoneNumber"
              label="Số điện thoại"
              name="phoneNumber"
              onFocus={handleClearMessage}
            />
            <TextField
              error={errorMessage !== ""}
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              data-testid="password"
              onFocus={handleClearMessage}
              sx={{ mt: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleShowPassword}
                      onMouseDown={(event) => event.preventDefault()} // Để ngăn sự kiện onblur trên input
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="isRemember"
                  color="primary"
                  checked={isRemember}
                  onClick={() => setIsRemember((prev) => !prev)}
                />
              }
              label="Ghi nhớ đăng nhập"
            />
            {errorMessage !== "" && (
              <Typography fontSize={"0.875rem"} color="var(--text-error)">
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 2, mb: 2, pt: 2, pb: 2, color: "var(--bg-white)" }}
            >
              {isLoading && (
                <CircularProgress
                  color="inherit"
                  size={"1.5rem"}
                  sx={{ marginRight: "1rem" }}
                />
              )}
              <Typography
                component="h5"
                variant="body1"
                sx={{ fontWeight: 700 }}
              >
                Đăng nhập
              </Typography>
            </Button>
          </form>
        </Box>
      </Container>
    </Container>
  );
};

export default SignInForm;
