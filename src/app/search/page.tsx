/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import SearchGridItem from "../components/Search/SearchGridItem";
import { SEARCH_SERVICES_ROUTE } from "@/utils/constants";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { FaFilter } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import categories, { Category } from "@/utils/categories"; // Import categories
import SearchBox from "../components/ServiceSearch";

function SearchComponent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching services: query=${query}`);
        const token = await getToken(); // Get Clerk JWT token
        const { data: { services } } = await axios.get(
          `${SEARCH_SERVICES_ROUTE}?query=${encodeURIComponent(query)}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }, // Pass Clerk token
          }
        );
        console.log("Fetched services:", services);

        // Enrich services with Clerk user data using clerkUserId
        interface Service {
          id: string;
          createdBy: {
            clerkUserId?: string;
            email: string;
            username?: string;
            profileImage?: string | null;
          };
          [key: string]: any;
        }

        interface ClerkUser {
          username?: string;
          profile_image_url?: string;
        }

        const enrichedServices = await Promise.all(
          services.map(async (service: Service): Promise<Service> => {
            if (service.createdBy?.clerkUserId) {
              const clerkUserResponse = await axios.get<ClerkUser>(
                `/api/clerk/user/${service.createdBy.clerkUserId}`, // Clerk API endpoint
                {
                  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_SECRET_KEY}` }, // Use environment variable
                }
              );
              const clerkUser = clerkUserResponse.data;
              return {
                ...service,
                createdBy: {
                  ...service.createdBy,
                  username: clerkUser.username || service.createdBy.email.split("@")[0] || "Anonymous",
                  profileImage: clerkUser.profile_image_url || null,
                },
              };
            }
            return {
              ...service,
              createdBy: {
                ...service.createdBy,
                username: service.createdBy.email.split("@")[0] || "Anonymous",
                profileImage: null,
              },
            };
          })
        );
        setServices(enrichedServices);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to fetch services. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [query, getToken]);

  // Filter state
  const [filters, setFilters] = useState({
    category: "",
    budget: "",
    deliveryTime: "",
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    // TODO: Implement API call with filters
    console.log(`Filter ${type} changed to: ${value}`);
  };

  return (
    <section className="w-full py-12 bg-lumo-light mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBox />
        {/* Search Results Header */}
        <div className="text-center mb-8">
          {query && (
            <h1 className="text-4xl font-display font-bold text-lumo-dark mb-2">
              Results for <span className="text-lumo-primary">&quot;{query}&quot;</span>
            </h1>
          )}
          {!query && (
            <h1 className="text-4xl font-display font-bold text-lumo-dark mb-2">
              All Available Services
            </h1>
          )}
          <p className="text-lumo-gray-600 text-lg">Explore a wide range of services tailored for your needs.</p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 text-lumo-dark font-medium">
            <FaFilter className="text-lumo-primary" />
            <span>Filters</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="px-4 py-2 border border-lumo-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lumo-primary bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((cat: Category) => (
                <option key={cat.label} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
            
            <select
              value={filters.deliveryTime}
              onChange={(e) => handleFilterChange("deliveryTime", e.target.value)}
              className="px-4 py-2 border border-lumo-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lumo-primary bg-white"
            >
              <option value="">All Delivery Times</option>
              <option value="1">1 Day</option>
              <option value="3">3 Days</option>
              <option value="7">7 Days</option>
            </select>
          </div>
        </div>

        {/* Loading or Error State */}
        {loading && <p className="text-center text-lg text-lumo-gray-600">Loading services...</p>}
        {error && <p className="text-center text-lg text-red-500">{error}</p>}

        {/* Services Listing */}
        {!loading && !error && (
          <div>
            <div className="my-6 text-center">
              <span className="text-lumo-gray-600 font-medium text-xl">
                {services.length} services available
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.length > 0 ? (
                services.map((service) => (
                  <SearchGridItem key={service.id} service={service} />
                ))
              ) : (
                <div className="col-span-full text-center">
                  <p className="text-lumo-gray-600 text-xl">No services found.</p>
                  <p className="text-lumo-gray-500">Try adjusting your search term or filters.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ✅ Wrap the component inside a Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center text-2xl text-lumo-gray-600 mt-20">Loading search results...</div>}>
      <SearchComponent />
    </Suspense>
  );
}