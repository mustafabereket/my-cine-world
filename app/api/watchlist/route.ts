import { NextResponse, NextRequest } from "next/server";
import { GET_WATCHLIST_MOVIES, headers, ADD_TO_WATCHLIST } from "../../config";

export const POST = async (req: NextRequest) => {
  try {
    const { id, action } = await req.json();
    console.log("POSTfirviiii", id, action);

    const payload = {
      media_type: "movie",
      media_id: id,
      watchlist: action === "add",
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

export const GET = async () => {
  try {
    const res = await fetch(GET_WATCHLIST_MOVIES, {
      ...headers,
      cache: "no-cache",
    });
    const data = await res.json();

    console.log("GET:::", data);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log("GET:::ERROR::: ", error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
