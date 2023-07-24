import { NextResponse } from "next/server";

export function GET(req) {
  const response = NextResponse.json(
    {
      success: true,
    },
    { status: 200 }
  );
  response.cookies.set({
    name: "uid",
    value: "",
    maxAge: 60 * 60,
    httpOnly: true,
  });
  return response;
}
