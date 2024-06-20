"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../lib/hooks";
import { AuthState, setTokens } from "../../../lib/features/auth/authSlice";

interface IStoreData {
  tokens: AuthState;
}

const StoreData: React.FC<IStoreData> = ({ tokens }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTokens(tokens));
  }, [tokens]);

  return <></>;
};

export default StoreData;
