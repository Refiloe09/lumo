"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CONFIRM_ORDER } from "../../utils/constants";
import { useAuth } from "@clerk/nextjs";

interface CheckoutFormProps {
  orderId: string;
  serviceId: string;
}

interface FormData {
  contactEmail: string;
  contactPhone?: string;
  notes?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ orderId, serviceId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    contactEmail: "",
    contactPhone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.contactEmail.trim()) {
      setError("Please provide a contact email.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      await axios.put(
        `${CONFIRM_ORDER}/${orderId}`,
        { ...formData },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      router.push(`/order-confirmation?orderId=${orderId}&serviceId=${serviceId}`);
    } catch (err) {
      console.error("Error confirming order:", err);
      setError("Failed to confirm order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Order Details
      </h2>
      <p className="text-gray-600 mb-6">
        Payment will be handled offline. Please provide your contact information to proceed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Contact Email */}
        <div>
          <label
            htmlFor="contactEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Email *
          </label>
          <input
            type="email"
            id="contactEmail"
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData({ ...formData, contactEmail: e.target.value })
            }
            className="w-full p-3 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-200 placeholder-gray-400"
            placeholder="your@email.com"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Contact Phone (Optional) */}
        <div>
          <label
            htmlFor="contactPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Phone (Optional)
          </label>
          <input
            type="tel"
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) =>
              setFormData({ ...formData, contactPhone: e.target.value })
            }
            className="w-full p-3 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 disabled:bg-gray-200 placeholder-gray-400"
            placeholder="+1 123-456-7890"
            disabled={isSubmitting}
          />
        </div>

        {/* Notes (Optional) */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full p-3 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 resize-y min-h-[100px] disabled:bg-gray-200 placeholder-gray-400"
            placeholder="Any special instructions?"
            disabled={isSubmitting}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-md font-semibold text-sm md:text-md transition-all duration-200 disabled:bg-teal-400 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Confirming..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;