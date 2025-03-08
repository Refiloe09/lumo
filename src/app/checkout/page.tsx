"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { CREATE_ORDER } from "../../utils/constants";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "../components/CheckoutForm";

// Wrap the main component in a Suspense boundary
const CheckoutContent: React.FC = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createOrder = async () => {
      if (!serviceId) return;

      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.post(
          CREATE_ORDER,
          { serviceId },
          { withCredentials: true }
        );
        setOrderId(data.orderId);
      } catch (err) {
        console.error("Error creating order:", err);
        setError("Failed to create order. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    createOrder();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Preparing your order...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          Complete Your Order
        </h1>
        {orderId ? (
          <CheckoutForm orderId={orderId} serviceId={serviceId ?? ""} />
        ) : (
          <p className="text-gray-600 text-center">
            Preparing your order details...
          </p>
        )}
      </div>
    </div>
  );
};

// Main Checkout component with Suspense boundary
const Checkout: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;