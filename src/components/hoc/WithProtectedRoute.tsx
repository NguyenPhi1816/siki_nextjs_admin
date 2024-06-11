"use client";

import { useEffect } from "react";
import { selectTokens } from "../../../lib/features/auth/authSlice";
import { useAppSelector } from "../../../lib/hooks";
import { redirect } from "next/navigation";

export default function WithProtectedRoute(Component: any) {
  return function IsAuth(props: any) {
    const tokens = useAppSelector(selectTokens);

    useEffect(() => {
      if (!tokens.accessToken) {
        return redirect("/login");
      }
    }, []);

    if (!tokens.accessToken) {
      return null;
    }

    return <Component {...props} />;
  };
}
