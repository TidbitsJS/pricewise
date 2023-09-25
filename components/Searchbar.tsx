"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { scrapeAndStoreProduct } from "@/lib/actions";

export function isValidAmazonProductURL(url: string) {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check if the hostname contains "amazon.com" or "amazon." followed by a country code
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    // URL parsing error, not a valid URL
  }

  return false;
}

const Searchbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if (!isValidLink) return alert("Please provide valid amazon link");

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt, pathName);

      if (product) {
        const parsedProduct = JSON.parse(product);
        router.push(`/products/${parsedProduct._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter Product Link'
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        className='searchbar-input'
      />

      <button
        type='submit'
        disabled={searchPrompt === ""}
        className='searchbar-btn'
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
