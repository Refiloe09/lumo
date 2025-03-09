"use client";

import { GET_BUYER_ORDERS_ROUTE } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

// Loading skeleton component
const LoadingSkeleton = () => (
  <tbody>
    {[...Array(3)].map((_, index) => (
      <tr key={index} className="bg-white dark:bg-gray-800">
        <td colSpan={7} className="px-6 py-4">
          <div className="animate-pulse flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
);

function Orders() {
  interface Order {
    id: string;
    services: {
      title: string;
      category: string;
      deliveryTime: string;
    };
    price: number;
    createdAt: string;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const getOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = await getToken();
        const { data: { orders: ordersData } } = await axios.get(`${GET_BUYER_ORDERS_ROUTE}?clerkUserId=${userId}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
        console.log(ordersData);
        setOrders(ordersData || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
     getOrders();
  }, [getToken, userId]);

  return (
    <section
      className="min-h-[80vh] px-4 sm:px-6 lg:px-32 py-10 mt-0"
      aria-label="Buyer Orders Dashboard"
    >
      <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        All Your Orders
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          aria-describedby="orders-table-description"
        >
          <caption id="orders-table-description" className="sr-only">
            A table displaying all your orders with their details and actions
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-lumo-dark dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
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
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Send Message</span>
              </th>
            </tr>
          </thead>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.id}
                    </th>
                    <td className="px-6 py-4">{order.services.title}</td>
                    <td className="px-6 py-4">{order.services.category}</td>
                    <td className="px-6 py-4">R{order.price.toLocaleString()}</td>
                    <td className="px-6 py-4">{order.services.deliveryTime}</td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/buyer/orders/messages/${order.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Send message for order ${order.id}`}
                      >
                        Chat
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No orders found. Start exploring services to place your first order!
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

export default Orders;