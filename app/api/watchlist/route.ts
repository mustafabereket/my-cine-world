import { NextRequest, NextResponse } from "next/server";
import {
  SEARCH_MOVIES,
  GET_WATCHLIST_MOVIES,
  headers,
  ADD_TO_WATCHLIST,
} from "../../config";
const TOKEN = process.env.AUTH_TOKEN;

export const POST = async (req) => {
  try {
    const { id } = await req.json();
    console.log("POSTfirviiii", id);

    const payload = {
      media_type: "movie",
      media_id: id,
      watchlist: true,
    };
    const resp = await fetch(ADD_TO_WATCHLIST, {
      ...headers,
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log(data);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const GET = async (req) => {
  console.log("firviiii");
  try {
    const res = await fetch(GET_WATCHLIST_MOVIES, headers);
    const data = await res.json();

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
