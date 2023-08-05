"use server";

import puppeteer from "puppeteer";

import {
  getAvailability,
  getCategory,
  getCurrency,
  getCurrentPrice,
  getDescription,
  getImage,
  getOriginalPrice,
  getReviews,
  getStars,
  getTitle,
} from "./helpers";

export async function scrapeProduct(url: string) {
  console.log("scrapping the data");
  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: `wss://${process.env.BRIGHT_DATA_AUTH}@brd.superproxy.io:9222`,
  // });

  const username = "brd-customer-hl_5dd3b64f-zone-web_unlocker1";
  const password = "pp29jcs6cz32";
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const super_proxy = `http://${username}-session-${session_id}:${password}@brd.superproxy.io:${port}`;

  const options = {
    method: "GET",
    headers: {
      "Proxy-Authorization": `Basic ${Buffer.from(
        `${username}:${password}`
      ).toString("base64")}`,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("data", data);

    return "Something";

    // const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(2 * 60 * 1000);
    // await page.goto(url);

    // const title = await getTitle(page);
    // const image = await getImage(page);
    // let currentPrice = await getCurrentPrice(page);
    // let originalPrice = await getOriginalPrice(page);
    // let currency = await getCurrency(page);
    // let isOutOfStock = !(await getAvailability(page));
    // const stars = await getStars(page);
    // const description = await getDescription(page);
    // const category = await getCategory(page);
    // const reviewsCount = await getReviews(page);

    // if ((isNaN(currentPrice) || currency === null) && !isOutOfStock) {
    //   console.log(isOutOfStock, currentPrice, currency);
    //   throw new Error("Failed to extract data form the given URL ");
    // }

    // if (isNaN(currentPrice) && isNaN(originalPrice)) {
    //   console.log(
    //     "Both currentPrice & originalPrice is null, so setting it to null and setting status as out of stock"
    //   );
    //   originalPrice = 0;
    //   currentPrice = 0;
    //   isOutOfStock = true;
    // }

    // if (isNaN(originalPrice)) {
    //   console.log(
    //     "original Price is null, assigning current Price to original"
    //   );
    //   originalPrice = currentPrice;
    // }

    // if (currency === "") {
    //   currency = "-";
    // }

    // await browser.close();

    // return {
    //   title,
    //   image,
    //   currentPrice,
    //   originalPrice,
    //   isOutOfStock,
    //   stars,
    //   description,
    //   category,
    //   reviewsCount,
    //   currency,
    // };
  } catch (error: any) {
    // await browser.close();
    console.error("Error while scraping:", error.message);
    throw new Error(error.message);
  }
}
