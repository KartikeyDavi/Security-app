import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(req) {
  const reqData = await req.json();
  console.log(reqData)
  try {
    const { data } = await axios.post("http://localhost:8000/user/signin", {
      ...reqData,
    });
    console.log(data);
    if (data.success) {
      const response = NextResponse.json(
        {
          ...data,
        },
        { status: 200 }
      );
      response.cookies.set({
        name: "uid",
        value: data.user._id,
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });
      return response;
    }
    return NextResponse.json(
      {
        ...data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err,
      },
      { status: 500 }
    );
  }
}
