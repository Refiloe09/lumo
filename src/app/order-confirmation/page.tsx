"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { GET_SERVICE_DATA, ORDERS_ROUTES } from "../../utils/constants";
import Link from "next/link";

interface OrderDetails {
  orderId: string;
  serviceId: string;
  serviceTitle: string;
  price: number;
  contactEmail: string;
  contactPhone?: string | null;
  notes?: string | null;
}

// Move the main logic into a separate component to use Suspense
const OrderConfirmationContent: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const serviceId = searchParams.get("serviceId");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !serviceId) {
        setError("Invalid order or service ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [serviceResponse, orderResponse] = await Promise.all([
          axios.get(`${GET_SERVICE_DATA}/${serviceId}`, {
            withCredentials: true,
          }),
          axios.get(`${ORDERS_ROUTES}/${orderId}`, {
            withCredentials: true,
          }),
        ]);

        const serviceData = serviceResponse.data.service;
        const orderData = orderResponse.data.order;

        setOrderDetails({
          orderId,
          serviceId,
          serviceTitle: serviceData.title,
          price: serviceData.price,
          contactEmail: orderData.contactEmail,
          contactPhone: orderData.contactPhone,
          notes: orderData.notes,
        });
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading order confirmation...
        </p>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-500">
          {error || "Order not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Thank you for your order. We&apos;ll contact you soon to arrange payment and
          next steps.
        </p>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Order ID:</span>{" "}
              {orderDetails.orderId}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Service:</span>{" "}
              {orderDetails.serviceTitle}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Price:</span>{" "}
              R {orderDetails.price.toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Email:</span>{" "}
              {orderDetails.contactEmail}
            </p>
            {orderDetails.contactPhone && (
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span>{" "}
                {orderDetails.contactPhone}
              </p>
            )}
            {orderDetails.notes && (
              <p className="text-gray-600">
                <span className="font-medium">Notes:</span> {orderDetails.notes}
              </p>
            )}
          </div>

          <Link
            href="/"
            className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md font-semibold text-sm md:text-md transition-all duration-200 mt-6"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

// Wrap the main component in a Suspense boundary
const OrderConfirmation: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
};

export default OrderConfirmation;