import axios from "axios";
import * as cheerio from "cheerio";

import { extractPrice, extractCurrency } from "@/lib/scrape/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let username = process.env.BRIGHT_DATA_USERNAME;
  let password = process.env.BRIGHT_DATA_PASSWORD;
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
    "https://www.amazon.in/Apple-2022-10-9-inch-iPad-Wi-Fi/dp/B0BJMGXLYZ/ref=pd_rhf_d_dp_s_pd_sbs_rvi_sccl_2_1/258-4802973-7066910?pd_rd_w=3Grxd&content-id=amzn1.sym.f2f99b52-a5ca-432b-8bfe-0d72feb3d1ba&pf_rd_p=f2f99b52-a5ca-432b-8bfe-0d72feb3d1ba&pf_rd_r=S2M2MAZKD10MB11BA2NJ&pd_rd_wg=91jwb&pd_rd_r=6bca717a-8384-45b2-9e29-fb68afb6a46a&pd_rd_i=B0BJMGXLYZ&th=1";

  try {
    const response = await axios.get(url, options as any);
    const $ = cheerio.load(response.data);

    // Extract product information
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice($("#a-price-whole"), $("#price"));
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price .a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    // Extract image URL from either imgBlkFront or landingImage
    const image =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";
    const imageUrls = Object.keys(JSON.parse(image));

    // Extract currency from the original price
    const currency = extractCurrency($("#a-price-symbol"));

    // Construct data
    const data = {
      title,
      originalPrice,
      currentPrice,
      outOfStock,
      imageUrls,
      currency,
    };

    return NextResponse.json({ message: "Ok", data });
  } catch (error: any) {
    console.error("===================Error while scraping:", error.message);
    throw new Error(error.message);
  }
}
