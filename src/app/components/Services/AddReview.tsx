"use client";

import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";
import { ADD_REVIEW } from "@/utils/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";

interface ReviewData {
  reviewText: string;
  rating: number;
}

const AddReview: React.FC = () => {
  const [{}, dispatch] = useStateProvider(); // Destructure to avoid unused variable warning
  const [data, setData] = useState<ReviewData>({ reviewText: "", rating: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { serviceId } = useParams();
  const { getToken } = useAuth();

  const addReview = async () => {
    if (!data.reviewText.trim() || data.rating === 0) {
      setError("Please provide a review and rating.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = await getToken();
      const response = await axios.post(
        `${ADD_REVIEW}/${serviceId}`,
        { ...data },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setData({ reviewText: "", rating: 0 });
        dispatch({
          type: reducerCases.ADD_REVIEW,
          newReview: response.data.newReview,
        });
      }
    } catch (err) {
      console.error("Error adding review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-12 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Share Your Review
      </h3>

      <div className="space-y-6">
        {/* Review Textarea */}
        <div className="relative">
          <textarea
            name="reviewText"
            id="reviewText"
            onChange={(e) => setData({ ...data, reviewText: e.target.value })}
            value={data.reviewText}
            className="w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y min-h-[100px]"
            placeholder="Write your review here..."
            disabled={isSubmitting}
          />
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
                data.rating >= num ? "text-yellow-400" : "text-gray-300"
              } ${isSubmitting ? "cursor-not-allowed opacity-50" : "hover:text-yellow-300"}`}
              onClick={() => !isSubmitting && setData({ ...data, rating: num })}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-md font-medium text-sm md:text-md transition-all duration-200 disabled:bg-teal-400 disabled:cursor-not-allowed"
          onClick={addReview}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Review"}
        </button>
      </div>
    </div>
  );
};

export default AddReview;