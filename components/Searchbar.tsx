"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { scrapeAndStoreProduct } from "@/lib/actions";

function isValidAmazonProductLink(link: string) {
  // Define a regular expression pattern to match Amazon product URLs
  const amazonProductRegex =
    /^(https?:\/\/)?(www\.)?amazon\.(com|in|co\.uk|ca|com\.au|de|fr|es|it|nl|jp|com\.mx|com\.br|ae|sg|com\.tr|com\.sa|com\.eg|se|com\.sg|com\.my|com\.ph|cl|com\.co|com\.ar|com\.tw|com\.cn|com\.hk|com\.sg|com\.id|com\.vn|com\.th)\/[A-Za-z0-9-]+\/dp\/[A-Za-z0-9]+(\/)?/i;

  // Use the test method to check if the link matches the pattern
  return amazonProductRegex.test(link);
}

const Searchbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductLink(searchPrompt);
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
