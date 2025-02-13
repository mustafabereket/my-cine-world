import { NextResponse, NextRequest } from "next/server";
import { fetchLocalWatchlist } from "../movie-services";

export const POST = async (req: NextRequest) => {
  try {
    const { ids } = await req.json();
    console.log("IDS");

    const data = await fetchLocalWatchlist(ids);

    console.log(data);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
