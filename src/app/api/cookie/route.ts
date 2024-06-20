import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const requestHeader = new Headers(request.headers);
  // const tokenStr = requestHeader.get("token");
  // if (!tokenStr) return NextResponse.error();
  // const token = JSON.parse(tokenStr) as SignInResponse;
  // const value = JSON.stringify(token);
  // cookies().set({ name, value });
  return NextResponse.json({ ok: true });
}
