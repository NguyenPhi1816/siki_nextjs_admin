"use client";

import { useEffect } from "react";
import { selectTokens } from "../../../lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { redirect } from "next/navigation";
import { setUser } from "../../../lib/features/user/userSlice";
import { useGetProfileMutation } from "../../../lib/features/user/userApi";

export default function WithProtectedRoute(Component: any) {
  return function IsAuth(props: any) {
    const dispatch = useAppDispatch();

    const tokens = useAppSelector(selectTokens);

    const [getProfile, { data, error, isLoading, isUninitialized }] =
      useGetProfileMutation();

    const getMyProfile = async (token: string) => {
      await getProfile(token);
    };

    useEffect(() => {
      if (tokens.isLoaded) {
        if (!!tokens.accessToken) {
          getMyProfile(tokens.accessToken);
        } else {
          redirect("/login");
        }
      }
    }, [tokens.isLoaded]);

    useEffect(() => {
      if (!isUninitialized && !isLoading) {
        if (!!data && data.roles[0] === "ADMIN") {
          dispatch(setUser(data));
        } else {
          redirect("/login");
        }
      }
    }, [data, isLoading, isUninitialized]);

    useEffect(() => {
      if (!!error) {
        redirect("/login");
      }
    }, [error]);

    if (
      (tokens.isLoaded && !tokens.accessToken) ||
      (tokens.isLoaded && !tokens.refreshToken) ||
      ((!isUninitialized || isLoading) && !data) ||
      !!error
    ) {
      return null;
    }

    return <Component {...props} />;
  };
}
