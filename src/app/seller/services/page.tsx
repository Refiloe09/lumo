"use client";

import { GET_USER_SERVICES_ROUTE } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

// Loading skeleton component
const LoadingSkeleton = () => (
  <tbody>
    {[...Array(3)].map((_, index) => (
      <tr key={index} className="bg-white dark:bg-gray-800">
        <td colSpan={6} className="px-6 py-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
);

function ServicesDashboard() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = await getToken();
        const {
          data: { services: servicesData },
        } = await axios.get(GET_USER_SERVICES_ROUTE, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(servicesData || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserServices();
  }, [getToken]);

  return (
    <section
      className="min-h-[80vh] px-4 sm:px-6 lg:px-32 py-10 mt-0"
      aria-label="Services Dashboard"
    >
      <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        All Your Services
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          aria-describedby="services-table-description"
        >
          <caption id="services-table-description" className="sr-only">
            A table displaying all your services with their details and actions
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-lumo-dark dark:lumo-dark dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit Action</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete Action</span>
              </th>
            </tr>
          </thead>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <tbody>
              {services.length > 0 ? (
                services.map(({ title, category, price, deliveryTime, id }) => (
                  <tr
                    key={id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {title}
                    </th>
                    <td className="px-6 py-4">{category}</td>
                    <td className="px-6 py-4">R{price}</td>
                    <td className="px-6 py-4">{deliveryTime} days</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/seller/services/edit/${id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Edit service: ${title}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label={`Delete service: ${title}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No services found. Create your first service!
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {error && (
        <div
          className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg"
          role="alert"
        >
          {error}
          <button
            className="ml-2 underline focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}
    </section>
  );
}

export default ServicesDashboard;