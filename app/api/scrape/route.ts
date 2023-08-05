import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  let username = "brd-customer-hl_5dd3b64f-zone-web_unlocker1";
  let password = "pp29jcs6cz32";
  let port = 22225;
  let session_id = (1000000 * Math.random()) | 0;
  let options = {
    auth: {
      username: username + "-session-" + session_id,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  const url =
    "https://www.amazon.in/Midnight-Library-Matt-Haig/dp/1786892723/ref=sr_1_1?keywords=midnight+library&qid=1690906920&sprefix=midn%2Caps%2C407&sr=8-1";

  try {
    const response = await axios.get(url, options);

    return NextResponse.json({ message: "Ok", data: response });
  } catch (error: any) {
    console.error("Error while scraping:", error.message);
    throw new Error(error.message);
  }
}
