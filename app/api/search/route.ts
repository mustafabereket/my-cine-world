import { NextResponse } from "next/server";
import { SEARCH_MOVIES } from "../../config";
const TOKEN = process.env.AUTH_TOKEN;

const headers = {
  headers: {
    // Correct format: headers as an object
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
};

export const POST = async (req) => {
  console.log("SEARCH REQ GOT HERE");
  try {
    const { searchText } = await req.json();

    const rest = await fetch(
      `${SEARCH_MOVIES}?adult=true&query=${searchText}`,
      headers
    );
    console.log(`${SEARCH_MOVIES}?query=${searchText}`);
    const data = await rest.json();

    console.log(data);

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse(error);
  }
};
