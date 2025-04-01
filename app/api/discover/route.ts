import { NextRequest, NextResponse } from "next/server";
import { DISCOVER_MOVIES_BY_GENRE, headers } from "../../config";

export const GET = async (req: NextRequest) => {
  console.log("YAOAOAOSDUASDLKADSKJL");
  try {
    const { searchParams } = new URL(req.url);
    const keys = searchParams.get("keys");
    const page = searchParams.get("page") || "1";

    console.log(DISCOVER_MOVIES_BY_GENRE(keys || ""));

    const resp = await fetch(
      DISCOVER_MOVIES_BY_GENRE(keys || "", page),
      headers
    );
    const data = await resp.json();

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
