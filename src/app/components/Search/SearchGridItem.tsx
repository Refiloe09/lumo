"use client";

import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar, FaEnvelope, FaPhone } from "react-icons/fa";

interface Service {
  id: string;
  images: {url: string; publicId: string}[];
  createdBy: {
    clerkUserId: string;
    profileImage?: string;
    email: string;
    username: string;
    phone?: string | null;
  };
  title: string;
  reviews: { rating: number }[];
  price: number;
  category: string;
  deliveryTime: number;
  shortDesc: string;
}

function SearchGridItem({ service }: { service: Service }) {
  const router = useRouter();
  const calculateRatings = () => {
    const { reviews } = service;
    if (!reviews?.length) return 0;
    return (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to service page
    if (service.createdBy.email) {
      window.location.href = `mailto:${service.createdBy.email}`;
    } else if (service.createdBy.phone) {
      window.location.href = `tel:${service.createdBy.phone}`;
    } else {
      alert("No contact information available.");
    }
  };

  // Get the first letter of the username or email for the initial
  const initial = service.createdBy.username
    ? service.createdBy.username[0].toUpperCase()
    : service.createdBy.email[0].toUpperCase();
  // Use the first image or placeholder if none
  const imageSrc = service.images.length > 0 ? service.images[0].url : PLACEHOLDER_IMAGE;
  
  return (
    <div
      className="w-full max-w-[300px] sm:max-w-[250px] flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100"
      onClick={() => router.push(`/service/${service.id}`)}
    >
      <div className="relative w-full h-48 sm:h-40 overflow-hidden rounded-t-xl group">
      <Image
          src={imageSrc}
          alt={service.title}
          width={300} // Static width to match max-w-[300px]
          height={192} // Static height to match h-48 (192px)
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.log("Image load failed, falling back to placeholder:", imageSrc);
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            {service.createdBy.profileImage ? (
              <Image
                src={service.createdBy.profileImage}
                alt={service.createdBy.username}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center rounded-full text-white font-bold text-lg">
                {initial}
              </div>
            )}
          </div>
          <div className="flex-1">
            <span className="text-md font-medium text-gray-800">
              {service.createdBy.username}
            </span>
          </div>
        </div>
        <div className="text-gray-600 text-sm">Category: {service.category}</div>
        <div className="line-clamp-2 text-gray-900 font-medium text-lg">
          {service.title}
        </div>
        <div className="line-clamp-3 text-gray-600 text-sm">
          {service.shortDesc}
        </div>
        <div className="flex items-center gap-2 text-yellow-500">
          <FaStar />
          <span className="font-medium">{calculateRatings()}</span>
          <span className="text-gray-500 text-sm">({service.reviews.length})</span>
        </div>
        <div className="text-yellow-500 font-bold text-lg">
          From R {service.price.toLocaleString()}
        </div>
        <div className="text-gray-600 text-sm">
          Delivery: {service.deliveryTime} days
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {service.createdBy.email && (
            <button
              onClick={handleContactClick}
              className="flex items-center gap-2 px-3 py-1 bg-lumo-primary text-white rounded-lg hover:bg-lumo-dark transition-colors text-sm"
            >
              <FaEnvelope />
              <span>Contact via Email</span>
            </button>
          )}
          {service.createdBy.phone && (
            <button
              onClick={handleContactClick}
              className="flex items-center gap-2 px-3 py-1 bg-lumo-primary text-white rounded-lg hover:bg-lumo-dark transition-colors text-sm"
            >
              <FaPhone />
              <span>Contact via Phone</span>
            </button>
          )}
          {!service.createdBy.email && !service.createdBy.phone && (
            <p className="text-gray-500 text-sm">No contact information available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchGridItem;