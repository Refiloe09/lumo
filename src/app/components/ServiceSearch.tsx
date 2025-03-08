// src/components/SearchComponent.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex justify-center mt-8 px-4">
      <form 
        onSubmit={handleSearch} 
        className="flex items-center w-full max-w-3xl bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 hover:border-lumo-primary focus-within:border-lumo-primary focus-within:ring-4 focus-within:ring-blue-100"
      >
        <div className="relative flex-1">
          <MagnifyingGlassIcon 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 sm:h-5 sm:w-5 sm:left-4" 
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for any service..."
            className="w-full pl-20 pr-8 py-5 text-lg text-gray-800 bg-transparent outline-none placeholder-gray-400 sm:pl-14 sm:py-3 sm:text-base"
            aria-label="Search for a service"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="mr-3 px-8 py-3 bg-lumo-primary text-white rounded-full hover:bg-lumo-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-6 sm:py-2"
          aria-label="Search"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;