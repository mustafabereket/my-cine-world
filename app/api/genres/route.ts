import { GET_GENRES_URL, headers } from "@/app/config";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  try {
    const resp = await fetch(GET_GENRES_URL, {
      ...headers,
      cache: "force-cache",
    });

    const data = await resp.json();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
};
