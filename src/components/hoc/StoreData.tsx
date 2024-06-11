"use client";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { AuthState, setTokens } from "../../../lib/features/auth/authSlice";

interface IStoreData {
  tokens: AuthState;
}

const StoreData: React.FC<IStoreData> = ({ tokens }) => {
  const dispatch = useAppDispatch();
  dispatch(setTokens(tokens));
  return <></>;
};

export default StoreData;
