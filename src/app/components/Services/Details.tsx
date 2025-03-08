/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddReview from "../../components/Services/AddReview";
import Reviews from "../../components/Services/Reviews";
import { FaStar } from "react-icons/fa";
import { useStateProvider } from "../../context/StateContext";
import { IMAGES_URL } from "@/utils/constants";

interface Service {
  id: string;
  images: string[];
  createdBy: {
    clerkUserId: string;
    email: string;
    profileImage?: string | null;
    username?: string;
    phone?: string | null;
  };
  title: string;
  reviews: { rating: number; id?: string; reviewText?: string; reviewer?: any }[] | number;
  price: number;
  category: string;
  deliveryTime: number;
  shortDesc: string;
  description: string;
  totalReviews?: number;
}

const Details: React.FC<{ serviceData: Service }> = ({ serviceData }) => {
  const [{ hasOrdered }] = useStateProvider();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [averageRatings, setAverageRatings] = useState("0");

  useEffect(() => {
    console.log("Details component - serviceData:", serviceData);
    if (serviceData?.images?.length > 0) {
      setCurrentImage(serviceData.images[0]);
      console.log("Set currentImage:", serviceData.images[0]);
    }
  }, [serviceData]);

  useEffect(() => {
    if (serviceData?.reviews && Array.isArray(serviceData.reviews) && serviceData.reviews.length) {
      const avgRating = serviceData.reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / serviceData.reviews.length;
      setAverageRatings(avgRating.toFixed(1));
    }
  }, [serviceData]);

  if (!serviceData) return null;

  const usernameOrEmail = serviceData.createdBy.username || serviceData.createdBy.email.split("@")[0];
  const initial = (serviceData.createdBy.username || serviceData.createdBy.email)[0].toUpperCase();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Service Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{serviceData.title}</h2>

      {/* Seller Info */}
      <div className="flex items-center gap-4 border-t pt-6">
        {serviceData.createdBy.profileImage ? (
          <Image
            src={serviceData.createdBy.profileImage}
            alt="Seller profile"
            height={48}
            width={48}
            className="rounded-full shadow-md"
          />
        ) : (
          <div className="bg-purple-600 h-12 w-12 flex items-center justify-center rounded-full shadow-md">
            <span className="text-xl text-white font-semibold">{initial}</span>
          </div>
        )}
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{usernameOrEmail}</h4>
          <h6 className="text-sm text-gray-500">@{usernameOrEmail}</h6>
        </div>
      </div>

      {/* Image Gallery */}
      {currentImage ? (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <Image
              src={`${IMAGES_URL}/${currentImage}`}
              alt={`${serviceData.title} preview`}
              height={400}
              width={800}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {serviceData.images.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {serviceData.images.map((image) => (
                <Image
                  key={image}
                  src={`${IMAGES_URL}/${image}`}
                  alt="Thumbnail"
                  height={80}
                  width={80}
                  onClick={() => setCurrentImage(image)}
                  className={`cursor-pointer rounded-md transition-all duration-300 ${
                    currentImage === image ? "border-2 border-blue-500 opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">No images available</div>
      )}

      {/* Service Description */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-900">About This Service</h3>
        <div className="prose prose-sm md:prose-base text-gray-700">
          <p>{serviceData.description || "No description available"}</p>
        </div>
      </section>

      {/* Seller Details */}
      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-900">About the Seller</h3>
        <div className="flex flex-col sm:flex-row gap-6">
          {serviceData.createdBy.profileImage ? (
            <Image
              src={serviceData.createdBy.profileImage}
              alt="Seller profile"
              height={100}
              width={100}
              className="rounded-full shadow-md"
            />
          ) : (
            <div className="bg-purple-600 h-24 w-24 flex items-center justify-center rounded-full shadow-md">
              <span className="text-3xl text-white font-semibold">{initial}</span>
            </div>
          )}
          <div className="space-y-3 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h4 className="text-lg font-medium text-gray-800">{usernameOrEmail}</h4>
              <span className="text-gray-500">@{usernameOrEmail}</span>
            </div>
            <div className="prose prose-sm text-gray-700">
              <p>{serviceData.description || "No description available"}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`h-5 w-5 ${Math.ceil(Number(averageRatings)) >= star ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-gray-800 font-medium">{averageRatings}</span>
              <span className="text-gray-500">
                ({Array.isArray(serviceData.reviews) ? serviceData.reviews.length : serviceData.totalReviews || 0})
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="space-y-6">
        <Reviews />
        {hasOrdered && <AddReview />}
      </section>
    </div>
  );
};

export default Details;