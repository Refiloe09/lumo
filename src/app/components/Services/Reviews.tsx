"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStateProvider } from "../../context/StateContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Reviewer {
  username?: string;
  email?: string;
  profileImage?: string;
}

interface Review {
  id?: string;
  rating: number;
  reviewText?: string;
  reviewer?: Reviewer;
}

const Reviews: React.FC = () => {
  const [{ serviceData }] = useStateProvider();
  const [averageRatings, setAverageRatings] = useState(0);

  useEffect(() => {
    if (serviceData?.reviews && Array.isArray(serviceData.reviews) && serviceData.reviews.length) {
      const validReviews = serviceData.reviews.filter(
        (review: any): review is Review => typeof review === "object" && typeof review.rating === "number"
      );
      if (validReviews.length) {
        const avgRating = validReviews.reduce((acc: any, { rating }: any) => acc + rating, 0) / validReviews.length;
        setAverageRatings(parseFloat(avgRating.toFixed(1)));
      }
    }
  }, [serviceData]);

  if (!serviceData || !Array.isArray(serviceData.reviews) || !serviceData.reviews.length) {
    return (
      <section className="mb-12">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Reviews</h3>
        <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
      </section>
    );
  }

  return (
    <section className="mb-12 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Reviews</h3>

      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <h5 className="text-gray-700 font-medium">
          {serviceData.reviews.length} {serviceData.reviews.length === 1 ? "review" : "reviews"} for this service
        </h5>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`h-5 w-5 ${Math.ceil(averageRatings) >= star ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-gray-800 font-medium">{averageRatings}</span>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {serviceData.reviews.map((review: any, index: any) => {
          const reviewerName = review.reviewer?.username || review.reviewer?.email?.split("@")[0] || "Anonymous";
          const reviewerInitial = (review.reviewer?.username || review.reviewer?.email || "A")[0].toUpperCase();

          return (
            <div
              key={review.id || `review-${index}`} // Use index as fallback if no ID
              className="flex gap-4 border-t border-gray-200 pt-6"
            >
              {/* Reviewer Avatar */}
              <div className="flex-shrink-0">
                {review.reviewer?.profileImage ? (
                  <Image
                    src={review.reviewer.profileImage}
                    alt={`${reviewerName}'s profile`}
                    width={48}
                    height={48}
                    className="rounded-full shadow-sm"
                  />
                ) : (
                  <div className="bg-purple-600 h-12 w-12 flex items-center justify-center rounded-full shadow-sm">
                    <span className="text-xl text-white font-semibold">{reviewerInitial}</span>
                  </div>
                )}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-800">{reviewerName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`h-4 w-4 ${Number(review.rating) >= star ? "text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 text-sm">{review.rating || 0}</span>
                </div>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {review.reviewText || "No review text provided."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Reviews;