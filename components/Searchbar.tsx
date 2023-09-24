"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { scrapeAndStoreProduct } from "@/lib/actions";

const Searchbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const product = await scrapeAndStoreProduct(searchPrompt, pathName);

    if (product) {
      const parsedProduct = JSON.parse(product);

      if (parsedProduct._id) {
        router.push(`/products/${parsedProduct._id}`);
      }
    }

    setIsLoading(false);
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
