import { NextRequest, NextResponse } from "next/server";
import { SEARCH_MOVIES, headers } from "../../config";
import { Movie } from "@/app/types";

export const GET = async (req: NextRequest) => {
  console.log("SEARCH REQ GOT HERE");
  try {
    const { searchParams } = new URL(req.url);
    const searchText = searchParams.get("query"); // Get

    const rest = await fetch(
      `${SEARCH_MOVIES}?adult=false&query=${searchText}`,
      headers
    );
    console.log(`${SEARCH_MOVIES}?query=${searchText}`);
    const data = await rest.json();

    console.log(data);

    if (data.results) {
      data.results = data.results.filter(
        (movie: Movie) => movie.poster_path !== null
      );
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    const err = {
      message: error,
    };
    return new NextResponse(err as unknown as BodyInit);
  }
};
