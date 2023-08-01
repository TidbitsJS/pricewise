"use client";
// import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Searchbar = () => {
  const router = useRouter();
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Enter Product Link'
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        className='max-w-[360px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none'
      />

      <button
        type='submit'
        disabled={searchPrompt === ""}
        className='bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40'
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
