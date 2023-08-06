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

// BrightData Proxy Browser implementation.
// If you're looking for Webunlocker implementation, check /app/api/scrape (a new route)
// We're calling this function in /app/page.tsx (SSR)
export async function scrapeProduct(url: string) {
  console.log("scrapping the data");
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://${process.env.BRIGHT_DATA_AUTH}@brd.superproxy.io:9222`,
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto(url);

    const title = await getTitle(page);
    const image = await getImage(page);
    let currentPrice = await getCurrentPrice(page);
    let originalPrice = await getOriginalPrice(page);
    let currency = await getCurrency(page);
    let isOutOfStock = !(await getAvailability(page));
    const stars = await getStars(page);
    const description = await getDescription(page);
    const category = await getCategory(page);
    const reviewsCount = await getReviews(page);

    if ((isNaN(currentPrice) || currency === null) && !isOutOfStock) {
      console.log(isOutOfStock, currentPrice, currency);
      throw new Error("Failed to extract data form the given URL ");
    }

    if (isNaN(currentPrice) && isNaN(originalPrice)) {
      console.log(
        "Both currentPrice & originalPrice is null, so setting it to null and setting status as out of stock"
      );
      originalPrice = 0;
      currentPrice = 0;
      isOutOfStock = true;
    }

    if (isNaN(originalPrice)) {
      console.log(
        "original Price is null, assigning current Price to original"
      );
      originalPrice = currentPrice;
    }

    if (currency === "") {
      currency = "-";
    }

    await browser.close();

    return {
      title,
      image,
      currentPrice,
      originalPrice,
      isOutOfStock,
      stars,
      description,
      category,
      reviewsCount,
      currency,
    };
  } catch (error: any) {
    await browser.close();
    console.error("Error while scraping:", error.message);
    throw new Error(error.message);
  }
}
