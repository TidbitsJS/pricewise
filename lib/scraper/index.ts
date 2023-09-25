import axios from "axios";
import * as cheerio from "cheerio";

import { extractPrice, extractCurrency, extractDescription } from "@/lib/utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // Bright Data proxy configuration
  let username = String(process.env.BRIGHT_DATA_USERNAME);
  let password = String(process.env.BRIGHT_DATA_PASSWORD);
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

  try {
    // Fetch the Amazon product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extract product information
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a-size-base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
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
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    // product description
    const description = extractDescription($);

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      lowestPrice: Number(currentPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice),
      discountRate: Number(discountRate),
      description: description,
      category: "Need to scrape this data",
      reviewsCount: 0,
      stars: 0,
      isOutOfStock: outOfStock,
    };

    return data;
  } catch (error: any) {
    throw new Error(`Error while scraping: ${error.message}`);
  }
}
