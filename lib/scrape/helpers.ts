"use server";

import { Page } from "puppeteer";

export async function getTitle(page: Page) {
  const title = await page.evaluate(() => {
    const titleSection = document.querySelector("#titleSection");
    const titleElement = titleSection?.querySelector(
      "h1#title span#productTitle"
    );

    return titleElement?.textContent?.trim() || "";
  });

  return title;
}

export async function getImage(page: Page) {
  const image = await page.evaluate(() => {
    const imageElement = document.querySelector(
      ".imgTagWrapper img"
    ) as HTMLImageElement;

    return imageElement ? imageElement.src : "";
  });

  return image;
}

export async function getCurrency(page: Page) {
  const currency = await page.evaluate(() => {
    const centerColAlignElement = document.querySelector("#centerCol");
    const currencyElement = centerColAlignElement?.querySelector(
      ".a-price .a-price-symbol"
    );

    return currencyElement?.textContent;
  });

  return currency || "";
}

export async function getCurrentPrice(page: Page) {
  const currentPriceString = await page.evaluate(() => {
    const centerColAlignElement = document.querySelector("#centerCol");
    const currentPriceElement = centerColAlignElement?.querySelector(
      ".a-price .a-price-whole"
    );

    return currentPriceElement?.textContent?.replace(/,/g, "") || "";
  });

  return parseFloat(currentPriceString || "NaN");
}

export async function getOriginalPrice(page: Page) {
  const originalPriceString = await page.evaluate(() => {
    const centerColAlignElement = document.querySelector("#centerCol");
    const originalPriceElement = centerColAlignElement?.querySelector(
      ".a-text-price .a-offscreen"
    );

    return originalPriceElement?.textContent?.slice(1).replace(/,/g, "") || "";
  });

  return parseFloat(originalPriceString || "NaN");
}

export async function getAvailability(page: Page) {
  const availabilityText = await page.evaluate(() => {
    const availabilityElement = document.querySelector("#availability");
    return availabilityElement?.textContent?.trim().toLowerCase() || "";
  });

  const buyNowButtonElement = await page.evaluate(() => {
    return !!document.querySelector("#buyNow");
  });

  return (
    availabilityText === "in stock" ||
    availabilityText?.includes("only") ||
    availabilityText?.includes("left in stock") ||
    buyNowButtonElement
  );
}

export async function getStars(page: Page) {
  const stars = await page.evaluate(() => {
    const starsElement = document.querySelector(
      "#acrPopover .a-size-base.a-color-base"
    );

    return starsElement?.textContent?.trim() || "";
  });

  return parseInt(stars);
}

export async function getDescription(page: Page) {
  const descriptions = await page.evaluate(() => {
    const descriptionElements = document.querySelectorAll(
      "#feature-bullets li.a-spacing-mini .a-list-item"
    );

    return Array.from(
      descriptionElements,
      (el) => el?.textContent?.trim() || ""
    );
  });

  return descriptions.join("\n");
}

export async function getCategory(page: Page) {
  const category = await page.evaluate(() => {
    const ulElement = document.querySelector(
      "#wayfinding-breadcrumbs_feature_div ul"
    );
    const lastLiElement = ulElement?.lastElementChild;

    return lastLiElement?.textContent?.trim() || "";
  });

  return category;
}

export async function getReviews(page: Page) {
  const reviewsText = await page.evaluate(() => {
    const reviewsElement = document.querySelector(
      "#acrCustomerReviewLink .a-size-base"
    );

    return reviewsElement?.textContent?.trim() || "";
  });

  const reviewsCount = Number(reviewsText.replace(/[^0-9]/g, ""));
  return reviewsCount;
}
