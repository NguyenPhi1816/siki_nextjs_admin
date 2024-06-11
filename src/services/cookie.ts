import { SignInResponse } from "@/types/auth";

export const setCookies = async (token: SignInResponse) => {
  await fetch("/api/cookie", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: JSON.stringify(token),
    },
  });
};
