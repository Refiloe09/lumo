/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SearchGridItem from "../components/Search/SearchGridItem";
import { SEARCH_SERVICES_ROUTE } from "@/utils/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

function SearchComponent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(`Fetching services: q=${q}, category=${category}`);
        const {
          data: { services },
        } = await axios.get(
          `${SEARCH_SERVICES_ROUTE}?searchTerm=${q}&category=${category}`
        );
        console.log("Fetched services:", services);
        setServices(services);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    if (category || q) getData();
  }, [category, q]);

  return (
    <section className="w-full py-16 bg-white mt-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Results Title */}
        {q && (
          <h3 className="text-3xl font-semibold text-lumo-dark mb-6 text-center">
            Results for <strong className="text-lumo-primary">&quot;{q}&quot;</strong>
          </h3>
        )}

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium hover:bg-gray-100">
            Category
          </button>
          <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium hover:bg-gray-100">
            Budget
          </button>
          <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium hover:bg-gray-100">
            Delivery Time
          </button>
        </div>

        {/* Services Listing */}
        <div>
          <div className="my-4 text-center">
            <span className="text-lumo-gray-600 font-medium text-lg">
              {services.length} services available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.length > 0 ? (
              services.map((service) => (
                <SearchGridItem service={service} key={service.id} />
              ))
            ) : (
              <p className="text-center text-lumo-gray-600 text-lg">
                No services found. Try a different search term.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ✅ Wrap the component inside a Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center text-lg mt-20">Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
